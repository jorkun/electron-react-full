/*
 * @Author: Zhao kunkun
 * @Date: 2018-10-09 16:19:45
 * @Last Modified by: Zhao Kunkun
 * @Last Modified time: 2019-04-08 20:34:11
 */
import React, { Component } from "react";

import {JRModal, JRCheckboxGroup, JRCheckbox} from "jrui";

class ColumnModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            confirmLoading: false,
            selectedColumns: [],
            checkAll: false
        }
    }

    // 当父组件状态发生变化时
    componentWillReceiveProps(nextProps) {
        let { visible, columns = null } = nextProps;
        if (visible !== this.state.visible) {
            this.setState({
                visible,
                selectedColumns: columns ? columns.map(c => c.dataIndex) : []
            });

        }
    }
    checkAll(e) {
        let {all} = this.props;
        this.setState({
            checkAll: e.target.checked,
            selectedColumns: e.target.checked ? all.map(a => a.dataIndex) : []
        });
    }
    handleColumnsChange(values) {
        this.setState({
            selectedColumns: values
        });
    }

    // 确定按钮触发
    handleOk() {
        let { selectedColumns } = this.state;
        let { all } = this.props;
        let selectedArr = all.filter(c => selectedColumns.includes(c.dataIndex));
        this.handleCancel(selectedArr);
    }

    // 取消按钮触发
    handleCancel(selectedArr) {
        this.setState({
            checkAll: false,
            confirmLoading: false
        });
        this.props.closeModal(selectedArr);
    }
    // 渲染页面
    render() {
        const {
            visible,
            confirmLoading,
            selectedColumns
        } = this.state;
        let { all = [] } = this.props;
        let columnsOptions = all.map(c => ({
            label: c.title,
            value: c.dataIndex
        }));
        return (
            <JRModal
                cancelText="取消"
                className="update-modal"
                confirmLoading={confirmLoading}
                okText="确定"
                onCancel={this.handleCancel.bind(this, null)}
                onOk={this.handleOk.bind(this)}
                title="自定义列表项"
                visible={visible}
            >
                <div style={{borderBottom: "1px solid #E9E9E9", paddingBottom: 6}}>
                    <JRCheckbox
                        onChange={this.checkAll.bind(this)}
                    >全选</JRCheckbox>
                </div>
                <JRCheckboxGroup options={columnsOptions}
                    value={selectedColumns}
                    onChange={this.handleColumnsChange.bind(this)}
                />
            </JRModal>);
    }
}

export default ColumnModal;