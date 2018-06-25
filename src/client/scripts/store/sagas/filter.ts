import { takeLatest, call, take } from 'redux-saga/effects';
import { FETCH_STOCK_DATA_ACTION, APP_START, UPDATE_FILTERS } from 'src/client/scripts/store/actions';
import { fetchStockDataTask } from 'src/client/scripts/store/tasks/stock';

export default function * filterSaga() {
  try {
    yield take(APP_START);
    yield takeLatest(UPDATE_FILTERS, handleUpdateFilters);
  } catch (error) {
    console.error(`Error while running stockSaga: ${error}`);
  }
}

export function* handleUpdateFilters(action) {
  yield call(fetchStockDataTask, action);
}
