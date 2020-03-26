import React, { useState } from 'react';
import { connect } from 'react-redux'
import cx from 'classnames';
import {
    removeUserData,
    updateCurrentUserName
} from '../appActions';
import styles from './Header.less';

const Header = ({ userId, tableId, name, removeUserData, updateCurrentUserName }) => {
    const [editModeOn, updateEditMode] = useState(false);
    const [newName, updateNewName] = useState(name);
    const handleLogout = async e => {
        e.preventDefault();

        await window.db.ref(`tables/${tableId}/users/${userId}`).remove();
        removeUserData();
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
            updateCurrentUserName(nameToSave);
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
                                autoComplete="off"
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


const mapStateToProps = state => ({
    userId: state.currentUser.userId,
    name: state.currentUser.name,
    tableId: state.table.tableId,
});

const mapDispatchToProps = {
    removeUserData,
    updateCurrentUserName,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
