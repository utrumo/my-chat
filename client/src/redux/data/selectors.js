import * as NameSpace from '../name-spaces.js';

export const getConnectionState = (state) => state[NameSpace.DATA].connection;
export const getMessages = (state) => state[NameSpace.DATA].messages;
