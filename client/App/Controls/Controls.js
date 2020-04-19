import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import styles from './Controls.less';
import { setEditingModerator } from '../appActions';

const Controls = () => {
    const dispatch = useDispatch();
    const {
        tableVoting,
        tableId,
        editingModerator
    } = useSelector(state => state.table);

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
        dispatch(setEditingModerator(!editingModerator));
     };

    return (
        <div className={styles.controls}>
            {!editingModerator &&
                <button className="button" type="button" onClick={toggleVotingStatus}>{tableVoting ? 'Stop Voting' : 'New Round'}</button>
            }

            {editingModerator &&
                <div className={styles.changeModeratorMessage}>
                    Select the new moderator above ☝️
                </div>
            }

            <div className={styles.changeModerator} onClick={toggleChangeModerator}>
                {editingModerator ? 'Cancel' : 'Change Moderator'}
            </div>
        </div>
    );
};

export default Controls;
