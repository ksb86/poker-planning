import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Login from './Login/Login';
import Table from './Table/Table';
import styles from './App.less';
import {
    removeUserData,
    usersUpdated,
    setUserData,
    setTable
} from './appActions';

const App = ({tableId, userId, name, removeUserData, usersUpdated, setUserData, setTable }) => {
    useEffect(() => {
        (async function getUserIdFromLocalStorage() {
            const localStorageUserId = localStorage.getItem('popl-user-id');
            if (localStorageUserId) {
                // TODO: try catch
                const currentUser = await db.collection('users').doc(localStorageUserId).get();

                if (currentUser.exists) {
                    setUserData({
                        userId: currentUser.id,
                        name: currentUser.name,
                        moderator: Boolean(currentUser.moderator)
                    });
                } else {
                    console.log(`No user found with id ${userId}`);
                }
            }
        })();

        let tableIdParam;
        console.log('hi');
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
            setTable({ tableId: tableIdParam });
            db.collection('users').where('table', '==', tableIdParam).onSnapshot(function(doc) {
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
    }, []); // no params - run once on first render

    const handleLogout = async e => {
        e.preventDefault();

        // TODO: try catch
        await window.db.collection('users').doc(userId).delete();
        removeUserData();
    };

    if (!userId) {
        return <Login />;
    }

    return (
        <div>
            <header className={styles.header}>
                <span className="user-name">{name}</span>&nbsp;&nbsp;<button type="button"onClick={handleLogout} >leave</button>
            </header>
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
        name: state.currentUser.name,
        tableId: state.table.tableId
    };
};
const mapDispatchToProps = {
    removeUserData,
    usersUpdated,
    setUserData,
    setTable
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
