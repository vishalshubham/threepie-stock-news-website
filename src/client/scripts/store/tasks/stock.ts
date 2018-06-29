import { FETCH_STOCK_DATA_ACTION, FETCH_VALID_STOCKS_ACTION } from 'src/client/scripts/store/actions';
import APIGateway from 'src/client/scripts/gateway/APIGateway';
import { makeSagaTask } from 'src/client/scripts/store/utils/sagaHelpers';
import { basicCaller } from 'src/client/scripts/store/utils/apiHelpers';
import * as Moment from 'moment';

const defaultParams = {
  symbol: 'AMZN',
  fromDate: Moment.utc().add(-2, 'days').format('YYYY-MM-DD'),
  toDate: Moment.utc().format('YYYY-MM-DD')
}
export const fetchStockDataTask = makeSagaTask(FETCH_STOCK_DATA_ACTION,
  basicCaller(APIGateway.fetchStockData, defaultParams, [], 30000)
);

export const fetchValidStocksTask = makeSagaTask(FETCH_VALID_STOCKS_ACTION,
  basicCaller(APIGateway.fetchValidStocks, {}, [], 30000)
);
