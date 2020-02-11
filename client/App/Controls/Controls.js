import React from 'react';
import { connect } from 'react-redux'
import styles from './Controls.less';

const Controls = ({ tableId, tableVoting }) => {
    const toggleVotingStatus = async () => {
        db.ref(`tables/${tableId}/table/`).update({ tableVoting: !tableVoting });

        if (!tableVoting) {
            db.ref(`tables/${tableId}/users/`).transaction(function(users) {
                return Object.entries(users).reduce((acc, [key, user]) => {
                    delete user.currentVote;
                    acc[key] = user;
                    return acc;
                }, {});
            });
        }
    };

    return (
        <div className={styles.controls}>
            <button className="button" type="button" onClick={toggleVotingStatus}>{tableVoting ? 'Stop Voting' : 'New Round'}</button>
        </div>
    );
};

const mapStateToProps = state => ({
    tableVoting: state.table.tableVoting,
    tableId: state.table.tableId,
});

export default connect(mapStateToProps, null)(Controls);
