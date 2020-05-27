import express from 'express';
import session from 'express-session';
import createFileStore from 'session-file-store';

const FILE_STORE_OPTIONS = {
  reapInterval: 60 * 10, // 10 minutes;
};
const SESSION_PARSER_OPTIONS = {
  cookie: { maxAge: 1000 * 60 * 60 },
  resave: false,
  rolling: true,
  saveUninitialized: false,
  secret: '$ECreT',
};

const createWebServer = (clients) => {
  const fileStore = new (createFileStore(session))(FILE_STORE_OPTIONS);
  const sessionParser = session({ ...SESSION_PARSER_OPTIONS, store: fileStore });
  const app = express();
  app.use(express.json());
  app.use(sessionParser);

  app.post('/login', (req, res) => {
    if (!req.body.name) {
      res.status(400).send({ error: 'You did not specify your name' });
      return;
    }
    req.session.name = req.body.name;
    res.status(200).send({ message: 'OK' });
  });

  app.get('/login', (req, res) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:9000');
    // res.set('Access-Control-Allow-Credentials', 'true');
    // res.set("Access-Control-Allow-Headers", "Content-Type");

    if (!req.session.name) {
      res.status(401).send({ error: 'Unauthorized' });
      return;
    }
    res.status(200).send({ name: req.session.name });
  });

  app.delete('/logout', (req, res) => {
    req.session.destroy(() => {
      const ws = clients.get(req.session.id);

      if (ws) {
        ws.close();
      }

      res.clearCookie('connect.sid');
      res.status(200).send({ message: 'OK' });
    });
  });

  return { sessionParser, webServer: app };
};

export default createWebServer;
