import * as React from 'react';
import {line, area, curveCatmullRom, scaleLinear} from 'd3';
import { map, get, maxBy, minBy, isEmpty } from 'lodash';
import Grid from './Grid';
import AxisX from './AxisX';

import 'src/build/client/scripts/components/elements/graphs/styles/LineChart.css';
import classNames from 'src/client/scripts/utils/classNames';
import { ThresholdData } from 'src/client/scripts/data_models/general';

export interface DataPoint {
  x: number;
  y: number;
  tooltip?: JSX.Element;
}

export interface LineChartData {
  id?: string;
  className?: string;
  data: DataPoint[];
}

export interface LineChartProps {
  data: LineChartData[];
  axisX: Array<{label: string, value: number}>;
  axisY: Array<{label: string, value: number}>;
  threshold?: ThresholdData;
  showGrid?: boolean;
  showAxisX?: boolean;
}

interface LineChartState {
  tooltip: any;
}

export class LineChart extends React.Component<LineChartProps, any> {
  private svg = null;
  private circleRadius = 8;

  constructor(props: LineChartProps) {
    super(props);
    this.state = {
      tooltip: null,
      width: 100,
      height: 100,
    };
  }

  public componentDidMount() {
    const rect = this.svg.getBoundingClientRect();
    this.resizeEle(rect);
  }

  public componentWillReceiveProps() {
    const rect = this.svg.getBoundingClientRect();
    const { width, height } = this.state;
    if (get(rect, ['width']) !== width || get(rect, ['height']) !== height) {
      this.resizeEle(rect);
    }
  }

  public render(): JSX.Element {
    const { data, axisX, axisY, showGrid, showAxisX } = this.props;
    const domain = {
      x: { min: get(minBy(axisX, 'value'), 'value', 0), max: get(maxBy(axisX, 'value'), 'value', 100) },
      y: { min: get(minBy(axisY, 'value'), 'value', 0), max: get(maxBy(axisY, 'value'), 'value', 100) }
    };
    const { width, height } = this.state;
    // auto add space for grids and axis
    const padding = {
      left: showGrid ? .1 : 0,
      right: showGrid ? .1 : 0,
      top: showAxisX ? .1 : 0,
      bottom: showAxisX ? .1 : 0,
    };
    const range = {
      x: [padding.left * width, (1 - padding.right) * width],
      y: [(1 - padding.bottom) * height, padding.top * height]
    };
    const scale = this.generateScale(data, domain, range);
    const path = line()
      .x(function(d: any) {
        return scale.x(d.x);
      })
      .y(function(d: any) {
        return scale.y(d.y);
      })
      // Adds curve in the graph
      // .curve(curveCatmullRom.alpha(0.5));
    const areaa = area()
      .x(function(d: any) {
        return scale.x(d.x);
      })
      .y0(scale.y(domain.y.min))
      .y1(function(d: any) {
        return scale.y(d.y);
      })
      // Adds curve in the graph
      // .curve(curveCatmullRom.alpha(0.5));

    return (
      <div className="line-chart">
        <svg viewBox={`0 0 ${this.state.width} ${this.state.height}`} ref={this.refHandler} >
          {showGrid && <Grid ticks={axisY} range={range} />}
          {map(data, (d: any, index) =>
            <g key={index}>
              <path className={classNames('line-chart__line', d.className)} d={path(d.data)} />
              <path className={classNames('line-chart__area', d.className)} d={areaa(d.data)} />
            </g>
          )}
          {this.generateDataDots(data, scale)}
          {showAxisX && <AxisX
            ticks={axisX}
            range={range}
            chartSize={{ width, height }}
          />}
        </svg>
        {this.state.tooltip &&
          <div className="line-chart__tooltip" style={this.state.tooltip.style}>
            {this.state.tooltip.el}
          </div>
        }
      </div >
    );
  }

  private refHandler = (ref) => this.svg = ref;

  private generateScale = (data, domain, range) => ({
    x: scaleLinear()
      .domain([get(domain, ['x', 'min']), get(domain, ['x', 'max'])])
      .range(range.x),

    y: scaleLinear()
      .domain([get(domain, ['y', 'min']), get(domain, ['y', 'max'])])
      .range(range.y)
  })

  private generateDataDots = (data, scale) => {
    const threshold = this.props.threshold;
    return map(data, (d, index) => (
      <g key={index} className="line-chart__dots">
        {map(d.data, (point, i) =>
          <circle
            key={i}
            className={classNames(
                        'line-chart__dot',
                        { 'line-chart__dot--above':
                            point.y > get(threshold, ['above']),
                          'line-chart__dot--between':
                            point.y < get(threshold, ['above']) &&
                            point.y > get(threshold, ['below']),
                          'line-chart__dot--below':
                            point.y < get(threshold, ['below']) })}
            r={this.circleRadius}
            cx={scale.x(point.x)}
            cy={scale.y(point.y)}
            onMouseOver={this.showTooltip.bind(this, point.tooltip)}
            onMouseOut={this.hideTooltip}
          />
        )}
      </g>)
    );
  }

  private resizeEle = (rect) => {
    this.setState({
      width: get(rect, ['width'], 100),
      height: get(rect, ['height'], 100)
    });
  }

  private showTooltip = (el, e) => {
    const { width, height } = this.state;
    this.setState({
      tooltip: {
        el,
        style: {
          left: (e.target.getAttribute('cx') / width * 100) + '%',
          top: ((e.target.getAttribute('cy') - this.circleRadius * 5) / height * 100) + '%',
        }
      }
    });
  }

  private hideTooltip = () => {
    this.setState({
      tooltip: null
    });
  }
}

export default LineChart;

