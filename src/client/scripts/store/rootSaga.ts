import { all, spawn } from 'redux-saga/effects';
import stockSaga from 'src/client/scripts/store/sagas/stock';
import filterSaga from 'src/client/scripts/store/sagas/filter';
import { APP_START } from './actions';
import sessionSaga from './sagas/session';

export default function* rootSaga(): IterableIterator<any> {
  yield all([
    spawn(stockSaga),
    spawn(filterSaga),
    spawn(sessionSaga)
  ]);
}
