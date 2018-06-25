import * as React from 'react';
import { isEmpty } from 'lodash';
import { Dispatch } from 'redux';
import * as Moment from 'moment';
import { VoidCallback } from 'src/client/scripts/data_models/general';
import { Popover, Button, Divider } from 'antd';
import 'src/build/client/scripts/components/elements/picker/styles/CustomDateRangePicker.css';

interface CustomDateRangePickerProps {
  onClick: VoidCallback<null>;
  dispatch: any;
}

class CustomDateRangePicker extends React.Component<CustomDateRangePickerProps, any> {

  public render(): JSX.Element {

    const dateRangePickerOptions = [{
      key: 'past-one-day',
      title: 'Past 1 day'
    },{
      key: 'past-one-week',
      title: 'Past 1 week'
    },{
      key: 'past-one-month',
      title: 'Past 1 month'
    }];

    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };

    const content = dateRangePickerOptions.map(item => (
      <div id={item.key} className="custom-date-range-picker-option" onClick={this.props.onClick}>
          <p id={item.key} className="custom-date-range-picker-option-title">{item.title}</p>
          <p id={item.key} className="custom-date-range-picker-option-sub-title">{
            item.key === 'past-one-day' ?
              Moment.utc().local().format('MMM DD, YYYY') :
              (item.key === 'past-one-week' ?
                Moment.utc().local().format('MMM DD, YYYY') + ' - ' +
                  Moment.utc().local().add(-7, 'days').format('MMM DD, YYYY') :
                Moment.utc().local().format('MMM DD, YYYY') + ' - ' +
                  Moment.utc().local().add(-30, 'days').format('MMM DD, YYYY'))
          }</p>
          {item.key !== 'past-one-month' && <Divider className="custom-date-range-picker-option-divider"/>}
      </div>
    ));

    return (
      <div className="custom-date-range-picker">
        <Popover placement="bottom" content={content}>
          <Button type="default">Choose Time Range</Button>
        </Popover>
      </div>
    );
  }
}

export default CustomDateRangePicker;
