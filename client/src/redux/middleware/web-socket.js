import {
  Operation as DataOperation,
  Type as DataType,
} from '../data';

const SERVER_URL = 'ws://localhost:8080/';

const onOpen = (dispatch) => () => {
  dispatch(DataOperation.doConnectSuccess());
  console.log('onOpen'); // eslint-disable-line no-console
};
const onError = (dispatch) => (evt) => {
  dispatch(DataOperation.doConnectFailure());
  console.log('onError', evt); // eslint-disable-line no-console
};
const onClose = (dispatch) => (evt) => {
  dispatch(DataOperation.doConnectClosed());
  console.log('onClose', evt); // eslint-disable-line no-console
};
const onMessage = (dispatch) => (evt) => {
  const data = JSON.parse(evt.data);
  dispatch(DataOperation.receiveMessage(data));
  console.log('onMessage', evt); // eslint-disable-line no-console
};

const createSocket = (dispatch) => {
  const socket = new WebSocket(SERVER_URL);
  socket.onopen = onOpen(dispatch);
  socket.onerror = onError(dispatch);
  socket.onclose = onClose(dispatch);
  socket.onmessage = onMessage(dispatch);
  return socket;
};

const createWebSocketMiddleware = () => {
  let ws = null;

  return (_store) => (next) => (action) => {
    switch (action.type) { // eslint-disable-line default-case
      case DataType.DO_CONNECT_REQUEST:
        ws = createSocket(next);
        break;

      case DataType.DO_CONNECT_CLOSED:
        ws.close();
        ws = null;
        break;

      case DataType.SEND_MESSAGE:
        ws.send(JSON.stringify(action.payload));
        break;
    }
    return next(action);
  };
};

export default createWebSocketMiddleware;
