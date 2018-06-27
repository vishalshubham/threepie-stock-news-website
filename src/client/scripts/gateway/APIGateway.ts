import { assign, omitBy, map, join, omit } from 'lodash';
import AxiosDataRequester, { baseURL } from './AxiosDataRequester';

// all API calls take *exactly* two parameters where
// the first one carries API params
// the second one(optional, could be undefined) carries API timeout config
export default class APIGateway {

  public static fetchStockData(params, timeout?): Promise<any> {
    const finalParams = {
      symbol : params.payload.symbol,
      fromDate : params.payload.fromDate,
      toDate : params.payload.toDate
    };
    return AxiosDataRequester.get(`${APIGateway.USER_API}`, finalParams, timeout);
  }

  private static readonly BASE_API = '/api/v1';
  private static readonly USER_API = `${APIGateway.BASE_API}` +
    '/ticker/stock-and-news';
}

