import React, { useState } from 'react';
import { connect } from 'react-redux';
import Card from '../shared/card';
import config from '../../config';
import styles from './Cards.less';

const Cards = ({tableVoting, userId, }) => {
    const [voteState, updateVoteState] = useState('');

    const handleCardClick = async point => {
        const newValue = Boolean(voteState) && voteState === point ? '' : point;
        const currentUser = window.db.collection('users').doc(userId);
        currentUser.update({ currentVote: newValue });
        updateVoteState(newValue);
    };

    if (tableVoting) {
        return (
            <div className={styles.cards}>
                {config.pointOptions.map((point, i) => {
                    return (
                        <div
                            key={`${i}-${point}`}
                            onClick={() => handleCardClick(point)} >
                            <Card
                                isSelected={voteState === point}
                                point={point}
                            />
                        </div>
                    );
                })}
            </div>
        );
    }

    return null;
};

const mapStateToProps = state => {
    return {
        tableVoting: state.table.tableVoting,
        userId: state.currentUser.userId
    };
};

export default connect(mapStateToProps, null)(Cards);
