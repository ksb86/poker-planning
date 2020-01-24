import React from 'react';
import { connect } from 'react-redux'
import styles from './Header.less';
import {
    removeUserData
} from '../appActions';

const Header = ({ users, userId, tableId, name, removeUserData }) => {
    const handleLogout = async e => {
        e.preventDefault();

        // TODO: try catch
        await window.db.ref(`tables/${tableId}/users/${userId}`).remove();
        removeUserData();
        document.location.href = '/';
    };

    // user was removed from table
    if (!users.some(user => user.id === userId)) {
        removeUserData();
        document.location.href = '/';
    }

    return (
        <div className={styles.headerWrap}>
            <header>
                <div className={styles.title}>
                    Better Voting Poker
                </div>
                <div>
                    <span className={styles.userName}>
                        {name}
                    </span>
                    <button type="button" onClick={handleLogout}>leave</button>
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
        users: state.table.users,
    };
};

const mapDispatchToProps = {
    removeUserData
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
