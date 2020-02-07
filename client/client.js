import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { composeWithDevTools } from 'redux-devtools-extension';
import Konami from 'konami';
import reducers from './reducers';
import { toggleEaster } from './App/appActions';
import App from './App/App';

const store = createStore(reducers, composeWithDevTools(applyMiddleware(promise, thunk)));

new Konami(() => {
    store.dispatch(toggleEaster());
    // alert('Exciting things to come!!!')
});

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
