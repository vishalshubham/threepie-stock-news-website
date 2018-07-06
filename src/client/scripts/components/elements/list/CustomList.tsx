import * as React from 'react';
import { isEmpty } from 'lodash';
import { Select } from 'antd';
import { Dispatch } from 'redux';
import { VoidCallback, StockTicker } from 'src/client/scripts/data_models/general';
import 'src/build/client/scripts/components/elements/list/styles/CustomList.css';
const Option = Select.Option;

interface CustomListProps {
  data : StockTicker[];
  onChange: VoidCallback<null>;
  dispatch: any;
}

class CustomList extends React.Component<CustomListProps, any> {

  public render(): JSX.Element {

    if (isEmpty(this.props.data)) {
      return null;
    }

    return (
      <div className="custom-list">
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

export default CustomList;
