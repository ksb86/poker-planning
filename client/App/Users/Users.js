import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cx from 'classnames';
import { setEditingModerator } from '../appActions';
import Controls from '../Controls/Controls';
import Indicator from '../shared/indicator';
import X from '../shared/X';
import styles from './Users.less';

const Users = () => {
    const dispatch = useDispatch();
    const { moderator } = useSelector(state => state.currentUser);
    const {
        easter,
        editingModerator,
        tableId,
        tableVoting,
        users,
     } = useSelector(state => state.table);

    const [toolTip, setToolTip] = useState({show: false});

    const ttEscapeFn = useCallback(event => {
        if(event.keyCode === 27) {
          setToolTip({show: false});
        }
    }, []);

    const ttClickFn = useCallback(event => {
        if (toolTip.show && !event.target.closest('.tool-tip')) {
            setToolTip({show: false});
        }
    }, [toolTip]);

    useEffect(() => {
        document.addEventListener("keydown", ttEscapeFn, false);
        document.addEventListener("click", ttClickFn, false);

        return () => {
            document.removeEventListener("keydown", ttEscapeFn, false);
            document.removeEventListener("click", ttClickFn, false);
        };
    }, [toolTip]);

    const handleDelete = async user => {
        if (window.confirm(`Remove "${user.name}" from table?`)) {
            await window.db.ref(`tables/${tableId}/users/${user.userId}`).remove();
        }
    };

    const handleSelectModerator = (e, {userId, name}) => {
        setToolTip({
            show: true,
            x: e.pageX,
            y: e.pageY,
            name,
            userId,
        });
    };
    const handleAssignModerator = () => {
        db.ref(`tables/${tableId}/users/`).transaction(function(users) {
            let users2;
            users2 = Object.entries(users).reduce((acc, [key, user]) => {
                if (user.userId === toolTip.userId) {
                    user.moderator = true;
                } else {
                    user.moderator = false;
                }
                acc[key] = user;
                return acc;
            }, {});
            return users2;
        });
        dispatch(setEditingModerator(false));
        setToolTip({
            show: false
        });
    };

    return (
        <div className={styles.users}>
            {toolTip.show &&
                <div className={cx("tool-tip", styles.confirmModeratorToolTip)} style={{left: `${toolTip.x}px`, top: `${toolTip.y}px`}}>
                    Assign <strong>{toolTip.name}</strong> as Moderator?
                    <br/>
                    <br/>
                    <button className="button" type="button" onClick={handleAssignModerator}>Yes</button>&nbsp;&nbsp;&nbsp;
                    <button className="button" type="button" onClick={() => setToolTip({show: false})}>No</button>
                </div>
            }
            <ul className={styles.users}>
                {users.map(user => {
                    return (
                        <li className={cx(
                                styles.user,
                                {[styles.editing]: (editingModerator && !user.moderator)},
                                {[styles.unselectableUser]: editingModerator && user.moderator})
                            }
                            key={user.userId}
                            onClick={e => (moderator && editingModerator && !user.moderator) ? handleSelectModerator(e, user) : () => {}}>
                            <span>
                                <span className={styles.userName}>
                                    {user.name}
                                </span>
                                {easter && <span className={styles.points}>{user.points || '0'} pts</span>}
                            </span>
                            {!editingModerator &&
                                <span className={styles.indicators}>
                                    {tableVoting ?
                                        <Indicator ready={Boolean(user.currentVote)} />
                                        :
                                        <span>{user.currentVote || '-'}</span>
                                    }
                                    {moderator && !user.moderator &&
                                        <span className={styles.deleteUser} onClick={() => handleDelete(user)}>
                                            <X />
                                        </span>
                                    }
                                </span>
                            }
                        </li>
                    );
                })}
            </ul>
            {moderator && tableId ? <Controls /> : null }
            <div className={styles.hint}>↑↑↓↓←→←→BA</div>
        </div>
    );
};

export default Users;
