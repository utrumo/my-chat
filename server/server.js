import WebSocket from 'ws';

const startServer = () => {
  const wss = new WebSocket.Server({ port: 8080 });

  wss.on('connection', (ws) => {
    ws.on('message', (message) => {
      console.log(`Received message => ${message}`); // eslint-disable-line no-console
    });
  });

  setInterval(() => {
    const data = JSON.stringify({
      timestamp: Date.now(),
      message: 'Message from server',
    });
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  }, 2500);
};

startServer();
