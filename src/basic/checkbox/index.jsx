/*
 * @Author: Zhao Kunkun
 * @Date: 2019-03-07 14:42:27
 * @Last Modified by: Zhao kunkun
 * @Last Modified time: 2019-03-20 15:36:36
 */
import React from "react";
import { Checkbox } from "antd";

export default class JRCheckbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() {
        return <Checkbox {...this.props} className="jupiter-checkbox">{this.props.children}</Checkbox>
    }
}
