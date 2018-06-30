import { flatten, find, pick} from 'lodash';
import * as Moment from 'moment';
import { AppState } from 'src/client/scripts/store/state';
import { UsageState } from 'src/client/scripts/store/states/usage';
import { stat } from 'fs';

export function getFilters(state: AppState) {
  const stock = state.usageState.activeStock || '';
  const dateRangeId = state.usageState.activeDateRangeId || '';
  const fromDate = state.usageState.fromDate;
  const toDate = state.usageState.toDate;

  return { stock, dateRangeId, fromDate, toDate };
}
