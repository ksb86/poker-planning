import React from 'react';
import { connect } from 'react-redux'

const Controls = ({ fbTableId, tableId, tableVoting }) => {
    const toggleVotingStatus = async () => {
        const tableRef = window.db.collection('tables').doc(fbTableId);
        // TODO: try catch
        await tableRef.update({ tableVoting: !tableVoting });
        if (!tableVoting) {
            const result = await db.collection('users').where('tableId', '==', tableId).get();
            const clearVotesBatch = db.batch();

            result.docs.map(userRef => {
                clearVotesBatch.update(userRef.ref, {"currentVote": firebase.firestore.FieldValue.delete()});
            });
            await clearVotesBatch.commit();
        }
    };

    return <button type="button" onClick={toggleVotingStatus}>{tableVoting ? 'Stop Voting' : 'New Round'}</button>;
};

const mapStateToProps = state => {
    return {
        tableVoting: state.table.tableVoting,
        fbTableId: state.table.fbTableId,
        tableId: state.table.tableId
    };
};
const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
