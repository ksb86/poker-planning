import React from 'react';
import { connect } from 'react-redux';
import config from '../../config';
// import styles from './Cards.less';

const Cards = ({}) => {
    return (
        <div>
            Cards:
            <ul>
                {config.pointOptions.map((point, i) => {
                    return <li key={i}><button>{point}</button></li>;
                })}
            </ul>
        </div>
    );
};

const mapStateToProps = state => {
    return {
    };
};

export default connect(mapStateToProps, null)(Cards);
