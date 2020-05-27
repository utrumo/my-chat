import WebSocket from 'ws';

const createWebsocketServer = (clients) => {
  const wss = new WebSocket.Server({ clientTracking: false, noServer: true });

  function heartbeat() {
    this.isAlive = true;
  }

  const broadcast = (data) => {
    const json = JSON.stringify(data);

    clients.forEach((ws) => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(json);
      }
    });
  };

  const messageHandler = (req) => (json) => {
    req.session.touch();
    req.session.save();

    const data = JSON.parse(json);

    switch (data.type) { // eslint-disable-line default-case
      case 'SEND_MESSAGE': {
        const message = { timestamp: Date.now(), message: data.payload };
        broadcast(message);
      }
    }
  };

  wss.on('connection', (ws, req) => {
    const { id } = req.session;
    clients.set(id, ws);

    ws.isAlive = true; // eslint-disable-line no-param-reassign
    ws.on('pong', heartbeat);
    ws.on('message', messageHandler(req));
    ws.on('close', () => { clients.delete(id); });
  });

  const interval = setInterval(() => {
    clients.forEach((ws) => { // eslint-disable-line consistent-return
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

  return wss;
};

export default createWebsocketServer;
