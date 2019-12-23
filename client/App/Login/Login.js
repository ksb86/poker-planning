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
            const addTableResult = await window.db.collection('tables').add({
                tableVoting: true
            });
            listenerTableId = addTableResult.id;
            history.pushState(null, null, `?t=${listenerTableId}`);
        }

        setTable({
            tableId: listenerTableId
        });

        // TABLE CHANGES LISTENER
        db.collection('tables').doc(listenerTableId).onSnapshot(function(doc) {
            tableUpdated({
                ...doc.data()
            });
        });

        // USER CHANGES LISTENER
        db.collection('users').where('tableId', '==', listenerTableId).onSnapshot(function(doc) {
            const users = doc.docs.map(userRaw => {
                const userData = userRaw.data();
                return {
                    id: userRaw.id,
                    ...userData
                };
            })
            usersUpdated({users});
        });

        // ADD USER and SET CURRENT DATA
        // console.log(`share url: ${document.location.origin}?t=${newTableId}`);
        // TODO: try catch
        const userData = {
            name: formState.loginName,
            tableId: listenerTableId,
            moderator: Boolean(!tableId)
        };
        const addUserResult = await window.db.collection('users').add(userData);

        setCurrentUserData({
            userId: addUserResult.id,
            ...userData
        });
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
