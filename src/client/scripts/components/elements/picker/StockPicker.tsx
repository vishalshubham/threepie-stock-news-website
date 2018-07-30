import * as React from 'react';
import { isEmpty } from 'lodash';
import { Select } from 'antd';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { VoidCallback, StockTicker } from 'src/client/scripts/data_models/general';
import 'src/build/client/scripts/components/elements/picker/styles/StockPicker.css';
import { AppState } from 'src/client/scripts/store/state';
const Option = Select.Option;

interface StockPickerProps {
  data?: StockTicker[];
  onChange: VoidCallback<null>;
  dispatch: any;
}

const mapStateToProps = (state: AppState) => {
  return {
    data: state.usageState.validStocks,
    validPeriods: state.usageState.validPeriods
  }
}

@connect(mapStateToProps)
class StockPicker extends React.Component<StockPickerProps, any> {

  public render(): JSX.Element {

    if (isEmpty(this.props.data)) {
      return null;
    }

    return (
      <div className="stock_picker">
        <Select
          showSearch={true}
          placeholder="Choose a stock"
          onChange={this.props.onChange}
        >
          {
            this.props.data.map(item => (
              <Option value={item.symbol}>{item.symbol} - {item.name}</Option>
            ))
          }
        </Select>
      </div>
    );
  }
}

export default StockPicker;
