export const actionTypes = {
    ADD_USER_TO_FB: 'ADD_USER_TO_FB',
    REMOVE_USER_FROM_FB: 'REMOVE_USER_FROM_FB',
    USERS_UPDATED: 'USERS_UPDATED'
};

export const usersUpdated = payload => {
    return {
        type: actionTypes.USERS_UPDATED,
        payload
    };
};

export const addUserToFireBase = payload => {
    return {
        type: actionTypes.ADD_USER_TO_FB,
        payload: new Promise((res, rej) => {
            window.db.collection("users")
            .add({
              name: payload.name,
              table: payload.table,
              moderator: payload.moderator
            })
            .then(docRef => {
                res({
                    userId: docRef.id,
                    moderator: payload.moderator,
                    name: payload.name,
                    table: payload.table
                })
            })
            .catch(error => {
                rej({
                    error
                })
            });
        })
    };
};

export const removeUserFromFirebase = payload => {
    return {
        type: actionTypes.REMOVE_USER_FROM_FB,
        payload: new Promise((res, rej) => {
            window.db.collection("users")
            .doc(payload.userId)
            .delete()
            .then(() => {
                res({
                    id: payload.userId
                });
            }).catch(error => {
                rej({
                    error
                });
            });
        })
    };
};
