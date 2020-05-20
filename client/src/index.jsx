import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import createStore from './redux/index.js';
import App from './containers/app/app.jsx';

const store = createStore();
const root = document.createElement('div');

document.body.appendChild(root);
ReactDom.render((
  <Provider store={store}>
    <App />
  </Provider>
), root);
