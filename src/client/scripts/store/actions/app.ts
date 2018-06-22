import { Action } from './action';

export const APP_START = 'APP_START';
export const appStart = (): Action => ({ type: APP_START, payload: null });