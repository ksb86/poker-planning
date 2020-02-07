import React, { useState } from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import Slots from '../Games/Slots';
import Cards from '../Cards/Cards';
import styles from './Table.less';

const Table = ({ easter }) => {
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

const mapStateToProps = state => {
    return {
        easter: state.table.easter,
    };
};

export default connect(mapStateToProps, null)(Table);
