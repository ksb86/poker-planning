export const actionTypes = {
    REMOVE_USER_DATA: 'REMOVE_USER_DATA',
    USERS_UPDATED: 'USERS_UPDATED',
    SET_USER_DATA: 'SET_USER_DATA',
    SET_TABLE: 'SET_TABLE'
};

export const setTable = payload => {
    return {
        type: actionTypes.SET_TABLE,
        payload
    };
};

export const usersUpdated = payload => {
    return {
        type: actionTypes.USERS_UPDATED,
        payload
    };
};

export const setUserData = payload => {
    return {
        type: actionTypes.SET_USER_DATA,
        payload
    };
};

export const removeUserData = () => {
    return {
        type: actionTypes.REMOVE_USER_DATA
    };
};
