import { actionTypes } from './appActions';

const initialState = {
    tableId: null,
    tableVoting: true,
    users: [],
    easter: false,
    editingModerator: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_TABLE_ID: {
            return {
                ...state,
                tableId: action.tableId,
            };
        }

        case actionTypes.USERS_UPDATED: {
            const userCount = action.payload.users.length;
            const votedCount = action.payload.users.filter(user => user.currentVote).length;
            document.title = `Voting Poker (voting: ${votedCount}/${userCount})`;
            return {
                ...state,
                users: action.payload.users
            };
        }

        case actionTypes.TABLE_UPDATED: {
            // const userCount = action.payload.users.length;
            // const votedCount = action.payload.users.filter(user => user.currentVote).length;
            ;
            !action.payload.tableVoting ? document.title = `Voting Poker` : null;
            return {
                ...state,
                ...action.payload
            };
        }

        case actionTypes.SET_TABLE: {
            return {
                ...state,
                tableId: action.payload.tableId
            };
        }

        case actionTypes.TOGGLE_EASTER: {
            return {
                ...state,
                easter: !state.easter
            };
        }

        case actionTypes.SET_EDITING_MODERATOR: {
            return {
                ...state,
                editingModerator: action.payload,
            };
        }

        default: {
            return state;
        }
    }
};
