import React from 'react';
import { useSelector } from 'react-redux';
import { Doughnut } from 'react-chartjs-2';
import config from '../../config';
import styles from './Graph.less';

const Graph = () => {
    const { users } = useSelector(state => state.table);

    if (!users.some(user => Boolean(user.currentVote && user.currentVote !== 'pass'))) {
        // no one voted
        return <p className={styles.noVotes}>No votes were recorded, click 'New Round' to try again!</p>;
    }

    // organize data for chart
    const uniquePointTracker = [];
    const data = {};
    users.forEach(({ currentVote }) => {
        if (currentVote && currentVote !== 'pass') {
            if (!uniquePointTracker.includes(currentVote)) {
                uniquePointTracker.push(currentVote);
                data[currentVote] = 1;
            } else {
                data[currentVote]++;
            }
        }
    });

    const sortedDataKeys = Object.keys(data).sort((a,b) => a - b);
    const sortedData = sortedDataKeys.map(key => {
        return data[key];
    });

    const chosenColors = sortedDataKeys.map(p => {
        return config.colors[config.pointOptions.indexOf(p)];
    });

    var doughnutChartData = {
        labels: sortedDataKeys.map(p => `${p} point${p !== '1' ? 's': ''}`),
        datasets: [{
            backgroundColor: chosenColors,
            data: sortedData,
        }]
    };

    return (
        <div className={styles.graphContainer}>
            <Doughnut
                options={{ legend: { position: 'right' } }}
                data={doughnutChartData} />
        </div>
    );
};

export default Graph;
