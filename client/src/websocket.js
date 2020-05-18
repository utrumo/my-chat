import { DataOperation } from './redux';

const SERVER_URL = 'ws://localhost:8080/';

const start = (dispatch) => {
  const ws = new WebSocket(SERVER_URL);

  ws.onopen = () => {
    ws.send('Client connected');
    console.log('Connected'); // eslint-disable-line no-console
  };

  ws.onmessage = (message) => {
    dispatch(DataOperation.addMessage(message.data));
  };

  ws.onerror = (error) => {
    console.log('error:', error); // eslint-disable-line no-console
  };

  ws.onclose = (data) => {
    console.log('Connection closed', data); // eslint-disable-line no-console
  };
};

export default start;
