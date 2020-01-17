import { actionTypes } from './appActions';

const initialState = {
    tableId: null,
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
                ...action.payload
            };
        }
        case actionTypes.SET_TABLE: {
            return {
                ...state,
                tableId: action.payload.tableId
            };
        }

        default: {
            return state;
        }
    }
};
