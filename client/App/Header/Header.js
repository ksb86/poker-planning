import React from 'react';
import { connect } from 'react-redux'
import Controls from '../Controls/Controls';
import styles from './Header.less';
import {
    removeUserData
} from '../appActions';

const Header = ({ userId, tableId, name, moderator, removeUserData }) => {
    const handleLogout = async e => {
        e.preventDefault();

        // TODO: try catch
        await window.db.collection('users').doc(userId).delete();
        removeUserData();
        document.location.href = '/';
    };

    return (
        <header>
            <div>
                Better Voting Poker
            </div>
            <div>
                {moderator && tableId ? <Controls /> : null }
            </div>
            <div>
                {name}
                <button type="button" onClick={handleLogout} >logout</button>
            </div>
        </header>
    );
};


const mapStateToProps = state => {
    return {
        userId: state.currentUser.userId,
        moderator: state.currentUser.moderator,
        name: state.currentUser.name,
        tableId: state.table.tableId
    };
};

const mapDispatchToProps = {
    removeUserData
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
