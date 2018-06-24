'use strict';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { configureStore } from 'src/client/scripts/store/store';
import history from './client/scripts/store/history';
import './index.css';
import AppContainer from './client/scripts/containers/app/AppContainer';

function renderApp() {
  ReactDOM.render(
    <Provider store={configureStore()}>
      <ConnectedRouter history={history}>
        <AppContainer />
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root') as HTMLElement
  );
}

renderApp();
