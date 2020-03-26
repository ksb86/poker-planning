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
        case actionTypes.USERS_UPDATED: {
            const userId = localStorage.getItem('popl-user-id');
            if (userId && !action.payload.users.some(user => user.id === userId)) {
                // user was removed from table
                localStorage.removeItem('popl-user-id');
                document.location.href = '/';
            }

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
