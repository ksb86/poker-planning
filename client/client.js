import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { composeWithDevTools } from 'redux-devtools-extension';
import Konami from 'konami';
import reducers from './reducers';
import { toggleEaster, setUserId, setTableId } from './App/appActions';
import App from './App/App';

const store = createStore(reducers, composeWithDevTools(applyMiddleware(promise, thunk)));

new Konami(() => {
    store.dispatch(toggleEaster());
});

const run = async () => {
    let initialUserId = localStorage.getItem('popl-user-id');
    const initialTableId = location?.search?.split('?')[1]?.split('&')?.find(item => {
        if (item.includes('t=')) {
            return true;
        }
    })?.split('=')[1];

    if (initialTableId) {
        // when a tableId is present in the url, check to see if user actually exists in that table
        const snapshot = await db.ref(`tables/${initialTableId}/users/${initialUserId}`).once('value');
        const user = snapshot.val();

        // if not, they are are likely trying to join a different room.
        // remove user id from localstorage and reset initialUserId before adding to store
        // (should probably remove user from old table, but we don't have the old tableId at this point)
        if (!user) {
            localStorage.removeItem('popl-user-id');
            initialUserId = null;
        }
    }

    initialUserId && store.dispatch(setUserId(initialUserId));
    initialTableId && store.dispatch(setTableId(initialTableId));

    render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('root')
    );
};

run();
