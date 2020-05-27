import Api from '@/api/api.js';
import { Type as DataType } from '../data/data.js';

const SERVER_URL = 'localhost:8080';

const createConnectMiddleware = () => {
  let api = null;

  return (_store) => (next) => (action) => {
    const result = next(action);

    if (!api) {
      api = new Api(SERVER_URL, next);
    }

    switch (action.type) { // eslint-disable-line default-case
      case DataType.CONNECT_TO_SERVER:
        api.checkAuthorizationAndConnect();
        break;
      case DataType.AUTHORIZE_ON_SERVER: {
        const userName = action.payload;
        api.authorizeAndConnect(userName);
        break;
      }
      case DataType.LOGOUT_FROM_SERVER:
        api.logout();
        break;
      case DataType.SEND_MESSAGE: {
        const messageVaule = action.payload;
        api.sendMessage(messageVaule);
        break;
      }
    }

    return result;
  };
};

export default createConnectMiddleware;
