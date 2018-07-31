import { get, toNumber, isEmpty } from 'lodash';
import { createReducer } from 'src/client/scripts/store/utils/reducerHelpers';
import { StockInfoState, StockInfoResult, StockData, StockNews, StockArticle, StockValue } from '../states/stock';
import { Action,
         LOGIN_SESSION,
         LOGIN_SESSION_ACTION} from 'src/client/scripts/store/actions';
import { UsageState } from 'src/client/scripts/store/states/usage';
import { SessionState } from 'src/client/scripts/store/states/session';

const INITIAL_STATE: SessionState = {
  username: '',
  password: '',
  isSessionActive: false
};

const REDUCERS = {
  [LOGIN_SESSION]: (currentState: SessionState, action: Action) => ({
    ...currentState,
    username: action.payload.username,
    password: action.payload.password,
    isSessionActive: action.payload.isSessionActive
  }),
  [LOGIN_SESSION_ACTION.SUCCESS]: (currentState: SessionState, action: Action) => ({
    ...currentState,
    isSessionActive: transformer(action.payload.username)
  }),
  [LOGIN_SESSION_ACTION.REQUEST]: (currentState: SessionState, action: Action) => ({
    ...currentState,
    isSessionActive: transformer(action.payload.username)
  }),
  [LOGIN_SESSION_ACTION.ERROR]: (currentState: SessionState, action: Action) => ({
    ...currentState,
    isSessionActive: transformer(action.payload.username)
  }),
};

export const sessionReducer = createReducer(REDUCERS, INITIAL_STATE);

export const transformer = (item) => {
  return !isEmpty(item)
};
