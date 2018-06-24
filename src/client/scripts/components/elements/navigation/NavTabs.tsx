import * as React from 'react';
import 'src/build/client/scripts/components/elements/navigation/styles/NavTabs.css';
import { Tabs, Icon } from 'antd';
import ChartContainer from 'src/client/scripts/containers/chart/ChartContainer';
const TabPane = Tabs.TabPane;

class NavTabs extends React.Component {
  public render() {
    return (
			<Tabs className="nav-tab-container" defaultActiveKey="1" size="large">
    		<TabPane tab={<span><Icon type="line-chart" />Stocks</span>} key="1">
        	<ChartContainer />
    		</TabPane>
    		<TabPane tab={<span><Icon type="dot-chart" />Cryptocurrencies</span>} key="2">
					<ChartContainer />
    		</TabPane>
    		<TabPane tab={<span><Icon type="setting" />Settings</span>} key="3">
					<ChartContainer />
    		</TabPane>
  		</Tabs>
    );
  }
}
  
export default NavTabs;
