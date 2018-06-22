import * as React from 'react';
import './AppContainer.css';
import logo from 'src/client/images/logo.png';
import { LineChart, LineChartProps } from '../components/elements/graphs/LineChart';
import { Tooltip } from '../components/elements/tooltip/Tooltip';
import NavBar from '../components/elements/navigation/NavBar';
import { StockInfoState, StockNews, StockData } from 'src/client/scripts/store/states/stock';
import { Dispatch } from 'redux';
import { appStart } from 'src/client/scripts/store/actions';
import { connect } from 'react-redux';
import { AppState } from '../store/state';
import { get, isEmpty, floor, ceil } from 'lodash';
import * as moment from 'moment';

interface AppContainerProps {
  data?: StockData;
  news?: StockNews;
  dispatch?: Dispatch<any>;
}

const mapStateToProps = (state: AppState) => {
  return {
    data: get(state.stockInfoState, ['result', 'data']),
    news: get(state.stockInfoState, ['result', 'news'])
  }
}

@connect(mapStateToProps)
export default class AppContainer extends React.Component<AppContainerProps, any> {

  public componentDidMount() {
    this.props.dispatch(appStart());
  }

  public render(): JSX.Element {

    const data = this.getData();
    const stockData = [{ data }];

    const axisX = this.getAxisX();
    const axisY = this.getAxisY();

    if (!isEmpty(data)) {
      return (
        (<div className="app-container">
          <NavBar />
          <LineChart
            data = {stockData}
            axisX = {axisX}
            axisY = {axisY}
            showAxisX={true}
            showGrid={true}
          />
        </div>)
      );
    } else {
      return null;
    }
  }

  public getData() {
    let i = 1;
    return !isEmpty(this.props.data) && !isEmpty(this.props.data.values) ?
      this.props.data.values.map(function(value) {
        const displayValue = value.open;
        return {
            x: ++i,
            y: displayValue,
            tooltip: <Tooltip title={value.open.toString()} label={value.time.toString()} />
        };
      }) : null;
  }

  public getAxisX() {
    let i = 1;
    return !isEmpty(this.props.data) && !isEmpty(this.props.data.values) ?
    this.props.data.values.map(function(value) {
      // ISO_8601 standard yyyy-MM-ddTHH:mm:ssZ'
      const date = moment(value.time.toString(), moment.ISO_8601).utc().format('HH:mm');
      return {
          label: date,
          value: ++i
      };
    }) : null;
  }

  public getAxisY() {
    if (!isEmpty(this.props.data) && !isEmpty(this.props.data.values)) {
      let i = 0;
      let currentHigh = -1;
      let currentLow = -1;
      for(i=0; i<this.props.data.values.length; i++) {
        const displayValue = this.props.data.values[i].open;
        if(currentHigh === -1) {
          currentHigh = displayValue;
          currentLow = displayValue;
        } else {
          currentHigh = currentHigh < displayValue ? displayValue : currentHigh;
          currentLow = currentLow > displayValue ? displayValue : currentLow;
        }
      }

      // TODO: Better calculation of upper and lower limits for the chart
      currentHigh = floor(currentHigh + (currentHigh * 0.01));
      currentLow = ceil(currentLow - (currentLow * 0.01));
      const center = floor((currentHigh + currentLow) / 2);
      return [{
        label: currentLow.toString(),
        value: currentLow
      },{
        label: center.toString(),
        value: center
      },{
        label: currentHigh.toString(),
        value: currentHigh
      }];
    } else {
      return [{
        label: '10',
        value: 10
      },{
        label: '0',
        value: 0
      }];
    }
  }
}
