/*
 * @Author: Zhao Kunkun
 * @Date: 2019-03-07 14:42:27
 * @Last Modified by: Zhao kunkun
 * @Last Modified time: 2019-03-21 17:32:58
 */
import React from "react";
import { Checkbox } from "antd";
export default class JRCheckboxGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        let { options } = this.props;
        if (options && options.length && Object.keys(options[0]).includes("text")) {
            options.map(o => {
                o.label = o.text;
            });
        }
        return <Checkbox.Group {...this.props} className="jupiter-checkbox-group" />
    }
}