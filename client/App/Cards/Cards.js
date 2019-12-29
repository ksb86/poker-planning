import React, { useState } from 'react';
import { connect } from 'react-redux';
import Card from '../shared/card';
import config from '../../config';
import styles from './Cards.less';

const Cards = ({tableVoting, userId, tableId }) => {
    const [voteState, updateVoteState] = useState('');

    const handleCardClick = async point => {
        const newValue = Boolean(voteState) && voteState === point ? '' : point;

        db.ref(`tables/${tableId}/users/${userId}`).update({
            currentVote: newValue
        });
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
        userId: state.currentUser.userId,
        tableId: state.table.tableId
    };
};

export default connect(mapStateToProps, null)(Cards);
