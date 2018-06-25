import * as React from 'react';
import 'src/build/client/scripts/components/elements/navigation/styles/NavTabs.css';
import { Tabs, Icon } from 'antd';
import ChartContainer from 'src/client/scripts/containers/chart/ChartContainer';
import StockContainer from 'src/client/scripts/containers/stock/StockContainer';
const TabPane = Tabs.TabPane;

interface NavTabsProps {
	dispatch?: any;
}

class NavTabs extends React.Component<NavTabsProps, any> {
  public render(): JSX.Element {
    return (
			<Tabs className="nav-tab-container" defaultActiveKey="1" size="large">
    		<TabPane tab={<span><Icon type="line-chart" />Stocks</span>} key="1">
        	<StockContainer
          	dispatch={this.props.dispatch}
					/>
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
