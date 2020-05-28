import { DataOperation } from '@/redux/redux.js';
import DelayCalculator from './delay-calculator.js';

const Status = {
  unauthorized: 401,
};

/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */
const API_SERVER = process.env.API_SERVER;
const USE_HTTPS = process.env.USE_HTTPS;
/* eslint-enable */

const METHOD = {
  get: 'GET',
  post: 'POST',
  delete: 'DELETE',
};

const SubUrl = {
  LOGIN: 'login',
  LOGOUT: 'logout',
};

const MessageType = {
  USER_MESSAGE: 'USER_MESSAGE',
  BROADCAST_MESSAGE: 'BROADCAST_MESSAGE',
  USERS_LIST: 'USERS_LIST',
};

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

class Api {
  constructor(dispatch) {
    this._restApiPath = `${USE_HTTPS === 'true' ? 'https' : 'http'}://${API_SERVER}`;
    this._websocketApiPath = `${USE_HTTPS === 'true' ? 'wss' : 'ws'}://${API_SERVER}`;
    this._dispatch = dispatch;
    this._delayCalc = new DelayCalculator();
    this._ws = null;

    this.checkAuthorizationAndConnect = this.checkAuthorizationAndConnect.bind(this);
    this._websocketConnect = this._createWebsocket.bind(this);
    this._onOpen = this._onOpen.bind(this);
    this._onMessage = this._onMessage.bind(this);
    this._onClose = this._onClose.bind(this);
  }

  async checkAuthorizationAndConnect() {
    this._dispatch(DataOperation.notifyLoadProfileRequested());
    const { response, result: profile } = await this._persistentFetch(SubUrl.LOGIN, METHOD.get);
    if (response.status === Status.unauthorized) {
      this._dispatch(DataOperation.notifyAuthorizationRequired());
      return;
    }
    this._dispatch(DataOperation.notifyLoadProfileSuccess(profile));
    this._createWebsocket();
  }

  async authorizeAndConnect(name) {
    const data = { name };
    this._dispatch(DataOperation.notifyLoadProfileRequested());
    const { result: profile } = await this._persistentFetch(SubUrl.LOGIN, METHOD.post, data);
    this._dispatch(DataOperation.notifyAuthorizationSuccess(profile));
    this._createWebsocket();
  }

  async logout() {
    this._closeWebsocket();
    await this._persistentFetch(SubUrl.LOGOUT, METHOD.delete);
    this._dispatch(DataOperation.notifyLogoutSuccess());
  }

  sendMessage(messageValue) {
    const message = {
      type: MessageType.USER_MESSAGE,
      payload: messageValue,
    };
    const json = JSON.stringify(message);
    this._ws.send(json);
  }

  async _persistentFetch(subUrl, method, data) {
    let response;
    let delay;
    /* eslint-disable no-await-in-loop */
    while (!response) {
      try {
        delay = this._delayCalc.getDelay();
        response = await this._fetch(subUrl, method, data);
      } catch (err) {
        console.dir(err.message, 'delay on ', delay); // eslint-disable-line no-console
        await wait(delay);
      }
    }
    /* eslint-enable no-await-in-loop */
    this._delayCalc.reset();
    const result = await response.json();
    return { response, result };
  }

  async _fetch(subUrl, method, data) {
    const url = `${this._restApiPath}/${subUrl}`;
    const body = data && JSON.stringify(data);
    return fetch(url, {
      method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });
  }

  _createWebsocket() {
    const ws = new WebSocket(this._websocketApiPath);
    ws.onopen = this._onOpen;
    ws.onclose = this._onClose;
    ws.onmessage = this._onMessage;
    this._ws = ws;
    this._dispatch(DataOperation.notifyConnectionRequested());
  }

  _onOpen() {
    this._delayCalc.reset();
    this._dispatch(DataOperation.notifyConnectionSucceeded());
  }

  _onMessage(evt) {
    const data = JSON.parse(evt.data);
    switch (data.type) { // eslint-disable-line default-case
      case MessageType.BROADCAST_MESSAGE: {
        const message = data.payload;
        this._dispatch(DataOperation.notifyBroadcastMessageReceived(message));
        break;
      }
      case MessageType.USERS_LIST: {
        const message = data.payload;
        this._dispatch(DataOperation.notifyUserListMessageReceived(message));
        break;
      }
    }
  }

  _onClose(evt) {
    const { code } = evt;
    const delay = this._delayCalc.getDelay();
    this._closeWebsocket();
    setTimeout(this.checkAuthorizationAndConnect, delay);
    this._dispatch(DataOperation.notifyConnectionClosed(code, delay));
  }

  _closeWebsocket() {
    this._ws.onopen = null;
    this._ws.onclose = null;
    this._ws.onmessage = null;
    this._ws.close();
    this._ws = null;
  }
}

export default Api;
