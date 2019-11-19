/*
 * @Author: Zhao Kunkun
 * @Date: 2019-03-07 14:42:27
 * @Last Modified by: mikey.zhaopengeng
 * @Last Modified time: 2019-09-10 16:47:18
 */
import React from "react";
import { Select } from "antd";
const Option = Select.Option;
export default class JRCombobox extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let sProps = Object.assign({}, this.props, {
            mode: ""
        });
        let { emptyText, container } = this.props;
        let optionsData = this.props.data || [];
        let children = optionsData.map((o, i) => (
            <Option key={i}
                value={o.value}
                disabled={o.disabled}
            >{o.text}</Option>));
        return (
            <Select {...sProps}
                optionFilterProp="children"
                getPopupContainer={() => (container || document.getElementById("root"))}
                className="jupiter-combobox"
            >
                {emptyText && <Option value="">{emptyText}</Option>}
                {children}
            </Select>);
    }
}
