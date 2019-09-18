/*
 * @Author: Zhao Kunkun
 * @Date: 2019-03-07 14:42:27
 * @Last Modified by: Zhao kunkun
 * @Last Modified time: 2019-03-16 14:56:01
 */
import React from "react";
import { InputNumber } from "antd";

export default class JRInputNumber extends React.Component {
    render() {
        return <InputNumber {...this.props} className="jupiter-input-number" />
    }
}