import { all, spawn } from 'redux-saga/effects';
import stockSaga from './sagas/stock';

export default function* rootSaga(): IterableIterator<any> {
  yield all([
    spawn(stockSaga)
  ]);
}
