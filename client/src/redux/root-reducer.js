import { combineReducers } from 'redux';
import * as NameSpace from './name-spaces.js';
import dataReducer from './data/index.js';

const rootReducer = combineReducers({
  [NameSpace.DATA]: dataReducer,
});

export default rootReducer;
