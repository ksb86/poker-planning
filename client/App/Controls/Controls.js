import React from 'react';
import { connect } from 'react-redux'
import styles from './Controls.less';
import { setEditingModerator } from '../appActions';

const Controls = ({ tableId, tableVoting, editingModerator, setEditingModerator }) => {
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
     const toggleChangeModerator = () => {
        setEditingModerator(!editingModerator);
     };

    return (
        <div className={styles.controls}>
            {!editingModerator &&
                <button className="button" type="button" onClick={toggleVotingStatus}>{tableVoting ? 'Stop Voting' : 'New Round'}</button>
            }

            <div className={styles.changeModerator} onClick={toggleChangeModerator}>
                {editingModerator ? 'Cancel' : 'Change Moderator'}
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    tableVoting: state.table.tableVoting,
    tableId: state.table.tableId,
    editingModerator: state.table.editingModerator,
});

const mapDispatchToProps = {
    setEditingModerator,
};

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
