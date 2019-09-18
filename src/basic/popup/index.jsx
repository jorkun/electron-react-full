/*
 * @Author: Zhao Kunkun
 * @Date: 2019-03-07 14:42:27
 * @Last Modified by: Zhao kunkun
 * @Last Modified time: 2019-03-20 15:43:17
 */
import React from "react";
import { Popover } from "antd";
export default class JRPopup extends React.Component {
    state = {}
    render() {
        return (<Popover className="jupiter-popup" {...this.props}>{this.props.children}</Popover>)
    }
}