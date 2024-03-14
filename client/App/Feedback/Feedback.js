import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import { CgClose } from 'react-icons/cg';
import { IoIosArrowUp } from 'react-icons/io';
import styles from './Feedback.less';

let isSubmitted = false;

const Modal = ({ isOpen, onClose, onSubmit }) => {
    const [submitted, setSubmitted] = useState(false);
    const [rating, setRating] = useState(null);
    const [goodText, setGoodText] = useState('');
    const [badText, setBadText] = useState('');

    useEffect(() => {
        function eventHandler(e) {
            if (e.keyCode === 27) {
                onClose();
            }
        }
        document.addEventListener('keydown', eventHandler);

        return () => {
            document.removeEventListener('keydown', eventHandler);
        };
    }, []);

    useEffect(() => {
        if (submitted) {
            onSubmit()
        }
    }, [submitted, onSubmit]);

    const handleSubmit = () => {
        db.ref('feedback').push({
            timestamp: Date.now(),
            rating,
            goodText,
            badText,
        });

        setSubmitted(true);
        setTimeout(() => {
            onClose();
        }, 2500);
    };

    return isOpen ? (
        <>
            <div className={styles.modalWrap}>
                <CgClose className={styles.modalClose} onClick={onClose} />
                {submitted ?
                    <div className={styles.thanks}>Thanks for your feedback!</div>
                    :
                    <div>
                        <div className={styles.emojis}>
                            <div className={cx({ [styles.selected]: rating === 1 })} onClick={() => setRating(1)}><div className={styles.shadow} />🤬</div>
                            <div className={cx({ [styles.selected]: rating === 2 })} onClick={() => setRating(2)}><div className={styles.shadow} />🙁</div>
                            <div className={cx({ [styles.selected]: rating === 3 })} onClick={() => setRating(3)}><div className={styles.shadow} />😐</div>
                            <div className={cx({ [styles.selected]: rating === 4 })} onClick={() => setRating(4)}><div className={styles.shadow} />🙂</div>
                            <div className={cx({ [styles.selected]: rating === 5 })} onClick={() => setRating(5)}><div className={styles.shadow} />🤩</div>
                        </div>
                        <div className={styles.feedbackBlock}>
                            <h4>The Good</h4>
                            <textarea maxLength="500" placeholder="ie: this is amazing!" className={styles.feedbackTextarea} value={goodText} onChange={e => setGoodText(e.target.value)} />
                        </div>
                        <div className={styles.feedbackBlock}>
                            <h4>The Bad</h4>
                            <textarea maxLength="500" placeholder="ie: this sucks!" className={styles.feedbackTextarea} value={badText} onChange={e => setBadText(e.target.value)} />
                        </div>
                        <div className={styles.submitBlock}>
                            <button disabled={!rating && !goodText && !badText} className={cx('button', styles.submitBtn)} onClick={handleSubmit}>
                                Submit Feedback
                            </button>
                        </div>
                    </div>
                }
            </div>
            <div className={styles.modalBackdrop} onClick={onClose} />
        </>
    ) : null;
};

export default () => {
    const [isOpen, setIsOpen] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    return (
        <>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} onSubmit={() => setHasSubmitted(true)} />
            {hasSubmitted ?
                null
                :
                <div className={styles.peek} onClick={() => setIsOpen(true)}>
                    <div className={styles.svg}>
                        <IoIosArrowUp fill="#242424"/>
                    </div>
                    <div className={styles.link}>
                        <span className={styles.feedbackLink}>Feedback?</span>
                    </div>
                </div>
            }
        </>
    );
};
