import { actionTypes } from './appActions';

const initialState = {
    userId: null,
    name: null,
    moderator: false,
    addUserError: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_USER_DATA: {

            // debugger;
            if(!localStorage.getItem('popl-user-id')) {
                localStorage.setItem('popl-user-id', action.payload.userId);
            }

            return {
                ...state,
                ...action.payload
            };
        }

        case actionTypes.REMOVE_USER_DATA: {
            localStorage.removeItem('popl-user-id');

            return initialState;
        }

        default: {
            return state;
        }
    }
};
