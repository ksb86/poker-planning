import React from 'react';
import { useSelector } from 'react-redux';
import Users from '../Users/Users';
import Table from '../Table/Table';
import Graph from '../Graph/Graph';
import styles from './Main.less';

const Main = () => {
    const { tableVoting } = useSelector(state => state.table);

    return (
        <div className={styles.table}>
            <Users />
            {tableVoting ? <Table /> : <Graph />}
        </div>
    );
};

export default Main;
