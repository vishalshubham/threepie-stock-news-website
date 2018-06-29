import { Action } from './action';
import { makeSagaActions} from '../utils/sagaHelpers';

export const FETCH_STOCK_DATA_ACTION = makeSagaActions('FETCH_STOCK_DATA');

export const FETCH_VALID_STOCKS_ACTION = makeSagaActions('FETCH_VALID_STOCKS');
