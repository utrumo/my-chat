import express from 'express';
import session from 'express-session';
import createFileStore from 'session-file-store';

const { CORS_ORIGIN = 'http://localhost:9000'} = process.env;
const FILE_STORE_OPTIONS = {
  reapInterval: 60 * 30, // 30 minutes;
};
const SESSION_PARSER_OPTIONS = {
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 3, // 3 Days
    sameSite: 'strict',
  },
  resave: false,
  rolling: true,
  saveUninitialized: false,
  secret: '$ECreT',
};
const OPTIONS_METHOD = 'OPTIONS';

const corsMiddleware = (req, res, next) => {
  res.set('Access-Control-Allow-Origin', CORS_ORIGIN);
  res.set('Access-Control-Allow-Credentials', 'true');
  res.set('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, DELETE');
  if (req.method === OPTIONS_METHOD) {
    res.set('Access-Control-Allow-Headers', 'Content-Type');
  }
  next();
};

const createWebServer = (clients) => {
  const fileStore = new (createFileStore(session))(FILE_STORE_OPTIONS);
  const sessionParser = session({ ...SESSION_PARSER_OPTIONS, store: fileStore });
  const app = express();

  app.use(corsMiddleware);
  app.use(express.json());
  app.use(sessionParser);

  app.post('/login', (req, res) => {
    if (!req.body.name) {
      res.status(400).send({ error: 'You did not specify your name' });
      return;
    }
    req.session.name = req.body.name;
    res.status(200).send({ name: req.session.name });
  });

  app.get('/login', (req, res) => {
    if (!req.session.name) {
      res.status(401).send({ error: 'Unauthorized' });
      return;
    }
    res.status(200).send({ name: req.session.name });
  });

  app.delete('/logout', (req, res) => {
    const { id } = req.session;
    req.session.destroy(() => {
      const ws = clients.get(id);
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
