/*
 * @Author: Zhao Kunkun
 * @Date: 2019-03-07 15:52:52
 * @Last Modified by: Zhao Kunkun
 * @Last Modified time: 2019-07-23 17:33:09
 */
import React, {Component} from "react";
import JRCodeEditor from "./index";
class JRCodeEditorDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initialValue: "",
            value: null
        }
    }
    onChange = (value) => {
        console.log(value);
        this.setState({value})
    }
    render() {
        return (<div>
            <h3>示例：</h3>
            <JRCodeEditor
                funcList={[{
                    text: "常用函数",
                    value: "common",
                    children: [{
                    text: "设置默认值",
                        value: "FormDataValidationUtils.setInitialValue('', '');"
                }, {
                    text: "设置置灰",
                            value: "FormDataValidationUtils.setDisabled('');"
                }, {
                    text: "取消置灰",
                            value: "FormDataValidationUtils.cancelDisabled('');"
                }, {
                    text: "设置隐藏",
                            value: "FormDataValidationUtils.setHidden('');"
                }, {
                    text: "取消隐藏",
                            value: "FormDataValidationUtils.cancelHidden('');"
                }, {
                    text: "设置必填",
                            value: "FormDataValidationUtils.setRequired('');"
                }, {
                    text: "获取请求参数值",
                        value: "def params = FormDataValidationUtils.getParam('');"
                }]
                }]}
                value={this.state.value}
                maxLength={4000}
                onChange={this.onChange}
            />
        </div>);
    }
}

export default JRCodeEditorDemo;