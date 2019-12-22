export const actionTypes = {
    REMOVE_USER_DATA: 'REMOVE_USER_DATA',
    USERS_UPDATED: 'USERS_UPDATED',
    SET_USER_DATA: 'SET_USER_DATA',
    TABLE_UPDATED: 'TABLE_UPDATED',
    SET_TABLE: 'SET_TABLE'
};

export const usersUpdated = payload => {
    return {
        type: actionTypes.USERS_UPDATED,
        payload
    };
};

export const setCurrentUserData = payload => {
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

export const tableUpdated = payload => {
    return {
        type: actionTypes.TABLE_UPDATED,
        payload
    };
};

export const setTable = payload => {
    return {
        type: actionTypes.SET_TABLE,
        payload
    };
};
