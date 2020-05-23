import * as Type from './types.js';

export const sendConnectionRequest = () => ({
  type: Type.SEND_CONNECTION_REQUEST,
});
export const sendMessage = (message) => ({
  type: Type.SEND_MESSAGE,
  payload: message,
});

export const notifyConnectionRequested = () => ({
  type: Type.CONNECTION_REQUESTED,
});
export const notifyConnectionSucceeded = () => ({
  type: Type.CONNECTION_SUCCEEDED,
});
export const notifyConnectionClosed = (code, delay) => ({
  type: Type.CONNECTION_CLOSED,
  payload: { code, delay },
});
export const notifyMessageReceived = (message) => ({
  type: Type.MESSAGE_RECEIVED,
  payload: message,
});
