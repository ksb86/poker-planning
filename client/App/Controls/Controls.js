import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Controls.less';
import { setEditingModerator } from '../appActions';

function calculateAverageAndMode(arr) {
    if (arr.length === 0) {
        return ['none', 'none'];
    }

    const numericArray = arr.map(Number);

    const sum = numericArray.reduce((acc, num) => acc + num, 0);
    const average = (sum / numericArray.length).toFixed(1);

    const frequencyMap = {};
    let maxFrequency = 0;
    let modes = [];

    // Count the frequency of each number in the array
    numericArray.forEach((num) => {
        frequencyMap[num] = (frequencyMap[num] || 0) + 1;
        if (frequencyMap[num] > maxFrequency) {
            maxFrequency = frequencyMap[num];
            modes = [Number(num)];
        } else if (frequencyMap[num] === maxFrequency && !modes.includes(Number(num))) {
            modes.push(Number(num));
        }
    });

    const modeString = modes.length === 0 ? 'none' : modes.sort((a, b) => (a - b)).join(',');

    return [average, modeString];
}

const Controls = () => {
    const dispatch = useDispatch();
    const { tableVoting, tableId, editingModerator } = useSelector((state) => state.table);

    const toggleVotingStatus = async () => {
        db.ref(`tables/${tableId}/table/`).update({ tableVoting: !tableVoting });

        if (!tableVoting) {
            // resetting votes, starting new round
            db.ref(`tables/${tableId}/users/`).transaction(function (users) {
                return Object.entries(users).reduce((acc, [key, user]) => {
                    delete user.currentVote;
                    acc[key] = user;
                    return acc;
                }, {});
            });
        } else {
            // voting stopped, track voting info
            try {
                const snapshot = await db.ref(`tables/${tableId}/users/`).once('value');
                const users = Object.values(snapshot.val());

                const submittedVotes = users.reduce((acc, { currentVote }) => {
                    if (Boolean(currentVote) && currentVote !== 'pass' && currentVote !== '☕️') {
                        acc.push(currentVote);
                    }
                    return acc;
                }, []);

                const [average, mode] = calculateAverageAndMode(submittedVotes)

                window.gtag('event', 'COLLECT_VOTES', {
                    AVERAGE: average,
                    MODE: mode,
                    USER_COUNT: users.length,
                    VOTE_COUNT: submittedVotes.length,
                });
            } catch (error) {
                window.gtag('event', 'COLLECT_VOTES', {
                    ERROR: error.message,
                });
            }
        }
    };
    const toggleChangeModerator = () => {
        dispatch(setEditingModerator(!editingModerator));
    };

    return (
        <div className={styles.controls}>
            {!editingModerator && (
                <button className="button" type="button" onClick={toggleVotingStatus}>
                    {tableVoting ? 'Stop Voting' : 'New Round'}
                </button>
            )}

            {editingModerator && (
                <div className={styles.changeModeratorMessage}>
                    Select the new moderator above ☝️
                </div>
            )}

            <div className={styles.changeModerator} onClick={toggleChangeModerator}>
                {editingModerator ? 'Cancel' : 'Change Moderator'}
            </div>
        </div>
    );
};

export default Controls;
