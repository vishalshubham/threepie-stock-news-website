import { takeLatest, call, all } from 'redux-saga/effects';
import { fetchValidStocksTask, fetchValidPeriodsTask } from 'src/client/scripts/store/tasks/stock';

export default function * stockSaga() {
  try {
    yield all([
      call(fetchValidStocksTask),
      call(fetchValidPeriodsTask)
    ]);
  } catch (error) {
    console.error(`Error while running stockSaga: ${error}`);
  }
}
