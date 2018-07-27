import { get, toNumber, isEmpty } from 'lodash';
import { createReducer } from 'src/client/scripts/store/utils/reducerHelpers';
import { StockInfoState, StockInfoResult, StockData, StockNews, StockArticle, StockValue } from '../states/stock';
import { Action, FETCH_STOCK_DATA_ACTION } from 'src/client/scripts/store/actions';

const INITIAL_STATE: StockInfoState = {
  loading: false,
  error: false,
  result: null
};

const REDUCERS = {
  [FETCH_STOCK_DATA_ACTION.SUCCESS]: (currentState: StockInfoState, action: Action) => ({
    loading: false,
    error: false,
    result: transformer(action.payload)
  }),
  [FETCH_STOCK_DATA_ACTION.REQUEST]: (currentState: StockInfoState, action: Action) => ({
    ...currentState,
    result: null,
    loading: true,
    error: false,
  }),
  [FETCH_STOCK_DATA_ACTION.ERROR]: (currentState: StockInfoState, action: Action) => ({
    ...currentState,
    result: null,
    loading: false,
    error: true,
  }),
};

export const stockInfoReducer = createReducer(REDUCERS, INITIAL_STATE);

export const valueTransformer = (item): StockValue => {
  // TODO: Sort these articles as per time stamp
  return {
    open: toNumber(get(item, 'open')),
	  high: toNumber(get(item, 'high')),
	  low: toNumber(get(item, 'low')),
	  close: toNumber(get(item, 'close')),
	  volume: toNumber(get(item, 'volume')),
	  time: get(item, 'time')
  };
}

export const dataTransformer = (item): StockData => {
  if (!isEmpty(item)) {
    return {
      information: get(item, 'information'),
      symbol: get(item, 'symbol'),
      lastRefreshed: get(item, 'lastRefreshed'),
      interval: get(item, 'interval'),
      outputSize: get(item, 'outputSize'),
      timeZone: get(item, 'timeZone'),
      values: get(item, 'details')
        .map(valueTransformer)
    };
  } else {
    return null;
  }
}

export const articleTransformer = (item): StockArticle => {
  return {
    source: get(item, 'source'),
    author: get(item, 'author'),
    title: get(item, 'title'),
    description: get(item, 'description'),
    url: get(item, 'url'),
    urlToImage: get(item, 'urlToImage'),
    publishedAt: get(item, 'publishedAt'),
    computedStockValue: get(item, 'computedStockValue')
  };
}

export const newsTransformer = (item): StockNews => {
  // TODO: Sort these articles as per time stamp
  if (!isEmpty(item)) {
    return {
      articles: get(item, 'articles')
        .map(articleTransformer)
    };
  } else {
    return null;
  }
}

export const transformer = (item): StockInfoResult => {
  return {
    data: dataTransformer(get(item, 'stock')),
    news: newsTransformer(get(item, 'news'))
  };
};

