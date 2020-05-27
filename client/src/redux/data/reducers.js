import { combineReducers } from 'redux';
import * as Type from './types.js';

const authorizationReducer = (state = false, action) => {
  switch (action.type) {
    case Type.AUTHORIZATION_REQUIRED:
    case Type.LOGOUT_FROM_SERVER_SUCCESS:
      return true;
    case Type.AUTHORIZATION_SUCCESS:
    case Type.LOAD_PROFILE_SUCCESS:
      return false;
    default:
      return state;
  }
};

const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case Type.AUTHORIZATION_SUCCESS:
    case Type.LOAD_PROFILE_SUCCESS:
      return action.payload;
    case Type.LOGOUT_FROM_SERVER_SUCCESS:
      return {};
    default:
      return state;
  }
};

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
    case Type.LOGOUT_FROM_SERVER_SUCCESS:
      return initState;
    default: return state;
  }
};

const messagesReducer = (messages = [], action) => {
  if (action.type === Type.BROADCAST_MESSAGE_RECEIVED) {
    return [...messages, action.payload];
  }
  return messages;
};

const usersReducer = (users = [], action) => {
  switch (action.type) {
    case Type.USERS_LIST_MESSAGE_RECEIVED:
      return action.payload;
    case Type.LOGOUT_FROM_SERVER_SUCCESS:
      return [];
    default:
      return users;
  }
};

const rootReducer = combineReducers({
  isAuthorizationRequired: authorizationReducer,
  profile: profileReducer,
  connection: connectionReducer,
  messages: messagesReducer,
  users: usersReducer,
});

export default rootReducer;
