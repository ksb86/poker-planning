import React from 'react';
import { connect } from 'react-redux';
import { Doughnut } from 'react-chartjs-2';
import styles from './Graph.less';

const availableColors = ['#e6194B', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#42d4f4', '#f032e6', '#bfef45', '#fabebe', '#469990', '#e6beff', '#9A6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075'];
const Graph = ({ users }) => {
    if (!users.some(user => Boolean(user.currentVote))) {
        return null;
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
    var barChartData = {
        labels: uniquePoints.map(p => `${p} points`),
        datasets: [{
            backgroundColor: [...availableColors.slice(0, uniquePoints.length)],
            data: occurences,
        }]
    };

    return (
        <div className={styles.graphContainer}>
            <Doughnut
                data={barChartData}
                width={100}
                height={50}
                options={{ maintainAspectRatio: false}} />
        </div>
    );
};

const mapStateToProps = state => {
    return {
        users: state.table.users
    };
};

export default connect(mapStateToProps, null)(Graph);
