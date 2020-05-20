import { combineReducers } from 'redux';
import * as NameSpace from './name-spaces';
import dataReducer from './data';

const rootReducer = combineReducers({
  [NameSpace.DATA]: dataReducer,
});

export default rootReducer;
