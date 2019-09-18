/*
 * @Author: Zhao Kunkun
 * @Date: 2019-03-07 14:42:27
 * @Last Modified by: Zhao kunkun
 * @Last Modified time: 2019-03-26 11:24:49
 */
import React from "react";
import { Radio } from "antd";
const RadioButton = Radio.Button;
export default class JRRadioButton extends React.Component {
    render() {
        return <RadioButton {...this.props} className="jupiter-radio-button">{this.props.children}</RadioButton>
    }
}