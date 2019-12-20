import React, {useState} from 'react';
import shortid from 'shortid';
import { connect } from 'react-redux';
import { usersUpdated, setUserData, setTable } from '../appActions';

import styles from './Login.less';

const Login = ({tableId, setUserData, setTable, usersUpdated }) => {
    let newTableId;
    if (!tableId) {
        newTableId = shortid.generate();
    }
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

        // TODO: try catch
        const addUserResult = await window.db.collection("users").add({
            name: formState.loginName,
            table: tableId || newTableId,
            moderator: Boolean(newTableId)
        });

        setUserData({
            userId: addUserResult.id,
            name: formState.loginName,
            moderator: Boolean(newTableId)
        });

        if (newTableId) {
            history.pushState(null, null, `?t=${newTableId}`);
            setTable({tableId: newTableId});

            // console.log(`share url: ${document.location.origin}?t=${newTableId}`);
            db.collection('users').where('table', '==', newTableId).onSnapshot(function(doc) {
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
                        {tableId ? 'Join' : 'Create'} Table
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
    setTable,
    usersUpdated
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
