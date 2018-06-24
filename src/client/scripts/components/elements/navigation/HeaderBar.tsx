import * as React from 'react';
import 'src/build/client/scripts/components/elements/navigation/styles/HeaderBar.css';
import logo from 'src/client/images/logo.png';

class HeaderBar extends React.Component {
    public render() {
      return (
        <div className="header-bar-container">
          <div className="header-bar-header-container">
            <header className="header-bar-header">
              <img src={logo} className="header-bar-logo" alt="logo" />
                <div className="header-bar-title">
                  <h1 className="header-bar-title--main">ThreePie</h1>
                  <h1 className="header-bar-title--sub">Technologies</h1>
                </div>
              <h1 className="header-bar-sub-title">Dashboard</h1>
            </header>
          </div>
        </div>
      );
    }
  }
  
  export default HeaderBar;
  