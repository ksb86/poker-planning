import { actionTypes } from './appActions';

const initialState = {
    tableId: null,
    fbTableId: null,
    tableVoting: true,
    users: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USERS_UPDATED: {
            return {
                ...state,
                users: action.payload.users
            };
        }
        case actionTypes.TABLE_UPDATED: {
            return {
                ...state,
                tableId: action.payload.tableId,
                tableVoting: action.payload.tableVoting,
                fbTableId: action.payload.fbTableId
            };
        }

        default: {
            return state;
        }
    }
};
