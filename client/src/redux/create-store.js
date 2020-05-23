import { compose, createStore as _createStore, applyMiddleware } from 'redux';
import rootReducer from './root-reducer.js';
import createWebSocketMiddleware from './middleware/web-socket/web-socket.js';

const createStore = () => {
  const composeEnchancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const webSocketMiddleware = createWebSocketMiddleware();
  const store = _createStore(rootReducer, composeEnchancers(
    applyMiddleware(webSocketMiddleware),
  ));
  return store;
};

export default createStore;
