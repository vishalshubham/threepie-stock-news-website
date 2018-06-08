import * as React from 'react';
import 'src/build/client/scripts/components/elements/navigation/styles/NavBar.css';
import logo from 'src/client/images/logo.png';

class NavBar extends React.Component {
    public render() {
      return (
        <div className="nav-bar-container">
          <div className="nav-bar-header-container">
            <header className="nav-bar-header">
              <img src={logo} className="nav-bar-logo" alt="logo" />
                <div className="nav-bar-title">
                  <h1 className="nav-bar-title--main">ThreePie</h1>
                  <h1 className="nav-bar-title--sub">Technologies</h1>
                </div>
              <h1 className="nav-bar-sub-title">Dashboard</h1>
            </header>
          </div>
        </div>
      );
    }
  }
  
  export default NavBar;
  