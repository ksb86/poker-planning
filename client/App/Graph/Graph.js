import React from 'react';
import { connect } from 'react-redux';
import { Doughnut } from 'react-chartjs-2';
import styles from './Graph.less';
import config from '../../config';

const Graph = ({ users }) => {
    if (!users.some(user => Boolean(user.currentVote))) {
        // no one voted
        return <p className={styles.noVotes}>No votes were recorded, click 'New Round' to try again!</p>;
    }
    // organize data
    const [uniquePoints, occurences] = users.reduce((acc, curr) => {
        if (curr.currentVote) {
            if (!acc[0].includes(curr.currentVote)) {
                acc[0].push(curr.currentVote);
                acc[1].push(1);
            } else {
                const index = acc[0].indexOf(curr.currentVote);
                acc[1][index] +=1 ;
            }
        }

        return acc;
    }, [[],[]]);
    const chosenColors = uniquePoints.map(p => {
        return config.colors[config.pointOptions.indexOf(p)];
    })
    // console.log('chosenColors: ', chosenColors);
    var barChartData = {
        labels: uniquePoints.map(p => `${p} points`),
        datasets: [{
            backgroundColor: chosenColors, // [...config.colors.slice(0, uniquePoints.length)],
            data: occurences,
        }]
    };

    return (
        <div className={styles.graphContainer}>
            <Doughnut
                options={{ legend: { position: 'right' } }}
                data={barChartData} />
        </div>
    );
};

const mapStateToProps = state => {
    return {
        users: state.table.users
    };
};

export default connect(mapStateToProps, null)(Graph);
