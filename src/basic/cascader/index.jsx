/*
 * @Author: Zhao Kunkun
 * @Date: 2019-03-07 14:42:27
 * @Last Modified by: Zhao Kunkun
 * @Last Modified time: 2019-04-13 14:34:14
 */
import React from "react";
import {Cascader } from "antd";

export default class JRCascader extends React.Component {
    render() {
        return <Cascader {...this.props} className={"jupiter-cascader " + (this.props.className || "")} />
    }
}
