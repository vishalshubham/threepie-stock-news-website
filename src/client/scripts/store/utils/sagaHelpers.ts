import { get } from 'lodash';
import { call, put, take, select, fork, cancel } from 'redux-saga/effects';
import { AppState } from 'src/client/scripts/store/state';
import { Action } from 'src/client/scripts/store/actions/action';
import { matchPath } from 'react-router';
import { LOCATION_CHANGE } from 'react-router-redux';

interface SagaActions {
  REQUEST: string;
  SUCCESS: string;
  ERROR: string;
  createRequest: (payload?: any) => Action;
  createSuccess: (data?: any) => Action;
  createError: (error?: any) => Action;
}

export function makeSagaActions(type): SagaActions {
  const actions = {
    REQUEST: `${type}_REQUEST`,
    SUCCESS: `${type}_SUCCESS`,
    ERROR: `${type}_ERROR`,
  };

  return {
    ...actions,
    createRequest: (input) => ({ type: actions.REQUEST, payload: input }),
    createSuccess: (data) => ({ type: actions.SUCCESS, payload: data }),
    createError: (error) => ({ type: actions.ERROR, payload: error }),
  };
}

export function makeSagaTask(actions: SagaActions, func: (payload: any) => any) {
  return function *(arg?: any) {
    // Dispatch the request action for setting loading
    yield put(actions.createRequest(arg));
    try {
      // prepare API params and execute the call
      const results = yield call(func, arg);
      // when code runs here, we should have the data, then we dispatch succeed action to reducer
      yield put(actions.createSuccess(results));
      return results;
    } catch (error) {
      // adding the original request params as a part of the error info
      yield put(actions.createError({...error, requestPayload: arg}));
      throw error;
    }
  };
}


export function forkOnMatch(pathToMarch: string, saga: () => IterableIterator<any>, exact: boolean= true) {
  return function *() {
     let pathname = yield select((state: AppState) => get(state, 'router.location.pathname', ''));
     while (true) {
       if (matchPath(pathname, { path: pathToMarch, exact })) {
         const spawned = yield fork(saga);
         while (true) {
           const action = yield take(LOCATION_CHANGE);
           if (!matchPath(action.payload.pathname, { path: pathToMarch, exact })) {
             yield cancel(spawned);
             break;
           }
         }
       }
       const changeLocAction = yield take(LOCATION_CHANGE);
       pathname = changeLocAction.payload.pathname;
     }
   };
 }
 