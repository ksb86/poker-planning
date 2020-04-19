import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from './Header/Header';
import Login from './Login/Login';
import Main from './Main/Main';
import './App.less';

import {
    usersUpdated,
    setCurrentUserData,
    tableUpdated,
} from './appActions';

const App = () => {
    const dispatch = useDispatch();
    const { userId } = useSelector(state => state.currentUser);
    const { tableId } = useSelector(state => state.table);

    useEffect(() => {
        if (tableId) {
            // CHANGE LISTENER FOR TABLE
            db.ref(`tables/${tableId}/table`).on('value', snapshot => {
                dispatch(tableUpdated({
                    ...snapshot.val()
                }));
            });

            // CHANGE LISTENER FOR ALL USERS
            db.ref(`tables/${tableId}/users`).on('value', snapshot => {
                const users = Object.entries(snapshot.val() || {}).map(([key, value]) => {
                    return {
                        id: key,
                        ...value
                    };
                });
                dispatch(usersUpdated({users}));
            });
        }
    }, [tableId]);

    useEffect(() => {
        if (tableId && userId) {
            // CHANGE LISTENER FOR THIS USER
            db.ref(`tables/${tableId}/users/${userId}`).on('value', snapshot => {
                const currentUser = snapshot.val();
                if (currentUser) {
                    dispatch(setCurrentUserData({
                        ...currentUser
                    }));
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

export default App;
