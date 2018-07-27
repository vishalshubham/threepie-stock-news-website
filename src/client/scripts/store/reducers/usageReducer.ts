import { get, toNumber, isEmpty } from 'lodash';
import { createReducer } from 'src/client/scripts/store/utils/reducerHelpers';
import { StockInfoState, StockInfoResult, StockData, StockNews, StockArticle, StockValue } from '../states/stock';
import { Action,
          FETCH_VALID_STOCKS_ACTION,
          UPDATE_FILTERS_STOCK,
          UPDATE_FILTERS_DATE, 
          UPDATE_FILTERS_TOGGLE} from 'src/client/scripts/store/actions';
import { UsageState } from 'src/client/scripts/store/states/usage';

const INITIAL_STATE: UsageState = {
  activeStock: '',
  activeDateRangeId: '',
  activeToggle: 'both',
  validStocks: []
};

const REDUCERS = {
  [UPDATE_FILTERS_STOCK]: (currentState: UsageState, action: Action) => ({
    ...currentState,
    activeStock: action.payload.symbol
  }),
  [UPDATE_FILTERS_DATE]: (currentState: UsageState, action: Action) => ({
    ...currentState,
    activeDateRangeId: action.payload.activeDateRangeId
  }),
  [UPDATE_FILTERS_TOGGLE]: (currentState: UsageState, action: Action) => ({
    ...currentState,
    activeToggle: action.payload.activeToggle
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

