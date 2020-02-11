import React from 'react';
import { connect } from 'react-redux';
import Users from '../Users/Users';
import Table from '../Table/Table';
import Graph from '../Graph/Graph';
import styles from './Main.less';

const Main = ({ tableVoting }) => {
    return (
        <div className={styles.table}>
            <Users />
            {tableVoting ? <Table /> : <Graph />}
        </div>
    );
};

const mapStateToProps = state => ({
    tableVoting: state.table.tableVoting,
});

export default connect(mapStateToProps, null)(Main);
