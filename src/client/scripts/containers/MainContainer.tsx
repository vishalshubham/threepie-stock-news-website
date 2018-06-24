import * as React from 'react';
import { Tabs, Icon } from 'antd';
import NavTabs from 'src/client/scripts/components/elements/navigation/NavTabs';

class Content extends React.Component {
  public render() {
    return (
			<div className="main-container">
        <NavTabs />
      </div>
    );
  }
}
  
export default Content;
