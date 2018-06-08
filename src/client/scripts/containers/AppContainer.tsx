import * as React from 'react';
import './AppContainer.css';
import logo from 'src/client/images/logo.png';
import { LineChart, LineChartProps } from '../components/elements/graphs/LineChart';
import { Tooltip } from '../components/elements/tooltip/Tooltip';
import NavBar from '../components/elements/navigation/NavBar';

const lineChart = {
  data: [{
    data: [{
      x: 2,
      y: 1606.9000,
      tooltip: <Tooltip title="Vishal Chaudhary" label="Hamsini" />
    },{
      x: 3,
      y: 1618.1000,
      tooltip: <Tooltip title="Vishal Chaudhary" label="Hamsini" />
    },{
      x: 4,
      y: 1615.0600,
      tooltip: <Tooltip title="Vishal Chaudhary" label="Hamsini" />
    },{
      x: 5,
      y: 1622.6600,
      tooltip: <Tooltip title="Vishal Chaudhary" label="Hamsini" />
    },{
      x: 6,
      y: 1624.8000,
      tooltip: <Tooltip title="Vishal Chaudhary" label="Hamsini" />
    },{
      x: 7,
      y: 1621.6700,
      tooltip: <Tooltip title="Vishal Chaudhary" label="Hamsini" />
    },{
      x: 8,
      y: 1622.0050,
      tooltip: <Tooltip title="Vishal Chaudhary" label="Hamsini" />
    },{
      x: 9,
      y: 1623.4900,
      tooltip: <Tooltip title="Vishal Chaudhary" label="Hamsini" />
    }]
  }],
  axisX: [{
    label: '9.00 am',
    value: 2
  },{
    label: '10.00 am',
    value: 3
  },{
    label: '11.00 am',
    value: 4
  },{
    label: '12.00 am',
    value: 5
  },{
    label: '01.00 pm',
    value: 6
  },{
    label: '02.00 pm',
    value: 7
  },{
    label: '03.00 pm',
    value: 8
  },{
    label: '04.00 pm',
    value: 9
  }],
  axisY: [{
    label: '$1600.00',
    value: 1600
  },{
    label: '$1610.00',
    value: 1610
  },{
    label: '$1620.00',
    value: 1620
  },{
    label: '$1630.00',
    value: 1630
  }]
};

class AppContainer extends React.Component {
  public render() {
    return (
      <div className="app-container">
        <NavBar />
        <LineChart {...lineChart} showAxisX={true} showGrid={true}/>
      </div>
    );
  }
}

export default AppContainer;
