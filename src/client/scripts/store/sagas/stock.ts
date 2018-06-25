import { takeLatest, call } from 'redux-saga/effects';
import { fetchStockDataTask } from 'src/client/scripts/store/tasks/stock';

export default function * stockSaga() {
  try {
    yield call(fetchStockDataTask);
  } catch (error) {
    console.error(`Error while running stockSaga: ${error}`);
  }
}
