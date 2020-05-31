import http from 'http';
import createWebServer from './create-web-server.js';
import createWebsocketServer from './create-websocket-server.js';

const clients = new Map();
const { webServer, sessionParser } = createWebServer(clients);
const wss = createWebsocketServer(clients);
const server = http.createServer(webServer);

server.on('upgrade', (req, socket, head) => {
  sessionParser(req, {}, () => {
    if (!req.session.name) {
      socket.destroy();
      return;
    }

    wss.handleUpgrade(req, socket, head, (ws) => {
      wss.emit('connection', ws, req);
    });
  });
});

server.listen(3000);
