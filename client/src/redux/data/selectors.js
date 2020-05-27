import * as NameSpace from '../name-spaces.js';

export const getAuthorizationStatus = (state) => (
  state[NameSpace.DATA].isAuthorizationRequired
);
export const getConnectionState = (state) => state[NameSpace.DATA].connection;
export const getUserName = (state) => {
  const { name } = state[NameSpace.DATA].profile;
  return name || '';
};
export const getMessages = (state) => state[NameSpace.DATA].messages;
export const getUsers = (state) => state[NameSpace.DATA].users;
