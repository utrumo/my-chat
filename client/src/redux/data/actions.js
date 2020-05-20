/* eslint-disable import/prefer-default-export */
import * as Type from './types';

export const doConnectRequest = () => ({
  type: Type.DO_CONNECT_REQUEST,
});

export const doConnectSuccess = () => ({
  type: Type.DO_CONNECT_SUCCESS,
});

export const doConnectFailure = () => ({
  type: Type.DO_CONNECT_FAILURE,
});

export const doConnectClosed = () => ({
  type: Type.DO_CONNECT_CLOSED,
});

export const receiveMessage = (message) => ({
  type: Type.RECEIVE_MESSAGE,
  payload: message,
});

export const sendMessage = (message) => ({
  type: Type.SEND_MESSAGE,
  payload: message,
});
