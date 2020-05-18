import React from 'react';
import ReactDom from 'react-dom';
import { compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './redux';
import start from './websocket';
import App from './components/app';

const composeEnchancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnchancers());

start(store.dispatch);

ReactDom.render((
  <Provider store={store}>
    <App />
  </Provider>
),
document.getElementById('root'));
