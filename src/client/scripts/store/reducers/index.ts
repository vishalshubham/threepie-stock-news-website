import * as Redux from 'redux';
import { routerReducer } from 'react-router-redux';
import { stockInfoReducer } from './stockReducer';
import { usageReducer } from './usageReducer';
import { sessionReducer } from './sessionReducer';

export const rootReducer = Redux.combineReducers({
  // add all reducers here
  stockInfoState: stockInfoReducer,
  usageState: usageReducer,
  sessionState: sessionReducer
});

export default rootReducer;

