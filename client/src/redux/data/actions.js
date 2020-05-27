import * as Type from './types.js';

export const connectToServer = () => ({
  type: Type.CONNECT_TO_SERVER,
});
export const authorizeOnServer = (name) => ({
  type: Type.AUTHORIZE_ON_SERVER,
  payload: name,
});
export const logoutFromServer = () => ({
  type: Type.LOGOUT_FROM_SERVER,
});
export const sendMessage = (message) => ({
  type: Type.SEND_MESSAGE,
  payload: message,
});

export const notifyLoadProfileRequested = () => ({
  type: Type.LOAD_PROFILE_REQUESTED,
});
export const notifyAuthorizationRequired = () => ({
  type: Type.AUTHORIZATION_REQUIRED,
});
export const notifyAuthorizationSuccess = (profile) => ({
  type: Type.AUTHORIZATION_SUCCESS,
  payload: profile,
});
export const notifyLoadProfileSuccess = (profile) => ({
  type: Type.LOAD_PROFILE_SUCCESS,
  payload: profile,
});
export const notifyLogoutSuccess = () => ({
  type: Type.LOGOUT_FROM_SERVER_SUCCESS,
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
export const notifyBroadcastMessageReceived = (message) => ({
  type: Type.BROADCAST_MESSAGE_RECEIVED,
  payload: message,
});
export const notifyUserListMessageReceived = (message) => ({
  type: Type.USERS_LIST_MESSAGE_RECEIVED,
  payload: message,
});
