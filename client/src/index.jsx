import React from 'react';
import ReactDom from 'react-dom';
import { compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './redux';
import start from './websocket';
import App from './containers/app';

const composeEnchancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnchancers());

start(store.dispatch);

const root = document.createElement('div');
document.body.appendChild(root);
ReactDom.render((
  <Provider store={store}>
    <App />
  </Provider>
), root);
