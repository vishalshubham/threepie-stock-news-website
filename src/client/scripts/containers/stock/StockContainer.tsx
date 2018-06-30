import * as React from 'react';
import ChartContainer from 'src/client/scripts/containers/chart/ChartContainer';
import CustomList from 'src/client/scripts/components/elements/list/CustomList';
import { Dispatch } from 'redux';
import * as Moment from 'moment';
import { updateFiltersStock, updateFiltersDate } from 'src/client/scripts/store/actions';
import CustomDateRangePicker from 'src/client/scripts/components/elements/picker/CustomDateRangePicker';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import 'src/build/client/scripts/containers/stock/styles/StockContainer.css';
import { StockTicker, KVMap } from 'src/client/scripts/data_models/general';
import { get } from 'lodash';
import { AppState } from 'src/client/scripts/store/state';

interface StockContainerProps {
  dispatch?: Dispatch<any>;
  validStocks?: StockTicker[];
}

const mapStateToProps = (state: AppState) => {
  return {
    validStocks: state.usageState.validStocks
  }
}

@connect(mapStateToProps)
export default class StockContainer extends React.Component<StockContainerProps, any> {

  constructor(props) {
    super(props);
    this.handleOnStockChange = this.handleOnStockChange.bind(this);
    this.handleOnDateRangeChange = this.handleOnDateRangeChange.bind(this);
  }

  public render(): JSX.Element {
    return (
			<div className="stock-container">
        <Row>
          <Col span={6}>
            <CustomList
              data={this.props.validStocks}
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
    this.props.dispatch(updateFiltersStock({
      symbol: value
    }));
  }

  private handleOnDateRangeChange = (item) => {
    const from = 
      item.target.id === 'past-one-day' ?
        Moment.utc().local().format('YYYY-MM-DD') :
        (item.target.id === 'past-one-week' ?
          Moment.utc().local().add(-7, 'days').format('YYYY-MM-DD') :
          Moment.utc().local().add(-30, 'days').format('YYYY-MM-DD'));
    this.props.dispatch(updateFiltersDate({
      fromDate: from,
      toDate: Moment.utc().local().format('YYYY-MM-DD')
    }));
  }
}
