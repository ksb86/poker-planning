import React from 'react';
import { connect } from 'react-redux';
// import config from '../../config';
// import styles from './Controls.less';

const Controls = ({table, moderator}) => {
    const handleStartClick = () => {

    };

    if(moderator) {
        return (
            <div>
                <br/>
                <button type="button" onClick={handleStartClick}>Start</button>
            </div>
        );
    }

    return null;
};

const mapStateToProps = state => {
    return {
        moderator: state.appData.moderator,
        table: state.appData.table
    };
};

export default connect(mapStateToProps, null)(Controls);
