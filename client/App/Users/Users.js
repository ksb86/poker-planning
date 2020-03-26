import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import Controls from '../Controls/Controls';
import Indicator from '../shared/indicator';
import X from '../shared/X';
import styles from './Users.less';

const Users = ({ users, tableVoting, tableId, moderator, easter, editingModerator }) => {
    const [toolTip, setToolTip] = useState({show: false});

    const ttEscapeFn = useCallback(event => {
        if(event.keyCode === 27) {
          setToolTip({show: false});
        }
    }, []);

    const ttClickFn = useCallback(event => {
        if (toolTip.show && !event.target.closest('.tool-tip')) {
            console.log('close here');
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
            await window.db.ref(`tables/${tableId}/users/${user.id}`).remove();
        }
    };

    const handleSelectModerator = (e, {id, name}) => {
        setToolTip({
            show: true,
            x: e.pageX,
            y: e.pageY,
            name,
            userId: id,
        });
    };
    const handleAssignModerator = () => {

        // db.ref(`tables/${tableId}/table/`).update({ tableVoting: !tableVoting });

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
            console.log('users2: ', users2);
            return users2;
        });
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
                        <li className={cx(styles.user, editingModerator ? styles.editing : '')} key={user.id}>
                            <span>
                                <span className={styles.userName} onClick={e => moderator && editingModerator ? handleSelectModerator(e, user) : () => {}}>
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

const mapStateToProps = state => ({
    users: state.table.users || [],
    tableVoting: state.table.tableVoting,
    tableId: state.table.tableId,
    moderator: state.currentUser.moderator,
    easter: state.table.easter,
    editingModerator: state.table.editingModerator,
});

export default connect(mapStateToProps, null)(Users);
