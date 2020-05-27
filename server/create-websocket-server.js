import WebSocket from 'ws';

const KEEP_ALIVE_INTERVAL = 1000 * 30; // 30 sec
const MAX_MESSAGE_LENGTH = 2000;
const MessageType = {
  USER_MESSAGE: 'USER_MESSAGE',
  BROADCAST_MESSAGE: 'BROADCAST_MESSAGE',
  USERS_LIST: 'USERS_LIST',
};

function heartbeat() {
  this.isAlive = true;
}

const enableKeepAliveChecking = (clients) => {
  const interval = setInterval(() => {
    clients.forEach(({ ws }) => { // eslint-disable-line consistent-return
      if (ws.isAlive === false) {
        return ws.close();
      }
      ws.isAlive = false; // eslint-disable-line no-param-reassign
      ws.ping();
    });
  }, KEEP_ALIVE_INTERVAL);
  return () => clearInterval(interval);
};

const broadcast = (data, clients) => {
  const json = JSON.stringify(data);

  clients.forEach(({ ws }) => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(json);
    }
  });
};

const sendActualUsersList = (clients) => {
  const usersList = [...clients].map(([id, { name }]) => ({ id, name }));
  const message = {
    type: MessageType.USERS_LIST,
    payload: usersList,
  };
  broadcast(message, clients);
};

const messageHandler = (json, clients) => {
  const data = JSON.parse(json);

  switch (data.type) { // eslint-disable-line default-case
    case MessageType.USER_MESSAGE: {
      const userMessage = data.payload.length <= MAX_MESSAGE_LENGTH
        ? data.payload
        : data.payload.slice(0, MAX_MESSAGE_LENGTH);
      const message = {
        type: MessageType.BROADCAST_MESSAGE,
        payload: {
          timestamp: Date.now(),
          message: userMessage,
        },
      };
      broadcast(message, clients);
    }
  }
};

const createWebsocketServer = (clients) => {
  const wss = new WebSocket.Server({ clientTracking: false, noServer: true });
  const disableKeepAliveChecking = enableKeepAliveChecking(clients);

  wss.on('connection', (ws, req) => {
    const { id, name } = req.session;
    clients.set(id, { ws, name });
    ws.isAlive = true; // eslint-disable-line no-param-reassign
    sendActualUsersList(clients);

    ws.on('pong', heartbeat);
    ws.on('message', (evt) => {
      messageHandler(evt, clients);
    });
    ws.on('close', () => {
      clients.delete(id);
      sendActualUsersList(clients);
    });
  });
  wss.on('close', () => {
    disableKeepAliveChecking();
  });

  return wss;
};

export default createWebsocketServer;
