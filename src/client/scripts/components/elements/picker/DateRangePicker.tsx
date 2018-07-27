import * as React from 'react';
import { isEmpty } from 'lodash';
import { Dispatch } from 'redux';
import * as Moment from 'moment';
import { connect } from 'react-redux';
import { VoidCallback } from 'src/client/scripts/data_models/general';
import { Popover, Button, Divider } from 'antd';
import 'src/build/client/scripts/components/elements/picker/styles/DateRangePicker.css';
import { AppState } from 'src/client/scripts/store/state';

interface DateRangePickerProps {
  activeDateRangeId?: string;
  onClick: VoidCallback<null>;
  dispatch: any;
}

const mapStateToProps = (state: AppState) => {
  return {
    activeDateRangeId: state.usageState.activeDateRangeId
  }
}

@connect(mapStateToProps)
class DateRangePicker extends React.Component<DateRangePickerProps, any> {

  public render(): JSX.Element {

    const dateRangePickerOptions = [{
      key: 'DAY',
      title: 'Past 1 day'
    },{
      key: 'WEEK',
      title: 'Past 1 week'
    },{
      key: 'MONTH',
      title: 'Past 1 month'
    }];

    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };

    const content = dateRangePickerOptions.map(item => (
      <div id={item.key} className="date-range-picker-option" onClick={this.props.onClick}>
          <p id={item.key} className="date-range-picker-option-title">{item.title}</p>
          <p id={item.key} className="date-range-picker-option-sub-title">{
            item.key === 'DAY' ?
              Moment.utc().local().format('MMM DD, YYYY') :
              (item.key === 'WEEK' ?
                Moment.utc().local().format('MMM DD, YYYY') + ' - ' +
                  Moment.utc().local().add(-7, 'days').format('MMM DD, YYYY') :
                Moment.utc().local().format('MMM DD, YYYY') + ' - ' +
                  Moment.utc().local().add(-30, 'days').format('MMM DD, YYYY'))
          }</p>
          {item.key !== 'MONTH' && <Divider className="date-range-picker-option-divider"/>}
      </div>
    ));

    const displayText = isEmpty(this.props.activeDateRangeId) ? 'Choose Time Range' :
                          (
                            this.props.activeDateRangeId === 'DAY' ?
                              'Past 1 day' :
                              (
                                this.props.activeDateRangeId === 'WEEK' ?
                                 'Past 1 week' : 'Past 1 month'
                              )
                          );
    return (
      <div className="date-range-picker">
        <Popover placement="bottom" content={content}>
          <Button type="default">{displayText}</Button>
        </Popover>
      </div>
    );
  }
}

export default DateRangePicker;
