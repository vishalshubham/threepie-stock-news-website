import * as React from 'react';
import { Tabs, Icon } from 'antd';
import NavTabs from 'src/client/scripts/components/elements/navigation/NavTabs';

interface MainContainerProps {
  dispatch?: any;
}

class MainContainer extends React.Component<MainContainerProps, any> {
  public render(): JSX.Element {
    return (
			<div className="main-container">
        <NavTabs
          dispatch={this.props.dispatch}
        />
      </div>
    );
  }
}

export default MainContainer;
