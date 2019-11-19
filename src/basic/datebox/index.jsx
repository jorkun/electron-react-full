/*
 * @Author: Zhao Kunkun
 * @Date: 2019-03-07 14:42:27
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-09-02 16:28:50
 */
import React from "react"
import { DatePicker } from "antd"

export default class JRDatebox extends React.Component {
    state = {}
    render() {
        return <DatePicker {...this.props} className="jupiter-datebox" />
    }
}
JRDatebox.RangePicker = DatePicker.RangePicker
