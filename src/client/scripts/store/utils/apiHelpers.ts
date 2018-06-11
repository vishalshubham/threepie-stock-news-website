import { merge, map } from 'lodash';
import { call, select } from 'redux-saga/effects';

export function basicCaller(api, defaultParams = {}, selectors = [], timeout = 5000) {
  return function *(payload) {
    const state = yield select();
    const params = merge({},
      defaultParams,
      ...map(selectors, (selector) => selector(state)),
      payload
    );
    return yield api(params, timeout);
  };
}

export function withRetry(retryAttempt: number, errorFunc = (error, i) => {}) {
  return (func) => function *(...params) {
      for (let i = 0 ; i <= retryAttempt; ++i) {
        try {
          return yield func(...params);
        } catch (error) {
          yield errorFunc(error, i);
          if (i >= retryAttempt) {
            throw error;
          }
        }
      }
    };
}
