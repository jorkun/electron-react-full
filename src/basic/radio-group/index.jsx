/*
 * @Author: Zhao Kunkun
 * @Date: 2019-03-07 14:42:27
 * @Last Modified by: Zhao kunkun
 * @Last Modified time: 2019-03-26 11:29:00
 */
import React from "react";
import { Radio } from "antd";
export default class JRRadioGroup extends React.Component {
    render() {
        let { options } = this.props;
        if (options && options.length && Object.keys(options[0]).includes("text")) {
            options.map(o => {
                o.label = o.text;
            });
        }
        return <Radio.Group {...this.props} className="jupiter-radio-group" >{this.props.children}</Radio.Group>;
    }
}