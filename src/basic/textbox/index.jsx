/*
 * @Author: Zhao Kunkun
 * @Date: 2019-03-07 14:42:27
 * @Last Modified by: Zhao Kunkun
 * @Last Modified time: 2019-04-15 12:27:12
 */
import React from "react";
import { Input } from "antd";
export default class JRTextbox extends React.Component {
    constructor(props) {
        super(props);
        this.state={}
    }
    render() {
        return <Input {...this.props} className="jupiter-textbox" />
    }
}