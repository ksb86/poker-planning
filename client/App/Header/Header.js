import React from 'react';
import { connect } from 'react-redux'
import styles from './Header.less';
import {
    removeUserData
} from '../appActions';

const Header = ({ userId, name, removeUserData }) => {
    const handleLogout = async e => {
        e.preventDefault();

        // TODO: try catch
        await window.db.collection('users').doc(userId).delete();
        removeUserData();
        document.location.href = '/';
    };

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
                    <button type="button" onClick={handleLogout}>logout</button>
                </div>
            </header>
        </div>
    );
};


const mapStateToProps = state => {
    return {
        userId: state.currentUser.userId,
        name: state.currentUser.name
    };
};

const mapDispatchToProps = {
    removeUserData
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
