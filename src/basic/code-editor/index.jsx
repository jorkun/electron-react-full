/**
 * @Author: Zhao Kunkun
 * @Date: 2019-06-05 15:38:59
 * @Last Modified by: Zhao Kunkun
 * @Last Modified time: 2019-07-31 15:25:57
 */
import React from "react";
import JRImage from "../image";
require("codemirror/lib/codemirror.css");
require("codemirror/theme/material.css");
require("codemirror/theme/eclipse.css");
require("codemirror/theme/neat.css");
require("codemirror/mode/xml/xml.js");
require("codemirror/mode/clike/clike");//类C语言
require("codemirror/mode/javascript/javascript");
require("codemirror/mode/sql/sql");
import {Controlled as CodeMirror} from "react-codemirror2";
const FUNC_TITLE = "功能函数";
export default class JRCodeEditor extends React.Component {
    static defaultProps = {
        mode: "javascript", //语言：sql, javascript,xml,text/x-java
        value: "", // 值
        maxLength: Infinity, // 最大可输入长度
        funcList: [], // 函数列表
        theme: "eclipse" // "material"
    }
    constructor(props) {
        super(props);
        this.state = {
            mode: props.mode || "javascript", // javascript,xml,text/x-java
            value: props.value,
            theme: props.theme || "eclipse",
            collapsedKeys: []
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({value: nextProps.value})
    }
    editorId = `jrcodeeditor_${+new Date()}_${parseInt(Math.random() * 100000)}`;
    // 点击节点事件
    handleFuncClick(v, isToggle, e) {
        e.preventDefault();
        if(isToggle) {
            let {collapsedKeys} = this.state;
            if(!collapsedKeys.includes(v)) {
                collapsedKeys.push(v);
            } else {
                collapsedKeys = collapsedKeys.filter(k => k != v);
            }
            this.setState({collapsedKeys});
        } else {
            let {value} = this.state;
            let {maxLength = Infinity} = this.props;
            let newValue = (value ? (value + "\n" + v) : v).substring(0, maxLength);
            this.setState({value: newValue}, ()=>{
                this.props.onChange && this.props.onChange(newValue)
            });
            let scrollEl = document.querySelector(`#${this.editorId} .CodeMirror-scroll`);
            let scrollEl2 = document.querySelector(`#${this.editorId} .CodeMirror-vscrollbar`);
            if(scrollEl) scrollEl.scrollTo(0, scrollEl.scrollHeight);
            if(scrollEl2) scrollEl2.scrollTo(0, scrollEl2.scrollHeight);
        }
    }
    gernarateFunc(funcList) {
        let {collapsedKeys} = this.state;
        return funcList.map((f, i) => {
            let hasChildren = f.children && f.children.length;
            let collapsed = collapsedKeys.includes(f.value);
            return (
                <li key={i} title={f.text}>
                    <span className={hasChildren ? ("p-li " + (collapsed ? "collapse" : "expand")) : ""} onClick={this.handleFuncClick.bind(this, f.value, hasChildren)}>
                        <JRImage source="font" type={!hasChildren ? "code" : (collapsed ? "plus" : "minus")} />
                        {f.text}
                    </span>
                    {hasChildren ? <ul>{this.gernarateFunc(f.children)}</ul> : ""}
                </li>);
    });
    }
    render() {
        let {maxLength = Infinity, funcList, disabled=false} = this.props;
        return (
            <div className={"jupiter-code-editor editor-theme-" + this.state.theme + " " + (this.props.className || "")}
                id={this.editorId}
                style={Object.assign({}, this.props.style || {})}
            >
                {funcList && funcList.length ? (<div className="jupiter-func">
                    <h3 className="jupiter-func-title">{FUNC_TITLE}</h3>
                    <ul className="jupiter-func-list">
                        {this.gernarateFunc(funcList)}
                    </ul></div>) : ""}
                <div className="jupiter-editor">
                    {/* <h3 className="jupiter-editor-title">请输入脚本</h3> */}
                    <CodeMirror
                        value={this.state.value}
                        className="jupiter-editor-content"
                        options={{
                            mode: this.state.mode,
                            theme: this.state.theme,
                            lineNumbers: true,
                            indentUnit: 4,
                            lineWrapping: true
                        }}
                        readOnly={disabled}
                        onBeforeChange={(editor, data, value) => {
                            this.setState({value: value.substring(0, maxLength)});
                        }}
                        onChange={(editor, data, value) => {
                            this.setState({value: value.substring(0, maxLength)});
                            this.props.onChange && this.props.onChange(value)
                        }}
                    />
                </div>
            </div>
        );
    }
}
