import { TimePicker } from 'antd';
import React from 'react';
import moment from 'moment';


const Time = (props) => {


  return (
    <TimePicker
    format="HH:mm"
    showNow={false}
    name={props.name}
    defaultValue={moment(props.value, 'HH:mm')}
    minuteStep={30}
    onSelect={props.onSelect} />

  )
};

export default Time;