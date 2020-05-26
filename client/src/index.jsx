import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createStore from './redux/redux.js';
import AppContainer from './containers/app-container.js';

const store = createStore();
const root = document.querySelector('#app-root');

ReactDOM.render((
  <Provider store={store}>
    <AppContainer />
  </Provider>
), root);
