import React from 'react';
import { connect } from 'react-redux';
import Indicator from '../shared/indicator';

import styles from './Users.less';

const Users = ({users, tableVoting}) => {
    return (
        <div>
            <ul className={styles.users}>
                {users.map(user => {
                    return (
                        <li className={styles.user} key={user.id}>
                            <span>{user.name}</span>
                            {tableVoting ?
                                <Indicator ready={Boolean(user.currentVote)} />
                                :
                                <span>{user.currentVote || '-'}</span>
                            }
                        </li>
                    );
                })}
            </ul>
            <br/>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        users: state.table.users || [],
        tableVoting: state.table.tableVoting
    };
};

export default connect(mapStateToProps, null)(Users);


