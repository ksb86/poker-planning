import { actionTypes } from './appActions';

const initialState = {
    userId: null,
    name: null,
    table: null,
    addUserError: null,
    users: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USERS_UPDATED: {
            // if (action.payload.error) {
            //     console.warn(action.payload.error);

            //     return {
            //         ...state,
            //         addUserError: 'Could not add user.'
            //     };
            // }

            return {
                ...state,
                users: action.payload
            };
        }
        case `${actionTypes.ADD_USER_TO_FB}_FULFILLED`: {
            if (action.payload.error) {
                console.warn(action.payload.error);

                return {
                    ...state,
                    addUserError: 'Could not add user.'
                };
            }

            localStorage.setItem("popl-user-name", action.payload.name);
            localStorage.setItem("popl-user-id", action.payload.userId);

            return {
                ...state,
                userId: action.payload.userId,
                name: action.payload.name,
                moderator: action.payload.moderator,
                table: action.payload.table
            };
        }
        case `${actionTypes.REMOVE_USER_FROM_FB}_FULFILLED`: {
            if (action.payload.error) {
                console.warn(action.payload.error);

                return {
                    ...state,
                    addUserError: 'Could not remove user.'
                };
            }

            localStorage.removeItem("popl-user-name");
            localStorage.removeItem("popl-user-id");

            return {
                ...state,
                userId: null,
                name: null
            };
        }

        default: {
            return state;
        }
    }
};
