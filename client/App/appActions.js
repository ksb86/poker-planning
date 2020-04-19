export const actionTypes = {
    USERS_UPDATED: 'USERS_UPDATED',
    SET_USER_DATA: 'SET_USER_DATA',
    TABLE_UPDATED: 'TABLE_UPDATED',
    SET_TABLE: 'SET_TABLE',
    UPDATE_CURRENT_USER_NAME: 'UPDATE_CURRENT_USER_NAME',
    TOGGLE_EASTER: 'TOGGLE_EASTER',
    SET_EDITING_MODERATOR: 'SET_EDITING_MODERATOR',
    SET_USER_ID: 'SET_USER_ID',
    SET_TABLE_ID: 'SET_TABLE_ID',
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
export const updateCurrentUserName = payload => {
    return {
        type: actionTypes.UPDATE_CURRENT_USER_NAME,
        payload
    };
};

export const tableUpdated = payload => {
    return {
        type: actionTypes.TABLE_UPDATED,
        payload
    };
};

export const toggleEaster = () => {
    return {
        type: actionTypes.TOGGLE_EASTER
    };
};

export const setEditingModerator = payload => {
    return {
        type: actionTypes.SET_EDITING_MODERATOR,
        payload
    };
};
export const setUserId = userId => {
    localStorage.setItem('popl-user-id', userId);

    return {
        type: actionTypes.SET_USER_ID,
        userId,
    };
};
export const setTableId = tableId => {
    return {
        type: actionTypes.SET_TABLE_ID,
        tableId,
    };
};
