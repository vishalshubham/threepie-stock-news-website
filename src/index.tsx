import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import AppContainer from './client/scripts/containers/AppContainer';

ReactDOM.render(
  <AppContainer />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
