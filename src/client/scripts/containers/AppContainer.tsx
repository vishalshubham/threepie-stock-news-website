import * as React from 'react';
import './AppContainer.css';
import logo from 'src/client/images/logo.svg';

class AppContainer extends React.Component {
  public render() {
    return (
      <div className="app-container">
        <header className="app-header">
          <img src={logo} className="app-logo" alt="logo" />
          <h1 className="app-title">Welcome to React</h1>
        </header>
        <p className="app-intro">
          To get started, edit <code>src/AppContainer.tsx</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default AppContainer;
