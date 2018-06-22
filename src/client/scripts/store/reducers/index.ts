import * as Redux from 'redux';
import { routerReducer } from 'react-router-redux';
import { stockInfoReducer } from './stockReducer';

export const rootReducer = Redux.combineReducers({
  // add all reducers here
  stockInfoState: stockInfoReducer
});

export default rootReducer;

