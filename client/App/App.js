import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Header from './Header/Header';
import Login from './Login/Login';
import Table from './Table/Table';
import styles from './App.less';
import {
    usersUpdated,
    setCurrentUserData,
    tableUpdated,
    setTable
} from './appActions';

const App = ({tableId, userId, usersUpdated, setCurrentUserData, tableUpdated, setTable}) => {
    const [lsUserIdCopy, update] = useState(localStorage.getItem('popl-user-id'));
    useEffect(() => {
        (async function getUserIdFromLocalStorage() {
            let tableIdParam;
            try {
                tableIdParam = location?.search?.split('?')[1].split('&')?.find(item => {
                if (item.includes('t=')) {
                    return true;
                }
                })?.split('=')[1];
            } catch (error) {
                console.log('no tableId in url');
            }

            if (tableIdParam) {
                setTable({
                    tableId: tableIdParam
                });

                // TABLE CHANGES LISTENER
                db.collection('tables').doc(tableIdParam).onSnapshot(function(doc) {
                    tableUpdated({
                        ...doc.data()
                    });
                });

                // USER CHANGES LISTENER
                db.collection('users').where('tableId', '==', tableIdParam).onSnapshot(function(doc) {
                    const users = doc.docs.map(userRaw => {
                        const userData = userRaw.data();
                        return {
                            id: userRaw.id,
                            ...userData
                        };
                    })
                    usersUpdated({users});
                });
            }

            const localStorageUserId = localStorage.getItem('popl-user-id');
            if (localStorageUserId) {
                // TODO: try catch
                const currentUserRef = await db.collection('users').doc(localStorageUserId);
                const currentUser = await currentUserRef.get();
                if (currentUser.exists) {
                    await currentUserRef.update({
                        tableId: tableIdParam || null
                    });

                    setCurrentUserData({
                        tableId: tableIdParam || null,
                        userId: currentUser.id,
                        name: currentUser.data().name,
                        moderator: currentUser.data().moderator
                    });
                } else {
                    console.log(`No user found with id ${localStorageUserId}`);
                    localStorage.removeItem('popl-user-id');
                    document.location.href = '/';
                }
            }
        })();
    }, []); // no params - run once on first render

    if (lsUserIdCopy && !userId) {
        return 'loading...';
    }
    if (!userId) {
        return <Login />;
    }

    return (
        <div>
            <Header />
            {tableId ?
                <Table />
                :
                <p>You're all alone, want to join a table?</p>
            }
        </div>
    );
};

const mapStateToProps = state => {
    return {
        userId: state.currentUser.userId,
        tableId: state.table.tableId
    };
};
const mapDispatchToProps = {
    usersUpdated,
    setCurrentUserData,
    tableUpdated,
    setTable
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
