import React, { useState } from 'react';
import { connect } from 'react-redux'
import cx from 'classnames';
import styles from './Header.less';
import {
    removeUserData,
    updateCurrentUserName
} from '../appActions';

const Header = ({ userId, tableId, name, removeUserData, updateCurrentUserName }) => {
    const [editModeOn, updateEditMode] = useState(false);
    const [newName, updateNewName] = useState(name);
    const handleLogout = async e => {
        e.preventDefault();

        // TODO: try catch
        await window.db.ref(`tables/${tableId}/users/${userId}`).remove();
        removeUserData();
        console.log('1');
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
                                className={cx(styles['form-input'], styles.editNameInput)}
                                type="text"
                                placeholder="New name here"
                                autoComplete="off"
                                autoFocus
                                maxLength="20"
                                value={newName}
                                onChange={(e) => updateNewName(e.target.value)}
                                onKeyUp={handleNewNameKeyUp}
                            />
                            <button className={styles.saveNewNameBtn} disabled={!Boolean(newName?.trim().length)} type="submit">Save</button>
                            <button className={styles.cancelNewNameBtn}  type="button" onClick={toggleEditMode}>Cancel</button>
                        </form>
                        :
                        <span className={styles.userName} onClick={toggleEditMode}>
                            {name}
                        </span>
                    }
                    <button className={styles.leaveBtn} type="button" onClick={handleLogout}>leave</button>
                </div>
            </header>
        </div>
    );
};


const mapStateToProps = state => {
    return {
        userId: state.currentUser.userId,
        name: state.currentUser.name,
        tableId: state.table.tableId,
    };
};

const mapDispatchToProps = {
    removeUserData,
    updateCurrentUserName
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
