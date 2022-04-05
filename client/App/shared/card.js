import React from 'react';
import styles from './card.less';

export default ({ isSelected, point, onSelect }) => (
    <div onMouseDown={() => onSelect(point)} className={`${styles.card} ${isSelected ? styles.selected : ''}`}>
        <span className={styles.tl}>{point}</span>
        <span>{point}</span>
        <span className={styles.br}>{point}</span>
    </div>
);
