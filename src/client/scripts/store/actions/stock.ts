import { Action } from './action';
import { makeSagaActions} from '../utils/sagaHelpers';

export const FETCH_STOCK_DATA = makeSagaActions('FETCH_STOCK_DATA');
