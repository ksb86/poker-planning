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
        case actionTypes.SET_USER_DATA: {

            if(!localStorage.getItem('popl-user-id')) {
                localStorage.setItem('popl-user-id', action.payload.userId);
            }

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

        case actionTypes.REMOVE_USER_DATA: {
            localStorage.removeItem('popl-user-id');

            return initialState;
        }

        case actionTypes.USERS_UPDATED: {
            if (state.userId) {
                const currentUser = action.payload.users.find(user => user.id === state.userId);
                if (currentUser) {
                    return {
                        ...state,
                        points: currentUser.points,
                    };
                }

                return state;
            }

            return state;
        }

        default: {
            return state;
        }
    }
};
