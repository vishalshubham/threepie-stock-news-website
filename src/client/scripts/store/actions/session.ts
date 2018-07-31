import { Action } from './action';
import { makeSagaActions} from '../utils/sagaHelpers';

export const LOGIN_SESSION_ACTION = makeSagaActions('LOGIN_SESSION');

export const LOGIN_SESSION = 'LOGIN_SESSION';
export const loginSession = (params): Action => ({ type: LOGIN_SESSION, payload: params });
