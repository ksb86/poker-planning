import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';
import App from './App/App';
import { usersUpdated } from './App/appActions';

const userId = localStorage.getItem('popl-user-id') || '';

// use user id in LS to get user from firebase, then add to store?

let table;
try {
  table = location?.search?.split('?')[1].split('&')?.find(item => {
    if (item.includes('t=')) {
      return true;
    }
  })?.split('=')[1];
} catch (error) {
    console.log('no table in url');
}

const initialState = {
    appData: { table }
};

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(promise, thunk)));

if (table) {
    window.unsubscribeInitial = db.collection('users').where('table', '==', table || '').onSnapshot(function(doc) {
        const usersData = doc.docs.map(userRaw => {
            const userData = userRaw.data();
            return {
                id: userRaw.id,
                ...userData
            };
        })
        store.dispatch(usersUpdated(usersData));
    });
}

if(userId) {
    const docRef = db.collection('users').doc("SF");

    docRef.get().then(function(doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
}



render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
