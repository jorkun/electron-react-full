/*
 * @Author: Zhao Kunkun
 * @Date: 2019-03-07 15:52:52
 * @Last Modified by: Zhao kunkun
 * @Last Modified time: 2019-03-16 16:12:23
 */
import React, { Component } from "react";
import JRRichEditor from "./index";
class JRRichEditorDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initialValue: "",
            value: null
        }
    }
    componentDidMount() {
        setTimeout(() => {
            this.setValue();
        }, 5000);
    }
    setValue = () => {
        this.setState({ initialValue: "xxxxx" })
    }
    onChange = (value) => {
        this.setState({ value })
    }
    render() {
        return (<div>
            <h3>示例：</h3>
            <JRRichEditor
                onChange={this.onChange}
                value={this.state.initialValue}
            />
        </div>);
    }
}

export default JRRichEditorDemo;