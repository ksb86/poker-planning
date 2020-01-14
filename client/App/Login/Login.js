import React, {useState} from 'react';
import { connect } from 'react-redux';
import { usersUpdated, tableUpdated, setCurrentUserData, setTable } from '../appActions';

import styles from './Login.less';

const Login = ({tableId, setCurrentUserData, usersUpdated, tableUpdated, setTable }) => {
    const [formState, updateForm] = useState({
        loginName: '',
        loginError: null
    });

    const handleSubmit = async e => {
        e.preventDefault();
        if (!formState.loginName) {
            updateForm({
                ...formState,
                loginError: 'Please enter your name'
            });
            return;
        }
        let listenerTableId;
        if (tableId) {
            listenerTableId = tableId;
        } else {
            // TODO: try catch
            const newTableRef = db.ref('tables').push();
            const tableData = {
                table: {
                    tableVoting: true
                },
                users: null
            };
            newTableRef.set(tableData);
            listenerTableId = newTableRef.key;
            history.pushState(null, null, `?t=${listenerTableId}`);
        }

        setTable({
            tableId: listenerTableId
        });

        // TABLE CHANGES LISTENER
        db.ref(`tables/${listenerTableId}/table`).on('value', snapshot => {
            tableUpdated({
                ...snapshot.val()
            });
        });

        // USER CHANGES LISTENER
        db.ref(`tables/${listenerTableId}/users`).on('value', snapshot => {
            // const users = Object.entries(snapshot.val() || {aksjhdkfh: {name: 'shane'}}).map(([key, value]) => {
            const users = Object.entries(snapshot.val() || {}).map(([key, value]) => {
                return {
                    id: key,
                    ...value
                };
            });
            console.log('users: ', users);
            usersUpdated({users});
        });

        // ADD USER and SET CURRENT DATA
        // console.log(`share url: ${document.location.origin}?t=${newTableId}`);
        // TODO: try catch
        let userData = {
            name: formState.loginName,
            moderator: Boolean(!tableId)
        };

        var usersRef = db.ref(`tables/${listenerTableId}/users`);

        var newUserRef = usersRef.push();
        userData = {
            userId: newUserRef.key,
            ...userData
        }
        newUserRef.set(userData);

        setCurrentUserData(userData);
    };

    const handleInputChange = e => {
        updateForm({
            ...formState,
            loginName: e.target.value,
            loginError: null
        });
    };

    return (
        <div>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles['form-item']}>
                    {/* <label htmlFor="loginName">
                        Name:
                    </label> */}
                    <input
                        id="loginName"
                        className={styles['form-input']}
                        autoFocus
                        type="text"
                        placeholder="Your name here"
                        autoComplete="off"
                        onChange={handleInputChange}
                        maxLength="30"
                    />
                </div>
                <div className={styles['form-item']}>
                    <button type="submit">
                        {tableId ? 'Join' : 'Create'} Room
                    </button>
                </div>
                <div className={styles['form-item']}>
                    {formState.loginError ?
                        <span className={styles.red}>
                            {formState.loginError}
                        </span>
                        :
                        <span/>
                    }
                </div>
                {!tableId ?
                    <div className={styles['form-item']}>
                        You will be the moderator
                    </div>
                    :
                    null
                }
                {/* {props.loginError ?
                    <span className={styles.red}>
                        {props.loginError}
                    </span>
                    :
                    null
                } */}
            </form>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        tableId: state.table.tableId
    };
};

const mapDispatchToProps = {
    setCurrentUserData,
    usersUpdated,
    tableUpdated,
    setTable
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
