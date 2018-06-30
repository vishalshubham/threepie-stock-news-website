import { Action } from './action';

export const APP_START = 'APP_START';
export const appStart = (): Action => ({ type: APP_START, payload: null });

export const UPDATE_FILTERS_STOCK = 'UPDATE_FILTERS_STOCK';
export const updateFiltersStock = (filters): Action => ({ type: UPDATE_FILTERS_STOCK, payload: filters });
export const UPDATE_FILTERS_DATE = 'UPDATE_FILTERS_DATE';
export const updateFiltersDate = (filters): Action => ({ type: UPDATE_FILTERS_DATE, payload: filters });
