import WebSocket from 'ws';

const startServer = () => {
  const wss = new WebSocket.Server({ port: 8080 });

  wss.on('connection', (ws) => {
    ws.on('message', (message) => {
      console.log(`Received message => ${message}`); // eslint-disable-line no-console
    });
  });

  let i = 0;
  setInterval(() => {
    const data = JSON.stringify({
      id: i,
      message: `Message from server №${i}`,
    });
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
    i += 1;
  }, 2500);
};

startServer();
