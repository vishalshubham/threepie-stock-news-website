import * as React from 'react';
import { LineChart, DataPoint } from '../../components/elements/graphs/LineChart';
import { Tooltip } from '../../components/elements/tooltip/Tooltip';
import { StockNews, StockData } from 'src/client/scripts/store/states/stock';
import { Dispatch } from 'redux';
import { get, isEmpty, floor, ceil } from 'lodash';
import * as moment from 'moment-timezone';
import { connect } from 'react-redux';
import { AppState } from 'src/client/scripts/store/state';

interface ChartContainerProps {
  data?: StockData;
  news?: StockNews;
  activeToggle?: string;
  dispatch?: Dispatch<any>;
}

const mapStateToProps = (state: AppState) => {
  return {
    data: get(state.stockInfoState, ['result', 'data']),
    news: get(state.stockInfoState, ['result', 'news']),
    activeToggle: get(state.usageState, ['activeToggle'])
  }
}

@connect(mapStateToProps)
export default class ChartContainer extends React.Component<ChartContainerProps, any> {

  public render(): JSX.Element {

    const data = this.getData();
    const stockData = [{ data }];

    const axisX = this.getAxisX();
    const axisY = this.getAxisY();
    const showChart = !isEmpty(data);

    // Null check for line chart
    if(isEmpty(data)) {
      return null;
    }

    return (
      <div className="chart-container">
        <LineChart
          data = {stockData}
          axisX = {axisX}
          axisY = {axisY}
          showAxisX={true}
          showGrid={true}
          toggle={this.props.activeToggle}
        />
      </div>
    );
  }

  public getData() {
    let x = 0;
    let y = 0;

    let i = 2;
    const dataPoints:DataPoint[] = [];

    if (isEmpty(this.props.data) || isEmpty(this.props.data.values)) {
      return null;
    }

    while (
      !isEmpty(this.props.data) &&
      !isEmpty(this.props.data.values) &&
      x < this.props.data.values.length &&
      y < this.props.news.articles.length) {

      const stockTime = this.props.data.values[x].time;
      const newsTime = this.props.news.articles[y].publishedAt;
      if (stockTime < newsTime) {
        const value = this.props.data.values[x++];
        dataPoints.push(
          {
            type: 'stock',
            x: ++i,
            y: value.close,
            tooltip: {
              title: value.close.toString(),
              label: value.time.toString()
            }
          }
        );
      } else if (stockTime >= newsTime) {
        const value = this.props.news.articles[y++];
        dataPoints.push(
          {
            type: 'news',
            x: 2,
            y: value.computedStockValue,
            tooltip: {
              title: !isEmpty(value) && !isEmpty(value.title) ? value.title.toString() : '',
              label: !isEmpty(value) && !isEmpty(value.publishedAt) ? value.publishedAt.toString() : '',
              url: !isEmpty(value) && !isEmpty(value.url) ? value.url.toString() : '',
              urlToImage: !isEmpty(value) && !isEmpty(value.urlToImage) ? value.urlToImage.toString() : ''
            }
          }
        );       
      }
    }

    while (
      !isEmpty(this.props.data) &&
      x < this.props.data.values.length) {
      const value = this.props.data.values[x++];
      dataPoints.push(
        {
          type: 'stock',
          x: ++i,
          y: value.close,
          tooltip: {
            title: value.close.toString(),
            label: value.time.toString()
          }
        }
      );
    }

    while (
      !isEmpty(this.props.data.values) &&
      y < this.props.news.articles.length) {
      const value = this.props.news.articles[y++];
      dataPoints.push(
        {
          type: 'news',
          x: 2,
          y: value.computedStockValue,
          tooltip: {
            title: !isEmpty(value) && !isEmpty(value.title) ? value.title.toString() : '',
            label: !isEmpty(value) && !isEmpty(value.publishedAt) ? value.publishedAt.toString() : '',
            url: !isEmpty(value) && !isEmpty(value.url) ? value.url.toString() : '',
            urlToImage: !isEmpty(value) && !isEmpty(value.urlToImage) ? value.urlToImage.toString() : ''
          }
        }
      );
    }

    let left = -1;
    const leftArr:number[] = new Array(dataPoints.length);  
    for (let j = 0; j < dataPoints.length; j++) {
      if (dataPoints[j].type === 'news') {
        leftArr[j] = left;
      } else {
        leftArr[j] = j;
        left = j;
      }
    }

    let right = -2;
    const rightArr:number[] = new Array(dataPoints.length);  
    for (let j = dataPoints.length-1; j >= 0; j--) {
      if (dataPoints[j].type === 'news') {
        rightArr[j] = right;
      } else {
        rightArr[j] = j;
        right = j;
      }
    }

    let current = 0;
    while (current < dataPoints.length) {
      if (dataPoints[current].type === 'news') {
        if (leftArr[current] === -1) {
          dataPoints[current].x = 2;
        } else if (rightArr[current] === -2) {
          dataPoints[current].x = dataPoints[leftArr[current]].x + 1;
        } else {
          dataPoints[current].x =
            this.getX(dataPoints[current], dataPoints[leftArr[current]], dataPoints[rightArr[current]]);
        }
      }
      current++;
    }

    return dataPoints;
  }

  public getX = (dataPoint, dataPoint1, dataPoint2) => {

    if (dataPoint1.y === dataPoint2.y) {
      return (dataPoint1.x + dataPoint2.x)/2;
    }
    const yNumerator = dataPoint2.y - dataPoint1.y;
    const yDenominator = dataPoint2.y - dataPoint.y;
    const yFraction = yNumerator/yDenominator;
    const xNumerator = dataPoint2.x - dataPoint1.x;
    const tt = xNumerator/yFraction;
    return dataPoint2.x - tt;
  }

  public getAxisX() {
    let i = 1;
    const result = [];
    result.push({
      label: 'Before',
      value: ++i
    });
    if (!isEmpty(this.props.data) && !isEmpty(this.props.data.values)) {
      this.props.data.values.map(function(value) {
        // ISO_8601 standard YYYY-MM-ddTHH:mm:ssZ'
        const utcDate = moment(value.time.toString(), moment.ISO_8601).utc();
        // utcDate.tz('America/Toronto').format('HH:mm')
        const date = utcDate.local().format('hh:mm');
        result.push( {
          label: date,
          value: ++i
        });
      })
    };
    result.push({
      label: 'After',
      value: ++i
    });
    return result;
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
