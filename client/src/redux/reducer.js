import { combineReducers } from 'redux';
import * as NameSpace from './name-spaces';
import { reducer as dataReducer } from './data';

const reducer = combineReducers({
  [NameSpace.DATA]: dataReducer,
});

export default reducer;
