/*
 * @Author: Zhao Kunkun
 * @Date: 2019-03-07 14:42:27
 * @Last Modified by: Zhao Kunkun
 * @Last Modified time: 2019-08-08 15:35:59
 */

import React from "react";
import {DatePicker } from "antd";
const {MonthPicker} = DatePicker;
export default class JRMonthPicker extends React.Component {
    state = {  }
    render() {
        return <MonthPicker className="jupiter-monthpicker" {...this.props}/>
    }
}

