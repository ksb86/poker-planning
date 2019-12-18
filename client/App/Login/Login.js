import React, {useState} from 'react';
import shortid from 'shortid';
import { connect } from 'react-redux';
import { addUserToFireBase, usersUpdated } from '../appActions';

// shortid.characters('0123456789abcdefghijklmnopqrstuvwxyz');

import styles from './Login.less';

const Login = ({table, addUserToFireBase, usersUpdated }) => {
    let newTable;
    if (!table) {
        newTable = shortid.generate();
    }
    const [formState, updateForm] = useState({
        loginName: '',
        loginError: null
    });

    const handleSubmit = e => {
        e.preventDefault();
        if (!formState.loginName) {
            alert('Enter name');
            return;
        }

        addUserToFireBase({
            name: formState.loginName,
            table: table || newTable,
            moderator: Boolean(newTable)
        }).then(() => {
            if (newTable) {
                // set up user change event listener here
                console.log(`share url: ${document.location.origin}?t=${newTable}`);
                history.pushState(null, null, `?t=${newTable}`);
                window.unsubscribeInitial = db.collection('users').where('table', '==', newTable || '').onSnapshot(function(doc) {
                    const usersData = doc.docs.map(userRaw => {
                        const userData = userRaw.data();
                        return {
                            id: userRaw.id,
                            ...userData
                        };
                    })
                    usersUpdated(usersData);
                });
            }
        });
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
                        {table ? 'Join' : 'Create'} Table
                    </button>
                </div>
                {!table ?
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
        table: state.appData.table
    };
};

const mapDispatchToProps = {
    addUserToFireBase,
    usersUpdated
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
