import { combineReducers } from 'redux';
import * as Type from './types.js';

const Status = {
  connecting: 'connecting',
  connected: 'connected',
  closed: 'closed',
};

const initState = { status: Status.closed, code: null, delay: null };

const connectionReducer = (state = initState, action) => {
  switch (action.type) {
    case Type.CONNECTION_REQUESTED:
      return { status: Status.connecting, code: null, delay: null };
    case Type.CONNECTION_SUCCEEDED:
      return { status: Status.connected, code: null, delay: null };
    case Type.CONNECTION_CLOSED: {
      const { code, delay } = action.payload;
      return { status: Status.closed, code, delay };
    }
    default: return state;
  }
};

const messagesReducer = (messages = [], action) => {
  if (action.type === Type.MESSAGE_RECEIVED) {
    return [...messages, action.payload];
  }
  return messages;
};

const rootReducer = combineReducers({
  connection: connectionReducer,
  messages: messagesReducer,
});

export default rootReducer;
