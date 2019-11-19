/*
 * @Author: Zhao Kunkun
 * @Date: 2019-03-07 15:52:52
 * @Last Modified by: Zhao kunkun
 * @Last Modified time: 2019-03-15 11:43:41
 */
import React, { Component } from "react";
import JRHundredMillonInput from "./index";
class JRHundredMillonInputDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        }
    }
    onChange = (value) => {
        this.setState({ value })
    }
    render() {
        return (<div>
            <label>亿元标签(亿元)：</label><JRHundredMillonInput value={this.state.value} onChange={this.onChange} />
            <p>输入的value值：{this.state.value}</p>
        </div>);
    }
}

export default JRHundredMillonInputDemo;