import { Action } from './action';

export const APP_START = 'APP_START';
export const APP_STARTT = 'APP_STARTT';
export const appStart = (): Action => ({ type: APP_START, payload: null });

export const UPDATE_FILTERS = 'UPDATE_FILTERS';
export const updateFilters = (filters): Action => ({ type: UPDATE_FILTERS, payload: filters });
