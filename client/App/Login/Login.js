import React, {useState} from 'react';
import shortid from 'shortid';
import { connect } from 'react-redux';
import { usersUpdated, tableUpdated, setUserData } from '../appActions';

import styles from './Login.less';

const Login = ({tableId, setUserData, usersUpdated, tableUpdated }) => {
    const [formState, updateForm] = useState({
        loginName: '',
        loginError: null
    });

    const handleSubmit = async e => {
        e.preventDefault();
        if (!formState.loginName) {
            alert('Enter name');
            return;
        }

        let newTableId;
        if (!tableId) {
            newTableId = shortid.generate();
        }

        // TODO: try catch
        const addUserResult = await window.db.collection('users').add({
            name: formState.loginName,
            tableId: tableId || newTableId,
            moderator: Boolean(newTableId)
        });

        setUserData({
            userId: addUserResult.id,
            name: formState.loginName,
            moderator: Boolean(newTableId)
        });

        if (newTableId) {
            history.pushState(null, null, `?t=${newTableId}`);

            // console.log(`share url: ${document.location.origin}?t=${newTableId}`);

            // TODO: try catch
            const addTableResult = await window.db.collection('tables').add({
                tableId: newTableId,
                tableVoting: true
            });

            db.collection('users').where('tableId', '==', newTableId).onSnapshot(function(doc) {
                const users = doc.docs.map(userRaw => {
                    const userData = userRaw.data();
                    return {
                        id: userRaw.id,
                        ...userData
                    };
                })
                usersUpdated({users});
            });

            addTableResult.onSnapshot(function(doc) {
                tableUpdated({
                    fbTableId: doc.id,
                    ...doc.data()
                });
            });
        }
    };

    const handleInputChange = e => {
        updateForm({
            ...formState,
            loginName: e.target.value
        });
    };

    return (
        <div>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles['form-item']}>
                    <label htmlFor="loginName">
                        Name:
                    </label>
                    <input className={styles['form-input']} id="loginName" type="text" onChange={handleInputChange} />
                </div>
                <div className={styles['form-item']}>
                    {formState.loginError ?
                        <span className={styles.red}>
                            {formState.loginError}
                        </span>
                        :
                        <span/>
                    }
                    <button type="submit">
                        Login and {tableId ? 'Join' : 'Create'} Room
                    </button>
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
    setUserData,
    usersUpdated,
    tableUpdated
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
