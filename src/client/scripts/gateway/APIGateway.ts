import { assign, omitBy, map, join, omit } from 'lodash';
import AxiosDataRequester, { baseURL } from './AxiosDataRequester';

// all API calls take *exactly* two parameters where
// the first one carries API params
// the second one(optional, could be undefined) carries API timeout config
export default class APIGateway {

  public static fetchStockData(params, timeout?): Promise<any> {
    const finalParams = {
      symbol : params.symbol,
      fromDate : params.fromDate,
      toDate : params.toDate
    };
    return AxiosDataRequester.get(`${APIGateway.STOCKS_API}`, finalParams, timeout);
  }

  public static fetchValidStocks(params, timeout?): Promise<any> {
    return AxiosDataRequester.get(`${APIGateway.VALID_STOCKS_API}`, params, timeout);
  }

  private static readonly BASE_API = '/api/v1';
  private static readonly STOCKS_API = `${APIGateway.BASE_API}` +
    '/ticker/stock-and-news';
  private static readonly VALID_STOCKS_API = `${APIGateway.STOCKS_API}` +
    '/valid-stocks';
}

