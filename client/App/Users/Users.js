import React from 'react';
import { connect } from 'react-redux';
import Controls from '../Controls/Controls';
import Indicator from '../shared/indicator';
import X from '../shared/X';
import styles from './Users.less';

const Users = ({users, tableVoting, tableId, moderator, easter}) => {
    // TEMP
    // const clean = async () => {
    //     const batch = db.batch();

    //     const users = await db.collection('users').get();
    //     const tables = await db.collection('tables').get();
    //     [...users.docs, ...tables.docs].forEach(doc => {
    //         batch.delete(doc.ref);
    //     });

    //     await batch.commit();
    //     console.log('all users and tables deleted');
    //     localStorage.removeItem('popl-user-id');
    //     document.location.href = '/';
    // };
    // TEMP

    const handleDelete = async user => {
        if (window.confirm(`Remove "${user.name}" from table?`)) {
            await window.db.ref(`tables/${tableId}/users/${user.id}`).remove();
        }
    };

    return (
        <div className={styles.users}>
            <ul className={styles.users}>
                {users.map(user => {
                    return (
                        <li className={styles.user} key={user.id}>
                            <span>{user.name}{easter && <span className={styles.points}>{user.points || '0'} pts</span>}</span>
                            <span className={styles.indicators}>
                                {tableVoting ?
                                    <Indicator ready={Boolean(user.currentVote)} />
                                    :
                                    <span>{user.currentVote || '-'}</span>
                                }
                                {moderator && !user.moderator &&
                                    <span className={styles.deleteUser} onClick={() => handleDelete(user)}>
                                        <X />
                                    </span>}
                            </span>
                        </li>
                    );
                })}
            </ul>
            {moderator && tableId ? <Controls /> : null }
            <div className={styles.hint}>↑↑↓↓←→←→BA</div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        users: state.table.users || [],
        tableVoting: state.table.tableVoting,
        tableId: state.table.tableId,
        moderator: state.currentUser.moderator,
        easter: state.table.easter
    };
};

export default connect(mapStateToProps, null)(Users);
