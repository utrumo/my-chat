import WebSocket from 'ws';

function heartbeat() {
  this.isAlive = true;
}

const checkIsAlive = (wss) => {
  const interval = setInterval(() => {
    wss.clients.forEach((ws) => { // eslint-disable-line consistent-return
      if (ws.isAlive === false) {
        return ws.terminate();
      }
      ws.isAlive = false; // eslint-disable-line no-param-reassign
      ws.ping();
    });
  }, 30000);

  wss.on('close', () => {
    clearInterval(interval);
  });
};

const logReceivedMessage = (ws) => {
  ws.on('message', (message) => {
    console.log(`Received message => ${message}`); // eslint-disable-line no-console
  });
};

const sendTestMessage = (wss) => {
  setInterval(() => {
    const data = JSON.stringify({
      timestamp: Date.now(),
      message: 'Message from server',
    });

    wss.clients.forEach((ws) => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(data);
      }
    });
  }, 2500);
};

const startServer = () => {
  const wss = new WebSocket.Server({ port: 8080 });

  wss.on('connection', (ws) => {
    ws.isAlive = true; // eslint-disable-line no-param-reassign
    ws.on('pong', heartbeat);
    logReceivedMessage(ws);
  });

  checkIsAlive(wss);
  sendTestMessage(wss);
};

startServer();
