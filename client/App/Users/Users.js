import React from 'react';
import { connect } from 'react-redux';
import Controls from '../Controls/Controls';
import Indicator from '../shared/indicator';
import styles from './Users.less';

const Users = ({users, tableVoting, tableId, moderator}) => {
    // TEMP
    const clean = async () => {
        const batch = db.batch();

        const users = await db.collection('users').get();
        const tables = await db.collection('tables').get();
        [...users.docs, ...tables.docs].forEach(doc => {
            batch.delete(doc.ref);
        });

        await batch.commit();
        console.log('all users and tables deleted');
        localStorage.removeItem('popl-user-id');
        document.location.href = '/';
    };
    // TEMP

    const handleDelete = async userId => {
        await window.db.ref(`tables/${tableId}/users/${userId}`).remove();
    };

    return (
        <div className={styles.users}>
            <ul className={styles.users}>
                {users.map(user => {
                    return (
                        <li className={styles.user} key={user.id}>
                            <span>{user.name}</span>
                            <span className={styles.indicators}>
                                {tableVoting ?
                                    <Indicator ready={Boolean(user.currentVote)} />
                                    :
                                    <span>{user.currentVote || '-'}</span>
                                }
                                {moderator && !user.moderator && <span className={styles.deleteUser} onClick={() => handleDelete(user.id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M23 20.168l-8.185-8.187 8.185-8.174-2.832-2.807-8.182 8.179-8.176-8.179-2.81 2.81 8.186 8.196-8.186 8.184 2.81 2.81 8.203-8.192 8.18 8.192z"/></svg></span>}
                            </span>
                        </li>
                    );
                })}
            </ul>
            {moderator && tableId ? <Controls /> : null }
            <>
                <br/>
                <br/>
                <br/>
                {/* <button onClick={clean}>clean</button> */}
            </>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        users: state.table.users || [],
        tableVoting: state.table.tableVoting,
        tableId: state.table.tableId,
        moderator: state.currentUser.moderator
    };
};

export default connect(mapStateToProps, null)(Users);
