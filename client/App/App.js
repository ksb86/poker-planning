import React from 'react';
import { connect } from 'react-redux';
import Login from './Login/Login';
// import Join from './Join/Join';
import Table from './Table/Table';
import { removeUserFromFirebase } from './appActions';
import styles from './App.less';

const App = ({table, userId, name, removeUserFromFirebase}) => {
    const handleLogout = e => {
        e.preventDefault();
        removeUserFromFirebase({
            userId
        });
    };

    if (!name) {
        return <Login />;
    }

    return (
        <div>
            <header className={styles.header}>
                <span className="user-name">{name}</span>&nbsp;&nbsp;<button type="button"onClick={handleLogout} >leave</button>
            </header>
            {table ?
                <Table />
                :
                <p>You're all alone, want to join a table?</p>
            }
        </div>
    );
};

const mapStateToProps = state => {
    return {
        userId: state.appData.userId,
        name: state.appData.name,
        table: state.appData.table
    };
};
const mapDispatchToProps = {
    removeUserFromFirebase
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
