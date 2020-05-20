/* eslint-disable import/prefer-default-export */
import * as NameSpace from '../name-spaces.js';

export const getMessages = (state) => state[NameSpace.DATA].messages;
