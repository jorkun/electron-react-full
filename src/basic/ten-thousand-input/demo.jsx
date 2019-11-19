/*
 * @Author: Zhao Kunkun
 * @Date: 2019-03-07 15:52:52
 * @Last Modified by: Zhao kunkun
 * @Last Modified time: 2019-03-15 11:55:28
 */
import React, { Component } from "react";
import JRTenThousandInput from "./index";
class JRTenThousandInputDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ""
        }
    }
    onChange = (value) => {
        this.setState({ value })
    }
    render() {
        return (<div>
            <label>万元标签(万元)：</label><JRTenThousandInput onChange={this.onChange} />
            <p>输入的value值：{this.state.value}</p>
        </div>);
    }
}

export default JRTenThousandInputDemo;