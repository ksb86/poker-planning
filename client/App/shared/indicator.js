import React from 'react';
import styles from './indicator.less';

export default ({ ready }) => (
    <div className={`${styles.indicator} ${ready ? styles.green : styles.red}`}>&nbsp;</div>
);
