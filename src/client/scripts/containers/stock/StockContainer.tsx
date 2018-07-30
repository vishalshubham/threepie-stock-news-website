import * as React from 'react';
import ChartContainer from 'src/client/scripts/containers/chart/ChartContainer';
import { Dispatch } from 'redux';
import * as Moment from 'moment';
import { updateFiltersStock, updateFiltersDate, updateFiltersToggle } from 'src/client/scripts/store/actions';
import DateRangePicker from 'src/client/scripts/components/elements/picker/DateRangePicker';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import 'src/build/client/scripts/containers/stock/styles/StockContainer.css';
import { StockTicker, KVMap, TimePeriod } from 'src/client/scripts/data_models/general';
import { get } from 'lodash';
import { AppState } from 'src/client/scripts/store/state';
import StockPicker from 'src/client/scripts/components/elements/picker/StockPicker';
import TogglePicker from '../../components/elements/picker/TogglePicker';

interface StockContainerProps {
  dispatch?: Dispatch<any>;
}

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
            <StockPicker
              onChange={this.handleOnStockChange}
              dispatch={this.props.dispatch}
    				/>
          </Col>
          <Col span={6}>
            <DateRangePicker
              onClick={this.handleOnDateRangeChange}
              dispatch={this.props.dispatch}
            />
          </Col>
          <Col span={12}>
            <TogglePicker
              onChange={this.handleOnToggleChange}
            />
          </Col>
        </Row>
      	<ChartContainer />
			</div>
    );
  }

  private handleOnStockChange = (item) => {
    this.props.dispatch(updateFiltersStock({
      symbol: item
    }));
  }

  private handleOnToggleChange = (item) => {
    this.props.dispatch(updateFiltersToggle({
      activeToggle: item.target.value
    }));
  }

  private handleOnDateRangeChange = (item) => {
    this.props.dispatch(updateFiltersDate({
      activeDateRangeId: item.target.id
    }));
  }
}
