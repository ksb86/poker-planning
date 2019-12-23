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

    return (
        <div className={styles.users}>
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
