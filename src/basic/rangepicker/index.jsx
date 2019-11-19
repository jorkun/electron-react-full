/*
 * @Author: Zhao Kunkun
 * @Date: 2019-03-07 14:42:27
 * @Last Modified by: Zhao Kunkun
 * @Last Modified time: 2019-04-08 20:38:57
 */

import React from "react";
import {DatePicker } from "antd";
const {RangePicker} = DatePicker;
export default class JRRangePicker extends React.Component {
    state = {  }
    render() {
        return <RangePicker className="jupiter-rangepicker" {...this.props}/>
    }
}

