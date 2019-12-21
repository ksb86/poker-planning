import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Header from './Header/Header';
import Login from './Login/Login';
import Table from './Table/Table';
import styles from './App.less';
import {
    usersUpdated,
    setUserData,
    tableUpdated
} from './appActions';

const App = ({tableId, userId, usersUpdated, setUserData, tableUpdated }) => {
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

                db.collection('tables').where('tableId', '==', tableIdParam).onSnapshot(function(doc) {
                    const table = doc.docs[0];
                    tableUpdated({
                        fbTableId: table.id,
                        ...table.data()
                    });
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

                    setUserData({
                        tableId: tableIdParam || null,
                        userId: currentUser.id,
                        name: currentUser.data().name,
                        moderator: currentUser.data().moderator
                    });
                } else {
                    console.log(`No user found with id ${userId}`);
                }
            }
        })();
    }, []); // no params - run once on first render

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
    setUserData,
    tableUpdated
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
