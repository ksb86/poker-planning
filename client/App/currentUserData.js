import { actionTypes } from './appActions';

const initialState = {
    userId: null,
    name: null,
    moderator: false,
    addUserError: null,
    points: 0,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_USER_ID: {
            return {
                ...state,
                userId: action.userId,
            };
        }

        case actionTypes.SET_USER_DATA: {
            return {
                ...state,
                ...action.payload
            };
        }

        case actionTypes.UPDATE_CURRENT_USER_NAME: {
            return {
                ...state,
                name: action.payload
            };
        }

        case actionTypes.USERS_UPDATED: {
            if (state.userId && !action.payload.users.some(user => user.userId === state.userId)) {
                // user was removed from table
                localStorage.removeItem('popl-user-id');
                document.location.href = '/';
            }

            return { ...state };
        }

        default: {
            return state;
        }
    }
};
