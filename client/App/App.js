import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import Header from './Header/Header';
import Login from './Login/Login';
import Main from './Main/Main';
import './App.less';

import {
    usersUpdated,
    setCurrentUserData,
    tableUpdated,
} from './appActions';

const App = ({ tableId, userId, usersUpdated, setCurrentUserData, tableUpdated }) => {
    useEffect(() => {
        if (tableId) {
            // CHANGE LISTENER FOR TABLE
            db.ref(`tables/${tableId}/table`).on('value', snapshot => {
                tableUpdated({
                    ...snapshot.val()
                });
            });

            // CHANGE LISTENER FOR ALL USERS
            db.ref(`tables/${tableId}/users`).on('value', snapshot => {
                const users = Object.entries(snapshot.val() || {}).map(([key, value]) => {
                    return {
                        id: key,
                        ...value
                    };
                });
                usersUpdated({users});
            });
        }
    }, [tableId]);

    useEffect(() => {
        if (tableId && userId) {
            // CHANGE LISTENER FOR THIS USER
            db.ref(`tables/${tableId}/users/${userId}`).on('value', snapshot => {
                const currentUser = snapshot.val();
                if (currentUser) {
                    setCurrentUserData({
                        ...currentUser
                    });
                }
            });
        }
    }, [tableId, userId]);

    if (!userId || userId && !tableId) {
        return <Login />;
    }

    return (
        <>
            <Header />
            {tableId && <Main />}
        </>
    );
};

const mapStateToProps = state => ({
    userId: state.currentUser.userId,
    tableId: state.table.tableId,
});

const mapDispatchToProps = {
    usersUpdated,
    setCurrentUserData,
    tableUpdated,
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
