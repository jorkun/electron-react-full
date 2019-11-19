/*
 * @Author: Zhao Kunkun
 * @Date: 2019-03-07 14:42:27
 * @Last Modified by: Zhao kunkun
 * @Last Modified time: 2019-03-16 14:59:51
 */
import React from "react";
import { Radio } from "antd";

export default class JRRadio extends React.Component {
    render() {
        return <Radio {...this.props} className="jupiter-radio">{this.props.children}</Radio>
    }
}