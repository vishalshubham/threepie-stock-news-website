import { takeLatest, call, take, select } from 'redux-saga/effects';
import { FETCH_STOCK_DATA_ACTION,
          APP_START,
          UPDATE_FILTERS_STOCK,
          UPDATE_FILTERS_DATE } from 'src/client/scripts/store/actions';
import { fetchStockDataTask } from 'src/client/scripts/store/tasks/stock';
import { getFilters } from 'src/client/scripts/store/accessors/filters';
import { AppState } from 'src/client/scripts/store/state';
import { isEmpty } from 'lodash';

export default function * filterSaga() {
  try {
    yield take(APP_START);
    yield takeLatest(UPDATE_FILTERS_STOCK, handleUpdateFilters);
    yield takeLatest(UPDATE_FILTERS_DATE, handleUpdateFilters);
  } catch (error) {
    console.error(`Error while running stockSaga: ${error}`);
  }
}

export function* handleUpdateFilters(action) {
  const filters = yield select((state: AppState) => state.usageState);
  if (!isEmpty(filters.activeStock) && !isEmpty(filters.fromDate) && !isEmpty(filters.toDate)) {
    yield call(fetchStockDataTask, {
      symbol: filters.activeStock,
      fromDate: filters.fromDate,
      toDate: filters.toDate
    });
  }
}
