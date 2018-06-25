import * as React from 'react';
import ChartContainer from 'src/client/scripts/containers/chart/ChartContainer';
import CustomList from 'src/client/scripts/components/elements/list/CustomList';
import { Dispatch } from 'redux';
import * as Moment from 'moment';
import { updateFilters } from 'src/client/scripts/store/actions';
import CustomDateRangePicker from 'src/client/scripts/components/elements/picker/CustomDateRangePicker';
import { Row, Col } from 'antd';
import 'src/build/client/scripts/containers/stock/styles/StockContainer.css';

const data = [{
  symbol: 'AAPL',
  name: 'Apple Inc.'
},{
  symbol: 'AMZN',
  name: 'Amazon.com, Inc.'
},{
  symbol: 'MSFT',
  name: 'Microsoft Corporation'
},{
  symbol: 'FB',
  name: 'Facebook, Inc.'
},{
  symbol: 'GOOG',
  name: 'Alphabet Inc.'
},{
  symbol: 'NFLX',
  name: 'Netflix, Inc.'
}];

interface StockContainerProps {
  dispatch?: Dispatch<any>;
}

class StockContainer extends React.Component<StockContainerProps, any> {
  public render() {
    return (
			<div className="stock-container">
        <Row>
          <Col span={6}>
            <CustomList
              data={data}
              onChange={this.handleOnStockChange}
              dispatch={this.props.dispatch}
    				/>
          </Col>
          <Col span={6}>
            <CustomDateRangePicker
              onClick={this.handleOnDateRangeChange}
              dispatch={this.props.dispatch}
            />
          </Col>
        </Row>
				
        
      	<ChartContainer />
			</div>
    );
  }

  private handleOnStockChange = (value) => {
    this.props.dispatch(updateFilters({
      symbol: value,
      fromDate: Moment.utc().local().add(-3, 'days').format('YYYY-MM-DD'),
      toDate: Moment.utc().local().format('YYYY-MM-DD')
    }));
    console.log(`selected ${value}`);
  }

  private handleOnDateRangeChange = (item) => {
    const from = 
      item.target.id === 'past-one-day' ?
        Moment.utc().local().format('YYYY-MM-DD') :
        (item.target.id === 'past-one-week' ?
          Moment.utc().local().add(-7, 'days').format('YYYY-MM-DD') :
          Moment.utc().local().add(-30, 'days').format('YYYY-MM-DD'));

    this.props.dispatch(updateFilters({
      symbol: 'amzn',
      fromDate: from,
      toDate: Moment.utc().local().format('YYYY-MM-DD')
    }));
    console.log(`selected ${item}`);
  }
}
  
export default StockContainer;
