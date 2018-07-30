import { FETCH_STOCK_DATA_ACTION,
         FETCH_VALID_STOCKS_ACTION,
         FETCH_VALID_PERIODS_ACTION } from 'src/client/scripts/store/actions';
import APIGateway from 'src/client/scripts/gateway/APIGateway';
import { makeSagaTask } from 'src/client/scripts/store/utils/sagaHelpers';
import { basicCaller } from 'src/client/scripts/store/utils/apiHelpers';
import * as Moment from 'moment';

export const fetchStockDataTask = makeSagaTask(FETCH_STOCK_DATA_ACTION,
  basicCaller(APIGateway.fetchStockData, {}, [], 30000)
);

export const fetchValidStocksTask = makeSagaTask(FETCH_VALID_STOCKS_ACTION,
  basicCaller(APIGateway.fetchValidStocks, {}, [], 30000)
);

export const fetchValidPeriodsTask = makeSagaTask(FETCH_VALID_PERIODS_ACTION,
  basicCaller(APIGateway.fetchValidPeriods, {}, [], 30000)
);
