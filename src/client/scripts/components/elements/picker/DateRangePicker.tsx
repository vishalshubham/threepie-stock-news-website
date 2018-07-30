import * as React from 'react';
import { isEmpty } from 'lodash';
import { Dispatch } from 'redux';
import * as Moment from 'moment';
import { connect } from 'react-redux';
import { VoidCallback, TimePeriod } from 'src/client/scripts/data_models/general';
import { Popover, Button, Divider } from 'antd';
import 'src/build/client/scripts/components/elements/picker/styles/DateRangePicker.css';
import { AppState } from 'src/client/scripts/store/state';
import classNames from 'src/client/scripts/utils/classNames';

interface DateRangePickerProps {
  activeDateRangeId?: string;
  validPeriods?: TimePeriod[];
  onClick: VoidCallback<null>;
  dispatch: any;
}

const mapStateToProps = (state: AppState) => {
  return {
    activeDateRangeId: state.usageState.activeDateRangeId,
    validPeriods: state.usageState.validPeriods
  }
}

@connect(mapStateToProps)
class DateRangePicker extends React.Component<DateRangePickerProps, any> {

  public render(): JSX.Element {
    const activeDateRangeId = this.props.activeDateRangeId;

    const dateRangePickerOptions = [{
      key: 'DAY',
      title: 'Past 1 day'
    },{
      key: 'TWO_DAYS',
      title: 'Past 2 days'
    },{
      key: 'THREE_DAYS',
      title: 'Past 3 days'
    },{
      key: 'WEEK',
      title: 'Past week'
    },{
      key: 'MONTH',
      title: 'Past month'
    }];

    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };

    const content = this.props.validPeriods.map(item => (
      <div>
        <div id={item.code}
          className={classNames(
            'date-range-picker-option',
            {'activeDateRangeId' : item.code === activeDateRangeId}
          )}
          onClick={this.props.onClick}>

          <p id={item.code} className="date-range-picker-option-title">{item.description}</p>
          <p id={item.code} className="date-range-picker-option-sub-title">{
            Moment(item.startDateTime, Moment.ISO_8601).utc().local().format('MMM DD, YYYY') + ' - ' +
            Moment(item.endDateTime, Moment.ISO_8601).utc().local().format('MMM DD, YYYY')
          }</p>  
        </div>
        {item.code !== 'MONTH' && <Divider className="date-range-picker-option-divider"/>}
      </div>
    ));

    const displayText = isEmpty(this.props.activeDateRangeId)
                          ? 'Choose Time Range'
                          : (
                            this.props.activeDateRangeId === this.props.validPeriods[0].code
                              ? this.props.validPeriods[0].description
                              : (
                                this.props.activeDateRangeId === this.props.validPeriods[1].code
                                ? this.props.validPeriods[1].description
                                : (
                                  this.props.activeDateRangeId === this.props.validPeriods[2].code
                                  ? this.props.validPeriods[2].description
                                  : (
                                    this.props.activeDateRangeId === this.props.validPeriods[3].code
                                    ? this.props.validPeriods[3].description
                                    : this.props.validPeriods[4].description
                                  )
                                )
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
