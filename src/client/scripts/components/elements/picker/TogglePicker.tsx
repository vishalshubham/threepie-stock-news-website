import * as React from 'react';
import { isEmpty } from 'lodash';
import { Radio } from 'antd';
import { Dispatch } from 'redux';
import { VoidCallback, StockTicker } from 'src/client/scripts/data_models/general';

interface TogglePickerProps {
  onChange: VoidCallback<null>;
}

class TogglePicker extends React.Component<TogglePickerProps, any> {

  public render(): JSX.Element {
    return (
      <div className="toggle_picker">
    		<div>
      		<Radio.Group defaultValue="both" onChange={this.props.onChange}>
      	  	<Radio.Button value="both">Both Stock & News</Radio.Button>
	  	      <Radio.Button value="stock">Only Stock</Radio.Button>
  	      	<Radio.Button value="news">Only News </Radio.Button>
	      	</Radio.Group>
    		</div>
  		</div>
    );
  }
}

export default TogglePicker;
