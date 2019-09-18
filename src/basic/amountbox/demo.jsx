/*
 * @Author: Zhao Kunkun
 * @Date: 2019-03-07 15:52:52
 * @Last Modified by: Zhao kunkun
 * @Last Modified time: 2019-03-13 15:03:55
 */
import React, { Component } from "react";
import JRAmountInput from "./index";
class JRAmountInputDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null
        }
    }
    onChange = (value) => {
        this.setState({ value })
    }
    render() {
        return (<div>
            <label>金额标签(元)：</label>
            <JRAmountInput onChange={this.onChange} value={1}/>
            <p>输入的value值：{this.state.value}</p>
        </div>);
    }
}

export default JRAmountInputDemo;