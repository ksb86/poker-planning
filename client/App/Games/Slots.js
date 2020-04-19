import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import useInterval from '@use-it/interval';
import styles from './Slots.less';

const Slots = () => {
    const { tableId } = useSelector(state => state.table);
    const {
        userId,
        points: userPoints = 0,
    } = useSelector(state => state.currentUser);

    const [options, setOptions] = useState(['💰', '🌎', '🎹', '🎉', '😂', '💩', '👀', '🍔', '💾'])

    const [scoredPoints, setScoredPoints] = useState(0);
    const [numStopped, setNumStopped] = useState(0);
    const [slot1, setSlot1] = useState(Math.floor(Math.random()*9));
    const [slot2, setSlot2] = useState(Math.floor(Math.random()*9));
    const [slot3, setSlot3] = useState(Math.floor(Math.random()*9));

    const [stopped1, setStopped1] = useState(false);
    const [stopped2, setStopped2] = useState(false);
    const [stopped3, setStopped3] = useState(false);

    const incrementSlots = () => {
        !stopped1 && setSlot1((slot1 === options.length - 1 ? 0 : slot1 + 1));
        !stopped2 && setSlot2((slot2 === options.length - 1 ? 0 : slot2 + 1));
        !stopped3 && setSlot3((slot3 === options.length - 1 ? 0 : slot3 + 1));
    };

    useInterval(() => {
        incrementSlots();
    }, 300);

    const stop = () => {
        if (numStopped === 0) {
            setStopped1(true);
        } else if (numStopped === 1) {
            setStopped2(true);
        } else if (numStopped === 2) {
            setStopped3(true);
            let score = 0;
            // 7 points for each 💰
            score = [slot1,slot2,slot3].reduce((a, c) => {
                return a += (Number(c === 0)*7);
            }, score);

            if (slot1 === slot2 && slot2 === slot3) {
                // 21 points for all matching
                score += 21;

                if (slot1 === 0 && slot2 === 0 && slot3 === 0) {
                    // 99 points for all 💰
                    score += 99;
                }
            }
            db.ref(`tables/${tableId}/users/${userId}`).update({
                points: (userPoints || 0) + score
            });
            setScoredPoints(score);
        }

        setNumStopped(numStopped+1);
    };

    const reset = () => {
        setStopped1(false);
        setStopped2(false);
        setStopped3(false);
        setNumStopped(0);
        setScoredPoints(0);
    };

    return (
        <div className={styles.slots}>
            <div className={styles.slotsWrap}>
                <div className={styles.slot}>
                    {options[slot1]}
                </div>
                <div className={styles.slot}>
                    {options[slot2]}
                </div>
                <div className={styles.slot}>
                    {options[slot3]}
                </div>
            </div>
            <div className={styles.slotsControls}>
                {stopped1 && stopped2 && stopped3 ?
                    <>
                        <button className="button" onClick={reset}>play again!</button>
                        <div className={styles.slotsPoints}>
                            {`${scoredPoints} points${scoredPoints !== 0 ? '!' : ''}`}
                        </div>
                    </>
                    :
                    <button className="button" onClick={stop}>stop</button>
                }
            </div>
        </div>
    );
};

export default Slots;
