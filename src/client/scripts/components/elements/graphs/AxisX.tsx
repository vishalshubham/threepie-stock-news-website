import * as React from 'react';
import {scaleLinear} from 'd3';
import { map, get, minBy, maxBy } from 'lodash';

import './styles/AxisX.css';
import { KVMap } from 'src/client/scripts/data_models/general';

interface AxisXProps {
  ticks: Array<KVMap<number | string>>;
  range: KVMap<number[]>;
  chartSize: { width: number, height: number };
}

const AxisX: React.StatelessComponent<any> = (props) => {

  const { ticks, range, chartSize } = props;
  const scaleX = scaleLinear()
    .domain([
      get(minBy(ticks, 'value'), 'value', 0),
      get(maxBy(ticks, 'value'), 'value', 100)
    ])
    .range(range.x);

  return (
    <g className="axis-x" transform={`translate(0 ${chartSize.height - 25})`}>
      <rect className="axis-x__background" width={chartSize.width} height="25" />
      {map(ticks, (tick, index) => {
        return (
          <g key={index} className="axis-x__indicator" transform={`translate(${scaleX(tick.value)}, 0)`}>
            <text dy="16">{tick.label}</text>
          </g>
        );
      })}
    </g>
  );
};

export default AxisX;

