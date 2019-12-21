import React from 'react';
import { connect } from 'react-redux';
import Users from '../Users/Users';
import Cards from '../Cards/Cards';
import Graph from '../Graph/Graph';
import styles from './Table.less';

const Table = ({ tableVoting }) => {
    return (
        <div className={styles.table}>
            <Users />
            {tableVoting ? <Cards /> : <Graph />}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        tableVoting: state.table.tableVoting
    };
};

export default connect(mapStateToProps, null)(Table);
