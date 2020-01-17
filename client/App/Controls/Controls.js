import React from 'react';
import { connect } from 'react-redux'
import styles from './Controls.less';

const Controls = ({ tableId, tableVoting }) => {
    // console.log({tableVoting});
    const toggleVotingStatus = async () => {
        // console.log({tableId});
        // console.log({tableVoting});
        // const tableRef = window.db.collection('tables').doc(tableId);

        // TODO: try catch
        db.ref(`tables/${tableId}/table/`).update({ tableVoting: !tableVoting });

        if (!tableVoting) {
            db.ref(`tables/${tableId}/users/`).transaction(function(users) {
                return Object.entries(users).reduce((acc, [key, user]) => {
                    delete user.currentVote;
                    acc[key] = user;
                    return acc;
                }, {});
                // if (post) {
                //   if (post.stars && post.stars[uid]) {
                //     post.starCount--;
                //     post.stars[uid] = null;
                //   } else {
                //     post.starCount++;
                //     if (!post.stars) {
                //       post.stars = {};
                //     }
                //     post.stars[uid] = true;
                //   }
                // }
                // return post;
              });

            // const result = await db.collection('users').where('tableId', '==', tableId).get();
            // const clearVotesBatch = db.batch();

            // result.docs.map(userRef => {
            //     clearVotesBatch.update(userRef.ref, {"currentVote": firebase.firestore.FieldValue.delete()});
            // });
            // await clearVotesBatch.commit();
        }
    };

    return (
        <div className={styles.controls}>
            <button type="button" onClick={toggleVotingStatus}>{tableVoting ? 'Stop Voting' : 'New Round'}</button>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        tableVoting: state.table.tableVoting,
        tableId: state.table.tableId
    };
};
const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
