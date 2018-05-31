import * as React from 'react';
import {line, scaleLinear} from 'd3';
import { KVMap } from 'src/client/scripts/data_models/general';
import { map, get, minBy, maxBy } from 'lodash';
import './styles/Grid.css';

export interface GridProps {
  ticks: Array<KVMap<number | string>>;
  range: KVMap<number[]>;
}

export const Grid: React.StatelessComponent<GridProps> = (props) => {
  const { ticks, range } = props;
  const m: any = [
    get(minBy(ticks, 'value'), 'value', 0),
    get(maxBy(ticks, 'value'), 'value', 100)
  ];
  const scale = {
    x: scaleLinear()
      .domain([0, 1])
      .range(range.x),
    y: scaleLinear()
      .domain(m)
      .range(range.y)
  };
  const path = line()
    .x(function(d: any) {
      return scale.x(d.x);
    })
    .y(function(d: any) {
      return scale.y(d.y);
    });
  const grids = map(ticks, (tick) => [
    { y: tick.value, x: 0, label: tick.label },
    { y: tick.value, x: 1, label: tick.label }
  ]);

  return (
    <g className="chart-grid">
      {map(grids, (grid: any, index) =>
        <g key={index}>
          <path className="chart-grid__line" d={path(grid)} />
          <g className="chart-grid__indicator" transform={`translate(0, ${scale.y(grid[0].y)})`}>
            <text dy="4" >{grid[0].label}</text>
          </g>
        </g>
      )}
    </g>
  );
};

export default Grid;

