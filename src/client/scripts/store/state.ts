'use strict';

import { RouterState } from 'react-router-redux';
import { StockInfoState } from './states/stock';

// global application state
export interface AppState {
  stockInfoState?: StockInfoState;
  router?: RouterState;
}

