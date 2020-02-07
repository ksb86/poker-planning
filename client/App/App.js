import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Header from './Header/Header';
import Login from './Login/Login';
import Main from './Main/Main';
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
                console.log('No table id in url');
            }

            if (tableIdParam) {
                setTable({
                    tableId: tableIdParam
                });

                // TABLE CHANGES LISTENER
                db.ref(`tables/${tableIdParam}/table`).on('value', snapshot => {
                    tableUpdated({
                        ...snapshot.val()
                    });
                });

                // USER CHANGES LISTENER
                db.ref(`tables/${tableIdParam}/users`).on('value', snapshot => {
                    // const users = Object.entries(snapshot.val() || {aksjhdkfh: {name: 'shane'}}).map(([key, value]) => {
                    const users = Object.entries(snapshot.val() || {}).map(([key, value]) => {
                        return {
                            id: key,
                            ...value
                        };
                    });
                    usersUpdated({users});
                });
            }

            const localStorageUserId = localStorage.getItem('popl-user-id');
            if (localStorageUserId) {
                // TODO: try catch
                // const currentUserRef = await db.collection('users').doc(localStorageUserId);
                // const currentUser = await currentUserRef.get();

                const currentUser = await new Promise((res, rej) => {
                    db.ref(`tables/${tableIdParam}/users/${localStorageUserId}`).once('value', snapshot => {
                        res(snapshot.val());
                    });
                });

                if (currentUser) {
                    // await currentUserRef.update({
                    //     tableId: tableIdParam || null
                    // });
                    setCurrentUserData({
                        tableId: tableIdParam || null,
                        userId: localStorageUserId,
                        name: currentUser.name,
                        moderator: currentUser.moderator,
                        points: currentUser.points
                    });
                } else {
                    console.log(`No user found with id ${localStorageUserId}`);
                    localStorage.removeItem('popl-user-id');
                    let tParam = '';
                    if (tableIdParam) {
                        tParam = `?t=${tableIdParam}`;
                    }
                    document.location.href = `/${tParam}`;
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
            {tableId && <Main />}
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
