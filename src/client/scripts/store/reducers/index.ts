import * as Redux from 'redux';
import { routerReducer } from 'react-router-redux';
import { stockInfoReducer } from './stockReducer';
import { usageReducer } from './usageReducer';

export const rootReducer = Redux.combineReducers({
  // add all reducers here
  stockInfoState: stockInfoReducer,
  usageState: usageReducer
});

export default rootReducer;

