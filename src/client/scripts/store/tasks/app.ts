import { takeLatest } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import { APP_START } from '../actions';

function * handleAppStart() {
  // yield put(fetchStockDataTask());
}

export function * appStartTask() {
	yield takeLatest(APP_START, handleAppStart);
}