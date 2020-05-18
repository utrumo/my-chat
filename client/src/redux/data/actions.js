/* eslint-disable import/prefer-default-export */
import * as Type from './types';

export const addMessage = (message) => ({
  type: Type.ADD_MESSAGE,
  payload: JSON.parse(message),
});
