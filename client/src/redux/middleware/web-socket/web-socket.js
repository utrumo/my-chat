import DelayCalculator from './delay-calculator.js';
import {
  Operation as DataOperation,
  Type as DataType,
} from '../../data/data.js';

const SERVER_URL = 'ws://localhost:8080/';

const onOpen = (dispatch, delayCalc) => () => {
  delayCalc.reset();
  dispatch(DataOperation.notifyConnectionSucceeded());
  // console.log('onOpen', evt);
};

const onCloseRetryConnection = (dispatch, createWebSocket, delayCalc) => (evt) => {
  const { code } = evt;
  const delay = delayCalc.getDelay();
  setTimeout(() => createWebSocket(dispatch), delay);
  dispatch(DataOperation.notifyConnectionClosed(code, delay));
  // console.log('onClose', evt);
};

const onMessage = (dispatch) => (evt) => {
  const data = JSON.parse(evt.data);
  dispatch(DataOperation.notifyMessageReceived(data));
  // console.log('onMessage', evt);
};

const createWebSocketMiddleware = () => {
  let ws = null;
  const delayCalc = new DelayCalculator();

  const createSocket = (dispatch) => {
    ws = new WebSocket(SERVER_URL);
    ws.onopen = onOpen(dispatch, delayCalc);
    ws.onclose = onCloseRetryConnection(dispatch, createSocket, delayCalc);
    ws.onmessage = onMessage(dispatch);
    dispatch(DataOperation.notifyConnectionRequested());
  };

  return (_store) => (next) => (action) => {
    switch (action.type) { // eslint-disable-line default-case
      case DataType.SEND_CONNECTION_REQUEST:
        createSocket(next);
        break;
      case DataType.SEND_MESSAGE:
        ws.send(JSON.stringify(action.payload));
        break;
    }
    return next(action);
  };
};

export default createWebSocketMiddleware;
