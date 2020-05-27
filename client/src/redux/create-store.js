import { compose, createStore as _createStore, applyMiddleware } from 'redux';
import rootReducer from './root-reducer.js';
import createConnectMiddleware from './middleware/connect.js';

const createStore = () => {
  const composeEnchancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const connect = createConnectMiddleware();
  const middlewares = [connect];
  const store = _createStore(rootReducer, composeEnchancers(
    applyMiddleware(...middlewares),
  ));
  return store;
};

export default createStore;
