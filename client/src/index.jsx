import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import createStore from './redux';
import App from './containers/app';

const store = createStore();
const root = document.createElement('div');

document.body.appendChild(root);
ReactDom.render((
  <Provider store={store}>
    <App />
  </Provider>
), root);
