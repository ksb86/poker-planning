import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import cx from 'classnames';
import {
    updateCurrentUserName
} from '../appActions';
import styles from './Header.less';

const Header = () => {
    const dispatch = useDispatch();
    const {
        userId,
        name
     } = useSelector(state => state.currentUser);
    const { tableId } = useSelector(state => state.table);

    const [editModeOn, updateEditMode] = useState(false);
    const [newName, updateNewName] = useState(name);
    const handleLogout = async e => {
        e.preventDefault();

        await window.db.ref(`tables/${tableId}/users/${userId}`).remove();
        localStorage.removeItem('popl-user-id');
        document.location.href = '/';
    };

    const toggleEditMode = () => {
        updateEditMode(!editModeOn);
    };

    const handleSaveNewName = e => {
        e.preventDefault();
        const nameToSave = newName?.trim();
        if (nameToSave) {
            db.ref(`tables/${tableId}/users/${userId}`).update({
                name: nameToSave
            });
            dispatch(updateCurrentUserName(nameToSave));
            toggleEditMode()
        } else {
            document.getElementById('updateName').focus();
        }
    };

    const handleNewNameKeyUp = e => {
        if (e.which === 27) {
            toggleEditMode();
        }
    };

    return (
        <div className={styles.headerWrap}>
            <header>
                <div className={styles.title}>
                    Better Voting Poker
                </div>
                <div className={styles.headerRight}>
                    {editModeOn ?
                        <form onSubmit={handleSaveNewName}>
                            <input
                                id="updateName"
                                className={cx('form-input', styles.editNameInput)}
                                type="text"
                                placeholder="New name here"
                                autoComplete="given_name"
                                autoFocus
                                maxLength="20"
                                value={newName}
                                onChange={(e) => updateNewName(e.target.value)}
                                onKeyUp={handleNewNameKeyUp}
                            />
                            <button className={cx('button', styles.saveNewNameBtn)} type="submit" disabled={!Boolean(newName?.trim().length)}>Save</button>
                            <button className={cx('button', styles.cancelNewNameBtn)} type="button" onClick={toggleEditMode}>Cancel</button>
                        </form>
                        :
                        <span className={styles.userName} onClick={toggleEditMode}>
                            {name}
                        </span>
                    }
                    <button className={cx('button', styles.leaveBtn)} type="button" onClick={handleLogout}>Leave</button>
                </div>
            </header>
        </div>
    );
};

export default Header;
