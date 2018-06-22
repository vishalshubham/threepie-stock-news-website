'use strict';

import { compose, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';
import rootSaga from './rootSaga';
import rootReducer from './reducers';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = compose;

const middlewares: any[] = [
  routerMiddleware(history),
  sagaMiddleware
];

// attach redux logger only for dev mode
// result should be displayed in console
// if (process.env.NODE_ENV === 'development') {
//   const { logger } = require('redux-logger');
//   middlewares.push(logger);
// }

export function configureStore(initState = {}) {
  const store = createStore(
    rootReducer,
    initState,
    composeEnhancers(
      applyMiddleware.apply(
        null,
        middlewares
      )
    )
  );
  sagaMiddleware.run(rootSaga);
  return store;
}

