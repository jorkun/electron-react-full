/*
 * @Author: Zhao kunkun
 * @Date: 2018-12-21 10:33:08
 * @Description: 使用示例：<FormItem label="机构">
 *                             {getFieldDecorator("orgid", {
 *                                 initialValue: "",
 *                                 getValueFromEvent: (obj) => obj.orgid // 赋值
 *                             })(
 *                                 <InputSelect
 *                                     modalType={"organ"} // 弹出的选择modal框类型
 *                                     displayKey="orgname" // 要显示的字段key值
 *                                     placeholder="机构"
 *                                     clear={true/false}// 清除文本值
 *                                 />
 *                             )}
 *                         </FormItem>
 * @Last Modified by: Zhao kunkun
 * @Last Modified time: 2019-03-15 11:52:27
 */

import React, { Component } from "react";

import { Input, Icon, Table } from "antd";
import "jrui/index.scss";

export default class JRBandbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            panelShow: false,
            displayText: props.originValue || ""
        }
        this.selectInput = null;
        this.needToogle = true;
    }
    componentDidMount() {
        document.onclick = (e) => {
            let cnList = [e.target, ...e.path];
            if (this.checkPanelZone(cnList)) {
                this.needToogle && this.setState({
                    panelShow: false
                })
            }
        }
    }
    componentWillReceiveProps(nextProps) {
        let { displayText, data } = this.state;
        let { clear = false } = nextProps;
        if (nextProps.originValue && !displayText && !Object.keys(data || {}).length) {
            this.setStateAsync({
                displayText: nextProps.originValue
            });
        }
        clear && displayText && this.clear();
    }
    componentWillUnmount() {
        this.needToogle = false;
        document.onclick = null;
    }
    checkPanelZone(arr) {
        return !arr.find(p => {
            return (p.className &&
                (p.className.toString().includes("jupiter-bandbox")));
        });
    }
    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve);
        });
    }
    openPanel() {
        if (this.props.readOnly || this.props.disabled) return;
        this.setStateAsync({
            panelShow: true
        });
    }
    clear() {
        this.setStateAsync({ displayText: null, data: {} });
        this.props.onChange && this.props.onChange({});
    }
    onSelect(record = null) {
        this.setStateAsync({
            panelShow: false
        });
        if (record) {
            let data = record || {};
            let displayText = data[this.props.displayKey];
            this.setStateAsync({ data, displayText });
            this.props.onChange && this.props.onChange(data);
        }
    }
    render() {
        let { panelShow, displayText } = this.state;
        let { readOnly = false, disabled = false, placeholder, style, type = "input", data, columns } = this.props;
        let cn = "jupiter-bandbox type-" + type;
        return (
            <span className={!readOnly && !disabled ? cn : cn + " readonly"}
                style={style}
            >
                <Input type="hidden" />
                <span className={"help-input" + (!displayText ? " placeholder" : "")}
                    onClick={this.openPanel.bind(this)}
                >{displayText || placeholder}</span>
                {displayText && !readOnly && !disabled &&
                    <Icon type="close"
                        className="input-clear input-select-arrow-icon"
                        onClick={this.clear.bind(this)}
                    />
                }
                <Icon type="down"
                    onClick={this.openPanel.bind(this)}
                    className="arrow-down input-select-arrow-icon"
                />
                <section className="jupiter-bandbox-panel"
                    style={{
                        display: panelShow ? "block" : "none"
                    }}
                >
                    <Table columns={columns}
                        className="jupiter-bandbox-table"
                        dataSource={data}
                        onRow={(record) => {
                            return {
                                onClick: this.onSelect.bind(this, record)
                            }
                        }}
                        rowKey={(r, i) => i}
                    />
                </section>
            </span>
        );
    }
}