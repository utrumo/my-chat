/* eslint-disable import/prefer-default-export */
import * as types from './types';

const initState = {
  messages: [],
};

export const reducer = (state = initState, action) => {
  switch (action.type) {
    case types.ADD_MESSAGE: return {
      ...state,
      messages: [...state.messages, action.payload],
    };
    default: return state;
  }
};
