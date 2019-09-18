/*
 * @Author: Zhao Kunkun
 * @Date: 2019-03-07 15:52:52
 * @Last Modified by: Zhao kunkun
 * @Last Modified time: 2019-03-07 17:05:42
 */
import React, { Component } from "react";
import JRRatebox from "./index";
class RateBoxDemo extends Component {
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
            <label>利率标签(元)：</label><JRRatebox onChange={this.onChange} />
            <p>输入的value值：{this.state.value}</p>
        </div>);
    }
}

export default RateBoxDemo;