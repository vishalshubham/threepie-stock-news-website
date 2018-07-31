import { assign, omitBy, map, join, omit } from 'lodash';
import AxiosDataRequester, { baseURL } from './AxiosDataRequester';

// all API calls take *exactly* two parameters where
// the first one carries API params
// the second one(optional, could be undefined) carries API timeout config
export default class APIGateway {

  public static fetchStockData(params, timeout?): Promise<any> {
    const finalParams = {
      symbol : params.symbol,
      period : params.activeDateRangeId
    };
    return AxiosDataRequester.get(`${APIGateway.STOCKS_API}`, finalParams, timeout);
  }

  public static fetchValidStocks(params, timeout?): Promise<any> {
    return AxiosDataRequester.get(`${APIGateway.VALID_STOCKS_API}`, params, timeout);
  }

  public static fetchValidPeriods(params, timeout?): Promise<any> {
    return AxiosDataRequester.get(`${APIGateway.VALID_PERIODS_API}`, params, timeout);
  }

  public static loginSession(params, timeout?): Promise<any> {
    return AxiosDataRequester.put(`${APIGateway.LOGIN_API}`, params, timeout);
  }

  public static logoutSession(params, timeout?): Promise<any> {
    return AxiosDataRequester.get(`${APIGateway.LOGOUT_API}`, params, timeout);
  }

  private static readonly BASE_API = '/api/v1';
  private static readonly STOCKS_API = `${APIGateway.BASE_API}` + '/ticker/stock-and-news';
  private static readonly VALID_STOCKS_API = `${APIGateway.STOCKS_API}` + '/valid-stocks';
  private static readonly VALID_PERIODS_API = `${APIGateway.STOCKS_API}` + '/valid-time-periods';
  private static readonly SESSION_API = '/ui/authentication';
  private static readonly LOGIN_API = `${APIGateway.SESSION_API}` + '/login';
  private static readonly LOGOUT_API = `${APIGateway.SESSION_API}` + '/clearSession';
}

