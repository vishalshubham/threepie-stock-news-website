import * as React from 'react';
import 'src/build/client/scripts/containers/styles/AppContainer.css';
import logo from 'src/client/images/logo.png';
import { LineChart, LineChartProps } from '../../components/elements/graphs/LineChart';
import { Tooltip } from '../../components/elements/tooltip/Tooltip';
import HeaderBar from '../../components/elements/navigation/HeaderBar';
import { StockInfoState, StockNews, StockData } from 'src/client/scripts/store/states/stock';
import { Dispatch } from 'redux';
import { appStart } from 'src/client/scripts/store/actions';
import { connect } from 'react-redux';
import { AppState } from '../../store/state';
import { get, isEmpty, floor, ceil } from 'lodash';
import * as moment from 'moment';
import NavTabs from '../../components/elements/navigation/NavTabs';
import MainContainer from 'src/client/scripts/containers/MainContainer';

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
    return (
      <div className="app-container">
        <HeaderBar />
        <MainContainer />
      </div>
    );
  }
}
