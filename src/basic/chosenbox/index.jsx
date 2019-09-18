/*
 * @Author: Zhao Kunkun
 * @Date: 2019-03-07 14:42:27
 * @Last Modified by: Zhao kunkun
 * @Last Modified time: 2019-03-16 15:15:15
 */
import React from "react";
import { Select } from "antd";
const Option = Select.Option;
export default class JRChosenbox extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let sProps = Object.assign({}, this.props, {
            mode: "multiple"
        });
        let { container } = this.props;
        let optionsData = this.props.data || [];
        let children = optionsData.map((o, i) => <Option key={i} value={o.value}>{o.text}</Option>);
        return (
            <Select {...sProps}
                getPopupContainer={() => (container || document.body)}
                className="jupiter-chosenbox"
            >
                {children}
            </Select>);
    }
}