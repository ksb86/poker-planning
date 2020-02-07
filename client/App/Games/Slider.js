import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import styles from './Slider.less';

const Slider = ({ }) => {
    const [left, setLeft] = useState(0);
    const running = useRef(false);

    // const increment = left => left + 1;
    useEffect(() => {

        const interval = setInterval(() => {
            // console.log({left})
            setLeft((left) => {
                // console.log(running.current);
                // console.log({left});
                if (running.current) {
                    if (left === 100) {
                        return 0;
                    }
                    return left + 1;
                }
                return left;
            });
        }, 10);
        return () => {
            clearInterval(interval);
            document.removeEventListener('keydown', handleKeyDown);

        };
    }, []);

    return (
        <>
            <div className={styles.sliderContainer}>
                <div style={{left: `${left}%`}} className={styles.dot} />
                <br/>
            </div>
            <button onClick={() => running.current = !running.current}>{running ? 'Stop' : 'Start'}</button>
        </>
    );
};

const mapStateToProps = state => {
    return {
    };
};

export default connect(mapStateToProps, null)(Slider);
