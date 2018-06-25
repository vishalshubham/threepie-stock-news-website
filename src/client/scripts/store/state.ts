'use strict';

import { RouterState } from 'react-router-redux';
import { UsageState } from 'src/client/scripts/store/states/usage';
import { StockInfoState } from 'src/client/scripts/store/states/stock';

// global application state
export interface AppState {
  stockInfoState?: StockInfoState;
  usageState?: UsageState;
  router?: RouterState;
}

