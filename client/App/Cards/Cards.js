import React, { useState } from 'react';
import cx from 'classnames';
import { useSelector } from 'react-redux';
import useInterval from '@use-it/interval';
import config from '../../config';
import Card from '../shared/card';
import styles from './Cards.less';

const Cards = () => {
    const { userId } = useSelector(state => state.currentUser);
    const {
        easter,
        tableId,
    } = useSelector(state => state.table);

    const [voteState, updateVoteState] = useState('');
    const [cards, setCards] = useState(config.pointOptions);
    const [lucky, setLucky] = useState(false);

    useInterval(() => {
        if (easter && lucky) {
            const newCards = [...cards];

            for (let i = newCards.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                [newCards[i], newCards[j]] = [newCards[j], newCards[i]];
            }

            setCards(newCards);
        }
    }, 100);

    const handleLuckyClick = () => {
        if (lucky) {
            setCards(config.pointOptions);
        }
        setLucky(!lucky);
    };

    const handleCardClick = async point => {
        const newValue = Boolean(voteState) && voteState === point ? '' : point;

        db.ref(`tables/${tableId}/users/${userId}`).update({
            currentVote: newValue
        });
        updateVoteState(newValue);
    };

    return (
        <div className={styles.cards}>
            {easter &&
                <div>
                    <button id="imFeelingLucky" className={cx('button', styles.luckyBtn)} onMouseDown={handleLuckyClick}>I'm Feeling Lucky</button>
                </div>
            }
            <div className={styles.cardsInner}>
                {cards.map((point, i) => {
                    return (
                        <div
                            key={`${i}-${point}`}
                            onMouseDown={() => handleCardClick(point)} >
                            <Card
                                isSelected={voteState === point}
                                point={point}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Cards;
