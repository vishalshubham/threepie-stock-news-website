import { FETCH_STOCK_DATA } from 'src/client/scripts/store/actions';
import APIGateway from 'src/client/scripts/gateway/APIGateway';
import { makeSagaTask } from 'src/client/scripts/store/utils/sagaHelpers';
import { basicCaller } from 'src/client/scripts/store/utils/apiHelpers';

export const fetchUserPreferenceTask = makeSagaTask(FETCH_STOCK_DATA,
  basicCaller(APIGateway.fetchStockData, {}, [], 30000)
);
