import React from 'react';
import { connect } from 'react-redux';
// import config from '../../config';
// import styles from './Controls.less';

const Controls = ({ moderator }) => {
    const handleStartClick = () => {

    };

    if (moderator) {
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
        moderator: state.currentUser.moderator
    };
};

export default connect(mapStateToProps, null)(Controls);
