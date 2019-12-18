import React from 'react';
import { connect } from 'react-redux';
// import styles from './Users.less';

const Users = ({users, table}) => {
    return (
        <div>
            Users in "{table}":
            <ul>
                {users.map(user => {
                    return <li key={user.id}>{user.name}</li>
                })}
            </ul>
            <br/>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        table: state.appData.table,
        users: state.appData.users || []
    };
};

export default connect(mapStateToProps, null)(Users);


