import React from 'react';
import { connect } from 'react-redux';
// import styles from './Users.less';

const Users = ({users, tableId}) => {
    return (
        <div>
            Users in "{tableId}":
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
        tableId: state.table.tableId,
        users: state.table.users || []
    };
};

export default connect(mapStateToProps, null)(Users);


