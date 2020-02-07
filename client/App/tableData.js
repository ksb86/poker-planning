import { actionTypes } from './appActions';

const initialState = {
    tableId: null,
    tableVoting: true,
    users: [],
    easter: true
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USERS_UPDATED: {
            const userId = localStorage.getItem('popl-user-id');
            if (userId && !action.payload.users.some(user => user.id === userId)) {
                // user was removed from table
                console.log('hisss');
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

        default: {
            return state;
        }
    }
};
