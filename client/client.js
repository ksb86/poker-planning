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
const initialUserId = localStorage.getItem('popl-user-id');
const initialTableId = location?.search?.split('?')[1]?.split('&')?.find(item => {
    if (item.includes('t=')) {
        return true;
    }
})?.split('=')[1];

initialUserId && store.dispatch(setUserId(initialUserId));
initialTableId && store.dispatch(setTableId(initialTableId));

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
