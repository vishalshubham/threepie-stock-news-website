'use strict';

import { RouterState } from 'react-router-redux';
import { UsageState } from 'src/client/scripts/store/states/usage';
import { StockInfoState } from 'src/client/scripts/store/states/stock';
import { SessionState } from 'src/client/scripts/store/states/session';

// global application state
export interface AppState {
  stockInfoState?: StockInfoState;
  usageState?: UsageState;
  sessionState?: SessionState;
  router?: RouterState;
}

