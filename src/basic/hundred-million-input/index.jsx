/*
 * @Author: Zhao Kunkun
 * @Date: 2019-03-07 11:40:25
 * @Last Modified by: Zhao Kunkun
 * @Last Modified time: 2019-07-09 12:08:55
 */
import React from "react";
import JRInput from "../input";
// 亿元输入控件
class JRHundredMillionInput extends React.Component {
    constructor(props) {
        super(props);
        let v = props.value && !isNaN(props.value) ? parseFloat(props.value / 100000000) : 0.0000;
        this.state = {
            initialValue: v,
            value: v
        }
    }
    componentWillReceiveProps(nextProps) {
        let {value} = nextProps;
        if(!isNaN(value) && this.state.initialValue != value) {
            this.setStateAsync({
                value: parseFloat(value / 100000000),
                initialValue: value
            });
        }
    }

    setStateAsync(state) {
        let self = this;
        return new Promise((resolve) => {
            self.setState(state, resolve);
        })
    }
    onChange = (value = 0) => {
        this.setStateAsync({
            value,
            initialValue: value
        });
        this.props.onChange && this.props.onChange(Number(isNaN(value) ? 0 : parseFloat(value || 0) * 100000000));
    }
    render() {
        const format = "#,###.0000";// 亿元输入控件格式
        let iProps = Object.assign({}, this.props, {
            align: this.props.align || "right",
            format: this.props.format || format,
            value: this.state.value,
            onChange: this.onChange,
            maxLength: 13
        })
        return (
            <JRInput
                {...iProps}
            />)
    }
}
export default JRHundredMillionInput;