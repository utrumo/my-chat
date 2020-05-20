import { combineReducers } from 'redux';
import * as Type from './types';

const messagesReducer = (messages = [], action) => {
  if (action.type === Type.RECEIVE_MESSAGE) {
    return [...messages, action.payload];
  }
  return messages;
};

const rootReducer = combineReducers({
  messages: messagesReducer,
});

export default rootReducer;
