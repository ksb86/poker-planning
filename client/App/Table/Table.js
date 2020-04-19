import React, { useState } from 'react';
import cx from 'classnames';
import { useSelector } from 'react-redux';
import Slots from '../Games/Slots';
import Cards from '../Cards/Cards';
import styles from './Table.less';

const Table = () => {
    const { easter } = useSelector(state => state.table);
    const [tab, setTab] = useState('cards');

    return (
        <div className={styles.table}>
            {easter &&
                <div className={styles.nav}>
                    <div className={cx(styles.navItem, {[styles.navActive]: tab === 'cards' })} onClick={() => setTab('cards')}>
                        Cards
                    </div>
                    <div className={cx(styles.navItem, {[styles.navActive]: tab === 'slots' })} onClick={() => setTab('slots')}>
                        Slots
                    </div>
                </div>
            }

            {(tab === 'cards') &&
                <Cards />
            }
            {(tab === 'slots') &&
                <Slots />
            }
        </div>
    );
};

export default Table;
