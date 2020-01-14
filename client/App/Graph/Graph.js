import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Doughnut, Bar } from 'react-chartjs-2';
import styles from './Graph.less';
import config from '../../config';

const graphTypes = [{
    id: 'donut',
    label: 'Donut'
}, {
    id: 'line',
    label: 'Line'
}, {
    id: 'bar',
    label: 'Bar'
}];

const getDonutChartData = users => {
    const [uniquePoints, occurrences] = users.reduce((acc, curr) => {
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

    return {
        labels: uniquePoints.sort((a,b) => a - b).map(p => `${p} points`),
        datasets: [{
            backgroundColor: [...config.colors.slice(0, uniquePoints.length)],
            data: occurrences.sort((a,b) => a - b)
        }]
        // labels: ['0 Points', '0.5 Points', '1 Point', '2 Points', '3 Points', '5 Points', '8 Points'],
        // datasets: [{
        //     backgroundColor: [...config.colors.slice(0, 7)],
        //     data: [1, 10, 5, 2, 20, 30, 45]
        // }]
    };
};

const getBarChartData = users => {
    const [uniquePoints, occurrences] = users.reduce((acc, curr) => {
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

    return {
        labels: uniquePoints.sort((a,b) => a - b).map(p => `${p} points`),
        datasets: [{
            label: '# of Votes',
            backgroundColor: [...config.colors.slice(0, 7)],
            data: occurrences.sort((a,b) => a - b)
        }]
    };
    // const [uniquePoints, occurrences] = users.reduce((acc, curr) => {
    //     if (curr.currentVote) {
    //         if (!acc[0].includes(curr.currentVote)) {
    //             acc[0].push(curr.currentVote);
    //             acc[1].push(1);
    //         } else {
    //             const index = acc[0].indexOf(curr.currentVote);
    //             acc[1][index] +=1 ;
    //         }
    //     }

    //     return acc;
    // }, [[],[]]);

    // return {
    //     labels: uniquePoints.sort((a,b) => a - b).map(p => `${p} points`),
    //     datasets: [{
    //         backgroundColor: [...config.colors.slice(0, uniquePoints.length)],
    //         data: occurrences,
    //     }]
    // };
};

const Graph = ({ users }) => {
    const [graphType, setGraphType] = useState('donut');
    if (!users.some(user => Boolean(user.currentVote))) {
        // no one voted
        return <p className={styles.noVotes}>No votes were recorded, click 'New Round' to try again!</p>;
    }
    const voteData = users => {
        // result needs to be array of objects instead of one object (for sorting)
        const result = {};
        users.forEach(user => {
            const currentVote = user.currentVote;
            if (currentVote) {
                if (result.hasOwnProperty(currentVote)) {
                    result[currentVote] += 1;
                } else {
                    result[currentVote] = 1;
                }
            }
        });

        return result;
    };
    voteData(users);
    const donutChartData = getDonutChartData(users);
    const barChartData = getBarChartData(users);
    debugger;
    return (
        <div className={styles.graphContainer}>
            {graphTypes.map(type => {
                return (
                    <label htmlFor={type.id} key={type.id}>
                        <input
                            id={type.id}
                            type="radio"
                            name="graphType"
                            value={type.id}
                            checked={type.id === graphType}
                            onChange={(e) => setGraphType(e.target.value)} />
                        {type.label}
                    </label>
                );
            })}
            <Doughnut
                options={{ legend: { position: 'right' } }}
                data={donutChartData} />
            <Bar
                options={{
                    legend: { display: false },
                    scales: {
                        xAxes: [{
                            gridLines: {
                                color: "rgba(0, 0, 0, 0)",
                            },
                            ticks: {
                                stepSize: 1,
                                beginAtZero: true
                            }
                        }],
                        yAxes: [{
                            ticks: {
                                stepSize: 1,
                                beginAtZero: true
                            }
                        }]
                    }
                }}
                data={barChartData} />

            {config.colors.map(color => {
                return <div key={color} className="test" style={{'backgroundColor': color}}>&nbsp;</div>;
            })}

        </div>
    );
};

const mapStateToProps = state => {
    return {
        users: state.table.users
    };
};

export default connect(mapStateToProps, null)(Graph);
