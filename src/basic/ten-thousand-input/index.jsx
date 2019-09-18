/*
 * @Author: Zhao Kunkun
 * @Date: 2019-03-07 11:40:25
 * @Last Modified by: Zhao Kunkun
 * @Last Modified time: 2019-07-09 12:08:43
 */
import React from "react";
import JRInput from "../input";
// 万元输入控件
class JRTenThousandInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initialValue: 0.00,
            value: this.props.value && !isNaN(this.props.value) ? parseFloat(this.props.value / 10000) : 0.00
        }
    }
    componentWillReceiveProps(nextProps) {
        if (!isNaN(nextProps.value) && this.state.initialValue != nextProps.value) {
            this.setState({
                initialValue: nextProps.value || 0.00,
                value: parseFloat(nextProps.value / 10000)
            });
        }
    }
    onChange = (value = 0) => {
        this.setState({
            value
        })
        this.props.onChange &&
            this.props.onChange(Number(isNaN(value) ? 0.00 : parseFloat(value || 0) * 10000));
    }
    render() {
        const format = "#,###.00";// 万元输入控件格式
        let iProps = Object.assign({}, this.props, {
            align: this.props.align || "right",
            format: this.props.format || format,
            value: this.state.value,
            onChange: this.onChange,
            maxLength: 16
        })
        return (<JRInput {...iProps} />)
    }
}
export default JRTenThousandInput;