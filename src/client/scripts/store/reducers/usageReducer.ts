import { get, toNumber, isEmpty } from 'lodash';
import { createReducer } from 'src/client/scripts/store/utils/reducerHelpers';
import { StockInfoState, StockInfoResult, StockData, StockNews, StockArticle, StockValue } from '../states/stock';
import { Action, UPDATE_FILTERS, FETCH_VALID_STOCKS_ACTION } from 'src/client/scripts/store/actions';
import { UsageState } from 'src/client/scripts/store/states/usage';

const INITIAL_STATE: UsageState = {
  activeStock: '',
  activeTimeRangeId: '',
  validStocks: []
};

const REDUCERS = {
  [UPDATE_FILTERS]: (currentState: UsageState, action: Action) => ({
    ...currentState,
    activeStock: action.payload.symbol,
    activeTimeRangeId: action.payload.activeTimeRangeId,
    activeFromDate: action.payload.activeFromDate,
	  activeToDate: action.payload.activeToDate
  }),
  [FETCH_VALID_STOCKS_ACTION.SUCCESS]: (currentState: UsageState, action: Action) => ({
    ...currentState,
    validStocks: action.payload
  }),
  [FETCH_VALID_STOCKS_ACTION.REQUEST]: (currentState: StockInfoState, action: Action) => ({
    ...currentState,
    validStocks: []
  }),
  [FETCH_VALID_STOCKS_ACTION.ERROR]: (currentState: StockInfoState, action: Action) => ({
    ...currentState,
    validStocks: []
  }),
};

export const usageReducer = createReducer(REDUCERS, INITIAL_STATE);

export const transformer = (item) => {
  return {
    data: item
  };
};

