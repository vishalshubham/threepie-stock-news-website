import { flatten, find, pick} from 'lodash';
import * as Moment from 'moment';
import { AppState } from 'src/client/scripts/store/state';
import { UsageState } from 'src/client/scripts/store/states/usage';

export function getFilters(state: AppState) {
  const stock = state.usageState.activeStock || '';
  const timeRangeId = state.usageState.activeTimeRangeId || '';

  return { stock, timeRangeId };
}
