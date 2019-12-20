import { actionTypes } from './appActions';

const initialState = {
    tableId: null,
    users: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_TABLE: {
            return {
                ...state,
                tableId: action.payload.tableId
            };
        }
        case actionTypes.USERS_UPDATED: {
            return {
                ...state,
                users: action.payload.users
            };
        }

        default: {
            return state;
        }
    }
};
