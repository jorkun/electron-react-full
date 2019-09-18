/*
 * @Author: Zhao Kunkun
 * @Date: 2019-04-08 15:19:03
 * @Last Modified by: Zhao Kunkun
 * @Last Modified time: 2019-08-13 11:20:36
 */
import React, { Component } from "react";
import "jrui/index.scss";

import { Form } from "antd";
import * as JRUI from "jrui";
import CONSTANTS from "./constants";
import COMMON_CONSTANTS from "utils/constants";
import {FormatDate} from "utils/common";
const DATE_FORMAT = "yyyy-MM-dd";
const FormItem = Form.Item;
class DecoratedTableForm extends Component {
    static defaultProps = {
        config: {
            hasFlow: false,
            defaultParams: {},
            noMaintain: false,// 有无维护功能
            processModalSize: "large",
            tableName: "",// 自定义列的表名
            tableHeaders: {},// {add: true,import:url,export:url,template:url}
            rowKey: () => {},
            forbidText: {},
            moduleId: "",// 有流程时必须传入
            searchKey: "searchList",
            customColumns: [],
            columns: [],
            superSearchList: [],// //高级搜索条件配置{type: "text",name: "text",label: "标签名"}
            actions: {
                save: () => { },
                page: () => { },
                delete: () => { },
                forbid: () => { }
            }
        }
    };
    constructor(props) {
        super(props);
        let moduleId = props.config.moduleId || "";
        let tableName = props.config.tableName || "";
        this.columnsSessionKey = moduleId + tableName;
        this.expandedDataKey = props.config.expandedDataKey || "children";
        this.expandedColumns= props.config.expandedColumns || [],//内层的嵌套的colmns
        this.state = {
            hasFlow: props.config.hasFlow || false,
            listData: [],
            params: {},
            tableName,
            moduleId,
            noMaintain: props.config.noMaintain || false,
            processModalSize: props.config.processModalSize || {},
            forbidText: props.config.forbidText || {},
            tableHeaders: props.config.tableHeaders || {},
            searchKey: props.config.searchKey || "",
            columns: props.config.columns,
            defaultParams: props.config.defaultParams || {},
            superSearchList: props.config.superSearchList || [],
            formCfg: props.config.form || [],
            actions: props.config.actions || {},
            showAllSearch: false,
            showAllFields: false,
            isShowColumnModal: false,
            isShowUpdateModal: false,
            itemData: null,
            isShowFlowViewModal: false,
            isShowProcessModal: false,
            tmEffectflag: "",
            exportParams: "",
            opType: "1",
            sort: "",
            refresh: false,
            direction: "desc",
            filteredInfo: null,
            loading: false,
            pagination: {
                current: 1,
                pageSizeOptions: ["10", "20", "30", "40", "50"],
                pageSize: 10,
                showTotal: total => (`共有 ${total} 条，每页显示：${this.state.pagination.pageSize}条`),
                total: 0,
                showSizeChanger: true
            }
        }
        this.currComp = null;
        this.setCurrComp = el => (this.currComp = el);
    }
    // 页面渲染完成时
    componentDidMount() {
        this.getListData();
        Form.refreshList = () => {
            this.getListData();
        }
    }
    componentWillReceiveProps(nextProps) {
        let { refresh, config:{defaultParams} } = nextProps;
        if(defaultParams != this.state.defaultParams) {
            this.setState({
                defaultParams
            });
        }
        if (refresh != this.state.refresh) {
            this.setState({
                refresh
            }, () => {
                refresh && this.getListData();
            });
        }
    }
    // 获取表格数据
    async getListData() {
        this.setState({
            loading: true,
            listData: []
        });
        let { pagination, moduleId, defaultParams = {},
            opType = "1", tmEffectflag, hasFlow,
            filteredInfo, sort, direction, searchKey, actions } = this.state;
        let params = hasFlow ? {tmEffectflag} : {};
        filteredInfo = filteredInfo || {};
        let filteredParams = {};
        for(let key in filteredInfo) {
            if(filteredInfo[key] && filteredInfo[key].length) {
                filteredParams[key] = filteredInfo[key].join(",");
            }
        }
        let formValues = this.props.form.getFieldsValue();
        let rangeFields = {};
        for (let n in formValues) {
            if(n.includes(",")) {// 时间区间name会包含逗号
                rangeFields[n.split(",")[0]] = formValues[n][0];
                rangeFields[n.split(",")[1]] = formValues[n][1];
                delete formValues[n];
            }
        }
        params = Object.assign({}, params, formValues, rangeFields);
        if (defaultParams) {
            let nd = {};
            for(let key in defaultParams) {
                if(key.includes(",") && Array.isArray(defaultParams[key]) && defaultParams[key].length) {
                    let arr = key.split(",");
                    nd[arr[0]] = defaultParams[key][0];
                    nd[arr[1]] = defaultParams[key][1];
                } else {
                    nd[key] = defaultParams[key];
                }
            }
            params = Object.assign({}, nd, params);
        }

        params = moduleId ? Object.assign({}, params, {ownedModuleid: moduleId}, filteredParams) : Object.assign({}, params, filteredParams);
        let resultObj = await actions.page({
            [searchKey]: params,
            opType: hasFlow ? opType: null,
            page: {
                pageNo: pagination.current,
                pageSize: pagination.pageSize,
                sort,
                direction
            }
        });
        pagination.total = resultObj.total;
        this.setState({
            loading: false,
            listData: resultObj.list || [],
            pagination,
            exportParams: this.getExportParams(Object.assign({}, params, {opType})),
            refresh: false
        }, () => {
            this.props.refreshOver && this.props.refreshOver();
        });
    }
    getExportParams(params) {
        let urlP = "";
        let keys = Object.keys(params);
        if (keys && keys.length) {
            urlP = "?" + (keys.map((key) => {
                if(params[key])
                    return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
                else return;
            }).filter(Boolean).join("&"));
        }
        return urlP;
    }
    handleTypeChange(opType) {
        let {tmEffectflag} = this.state;
        this.setState({opType, tmEffectflag: opType === "1" ? "" : tmEffectflag }, ()=>{
            this.getListData();
        });
    }
    handleEffectChange(tmEffectflag) {
        this.setState({
            tmEffectflag
        }, () => {
            this.getListData();
        });
    }
    switchItem(item) {
        const type = item.type;
        switch (type) {
            case "text": // 输入框
                return <JRUI.JRTextbox autoComplete="off" placeholder={item.label} />;
            case "date": // 日期选择
                return <JRUI.JRDatebox />;
            case "rangeDate": // 区间选择
                return <JRUI.JRRangePicker />;
            case "treeSelect": // 树选择
                return (
                <JRUI.JRTreeSelect treeDefaultExpandAll={true}
                    treeDataSimpleMode={true}
                    placeholder="请选择"
                    treeData={Array.isArray(item.options) ? item.options : []}
                />);
            case "select": // 下拉框
                return (
                    <JRUI.JRCombobox
                        emptyText="请选择"
                        container={this.currComp}
                        data={Array.isArray(item.options) ? item.options : []}
                    />

                )
            case "selectS": // 可搜索下拉框
                return (
                    <JRUI.JRCombobox
                        placeholder="请选择"
                        container={this.currComp}
                        showSearch
                        allowClear
                        data={Array.isArray(item.options) ? item.options : []}
                    />

                )
            default:
                return <JRUI.JRTextbox autoComplete="off" placeholder={item.label} />;
        }
    }
    resetInputGroups={}
    gernerateFormItem() {
        let { superSearchList } = this.state;
        const { getFieldDecorator } = this.props.form;
        return superSearchList.map((s, i) => {
            if(s.type === "inputGroup") {
                let UIComp = JRUI[s.uiName] || JRUI.JRTextbox;
                this.resetInputGroups[s.name[0]] = "";
                this.resetInputGroups[s.name[1]] = "";
                return (
                <FormItem key={i}
                    label={s.label}
                    style={s.style || {}}
                >
                    <JRUI.JRInputGroup>
                        {getFieldDecorator(`${s.name[0]}`)(
                            <UIComp style={{width: "45%"}}/>
                        )}
                        <JRUI.JRTextbox
                            style={{
                                width: "10%",
                                borderLeft: 0,
                                padding: "0",
                                textAlign: "center",
                                border: "none",
                                pointerEvents: "none",
                                backgroundColor: "#fff"
                            }}
                            placeholder="~"
                            disabled
                        />
                        {getFieldDecorator(`${s.name[1]}`)(
                            <UIComp style={{width: "45%"}}/>
                        )}
                    </JRUI.JRInputGroup>
                </FormItem>);
            }
            return (
                <FormItem key={i}
                    label={s.label}
                    style={s.style || {}}
                >
                    {getFieldDecorator(`${s.name}`, {
                        initialValue: this.getSuperInitialValue(s)
                    })(
                        this.switchItem(s)
                    )}
                </FormItem>)
        });
    }
    // 通过默认查询条件设置初始值
    getSuperInitialValue(s) {
        let {defaultParams} = this.state;
        defaultParams = defaultParams || {};
        let value = defaultParams[s.name];
        return s.type === "date" ? (value || null) : (["selectS", "treeSelect"].includes(s.type) ? (value || undefined) : (s.type==="rangeDate" ? value || [] : ""));
    }
    // 表格发生变化时触发，如：翻页、筛选、排序
    handleTableChange(pagination, filters, sorter) {
        let { field: sort, order = "" } = sorter;
        let sortName = sort;
        let direction = order.replace("end", "") || "desc";
        if (sortName != this.state.sort && direction !== this.state.direction) {
            pagination.current = 1;
            pagination.total = 0;
        }
        this.setState({
            sort: sortName,
            filteredInfo: filters,
            direction,
            pagination
        }, this.getListData);
    }
    handleShowAllFields() {
        this.setState({showAllFields: !this.state.showAllFields})
    }
    // 点击查询按钮时
    handleQuerySubmit(e) {
        e.preventDefault();
        let values = this.props.form.getFieldsValue();
        let { pagination } = this.state;
        pagination.total = 0;
        pagination.current = 1;
        this.setState({
            ...values,
            pagination
        }, this.getListData);
    }
    // 清空查询条件时
    resetQueryForm() {
        this.props.form.resetFields();
        this.props.form.setFieldsValue(this.resetInputGroups);
        let { pagination } = this.state;
        let values = this.props.form.getFieldsValue();
        pagination.current = 1;
        pagination.pageSize = 10;
        pagination.total = 0;
        this.setState({
            ...values,
            pagination
        }, this.getListData);
    }
    // 导入
    onUploadChange(e) {
        if (Array.isArray(e)) {
            return e;
        }
        let isSuccess = false;
        try {
            if (e && e.fileList && e.fileList.length && e.fileList[0].response) {
                let res = e.fileList[0].response;
                isSuccess = res.code === "000";
                if (isSuccess) {
                    JRUI.JRMessagebox("success", "导入完成");
                    this.getListData();
                } else {
                    JRUI.JRMessagebox("error", "导入失败");
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
    handleViewFlow(data) {
        this.setState({
            itemData: data || null
        }, () => {
            this.setState({
                isShowFlowViewModal: true
            })
        });
    }
    // 金额转化
    convertAmount(unit, num) {
        if(isNaN(num)) return 0;
        switch (unit) {
            case "1": // 元
                return (
                <JRUI.JRStatistic
                    value={num}
                    precision={2}
                />);
            case "2": // 万元
                return (
                    <JRUI.JRStatistic
                        value={Number(num) / 10000}
                        precision={2}
                    />);
            case "3": // 亿元
                return (
                    <JRUI.JRStatistic
                        value={Number(num) / 100000000}
                        precision={4}
                    />);
            default:
                return num;
        }
    }
    // 启用禁用切换时
    handleSwitchChange(record, checked) {
        let self = this;
        let { actions, forbidText } = this.state;
        forbidText = forbidText || {};
        let text = checked ? forbidText.checkedInfo || "启用该条数据" : forbidText.uncheckedInfo || "禁用该条数据";
        JRUI.JRConfirmbox({
            type: "confirm",
            content: `确定${text}吗？`,
            okText: "确定",
            cancelText: "取消",
            onOk() {
                actions.forbid(record, (isSuccess) => {
                    if (isSuccess) {
                        JRUI.JRMessagebox("success", `${text.substring(0,2)}成功`);
                        self.getListData();
                    }
                });

            }
        });
    }
    handleDelete(record) {
        let self = this;
        let { actions } = this.state;
        JRUI.JRConfirmbox({
            type: "confirm",
            content: COMMON_CONSTANTS.DELETE_DESCRIPTION,
            okText: COMMON_CONSTANTS.DELETE_OK_TEXT,
            cancelText: COMMON_CONSTANTS.DELETE_CANCEL_TEXT,
            onOk() {
                actions.delete(record, (isSuccess) => {
                    if (isSuccess) {
                        JRUI.JRMessagebox("success", COMMON_CONSTANTS.DELETE_SUCCESS_TEXT);
                        self.getListData();
                    }
                });
            }
        });
    }
    //被嵌套子表的columns
    expandedRowRender = ( record ) => {
        // if(!record.detailList || !record.detailList.length) return;
        let columns = this.expandedColumns || [];
        if(columns.length) {
            columns.map(c=>{
                c.className = c.className || "";
                if(c.isIndex) {
                    c.title = "序号";
                    c.dataIndex = "index";
                    c.align = "center";
                    c.render = (text, record, index) => {
                        return index + 1;
                    }
                }
                if(c.sorter) {
                    c.sorter = (a, b) => a[c.dataIndex] - b[c.dataIndex];
                }
                if(c.dataType === "date") {
                    c.render = (text) => {
                        return FormatDate(text, c.format || DATE_FORMAT);
                    }
                } else if(c.dataType === "amount") {
                    c.render = (text) => this.convertAmount(c.unit, text);
                }
                // delete c.dataType;
                if(c.width != undefined && c.width != null) {
                    // TODO
                    delete c.width;
                }
                if(c.fixed != "left" && c.fixed != "right") {
                    delete c.fixed;
                }
            })
        }
        return (<JRUI.JRTable columns={columns}
            dataSource={record.detailList || []}
            rowKey={()=>Math.random()}
            pagination={false}
            style={{width: this.props.config.expandedTableWidth || "100%"}}
                />);
      };
    //整理columns的action
    gernerateColumns() {
        let {columns, pagination, filteredInfo, noMaintain, hasFlow, forbidText } = this.state;
        filteredInfo = filteredInfo || {};
        forbidText = forbidText || {};
        columns.map(c => {
            c.className = c.className || "";
            if (c.isIndex) {
                c.title = "序号",
                    c.dataIndex = "index",
                    c.align = "center";
                c.render = (text, record, index) => {
                    return (pagination.current - 1) * pagination.pageSize + index + 1;
                }
            }
            if (c.isSwitch) {
                c.align = "center";
                c.sort = false;
                c.filters = false;
                c.render = (text, record) => (
                    <JRUI.JRSwitch checked={("" + text).trim() === "E" || ("" + text).trim() === "0"}
                        checkedChildren={forbidText.checked || "有效"}
                        unCheckedChildren={forbidText.unchecked || "无效"}
                        onChange={this.handleSwitchChange.bind(this, record)}
                    />
                );
            } else if (c.filters && c.filters.length) {
                c.filteredValue = filteredInfo[c.dataIndex] || null;
                c.render = (text) => {
                    let obj = c.filters.find(f => f.value == text);
                    return obj ? obj.text || text : text;
                }
            }
            if (c.sorter) {
                c.sorter = (a, b) => a[c.dataIndex] - b[c.dataIndex];
            }
            if(c.dataType === "date") {
                c.render = (text) => {
                    return FormatDate(text, c.format || DATE_FORMAT);
                }
            } else if(c.dataType === "amount") {
                c.render = (text) => this.convertAmount(c.unit, text);
            }
            // delete c.dataType;
            if(c.width != undefined && c.width != null ) {
                // TODO
                delete c.width;
            }
            if(c.fixed != "left" && c.fixed != "right") {
                delete c.fixed;
            }
            if (c.actions && c.actions.length) {
                let ac = c.actions;
                c.fixed = "right";
                c.align = "center";
                c.width = 24;// + (ac.length - 1) * 24;
                c.render = (text, record) => (
                    <span className="table-action-box">
                        {ac.includes("history") &&
                            <JRUI.JRTooltip title="历史">
                                <JRUI.JRImage source="font"
                                    onClick={this.props.openModal.bind(this, CONSTANTS["history"], record)}
                                    type="issues-close"
                                />
                            </JRUI.JRTooltip>}
                        {ac.includes("edit") && (!hasFlow || (hasFlow && text === 1)) &&
                            <JRUI.JRTooltip title="修改">
                                <JRUI.JRImage source="font" onClick={this.props.openModal.bind(this, CONSTANTS["update"], record)}
                                    type="edit"
                                />
                            </JRUI.JRTooltip>}
                        {ac.includes("preview") &&
                            <JRUI.JRTooltip title="预览">
                                <JRUI.JRImage source="font" onClick={this.props.openModal.bind(this, CONSTANTS["view"], record)}
                                    type="eye"
                                />
                            </JRUI.JRTooltip>}

                        {ac.includes("detail") &&
                            <JRUI.JRTooltip title="查看详情">
                                <JRUI.JRImage source="font" onClick={this.props.openModal.bind(this, CONSTANTS["detail"], record)}
                                    type="eye"
                                />
                            </JRUI.JRTooltip>}
                        {hasFlow && text > 1 && record.flowFlag != "0" &&
                            <JRUI.JRTooltip title="办理">
                                <JRUI.JRImage source="font"
                                    onClick={this.openProcessModal.bind(this, record)}
                                    type="audit"
                                />
                            </JRUI.JRTooltip>}
                        {hasFlow && !noMaintain && record.flowFlag === "0" &&
                            <JRUI.JRTooltip title="维护">
                                <JRUI.JRImage source="font"
                                    onClick={this.props.openModal.bind(this, CONSTANTS["maintain"], record)}
                                    type="file-sync"
                                />
                            </JRUI.JRTooltip>}
                        {ac.includes("config") &&
                            <JRUI.JRTooltip title="配置">
                                <JRUI.JRImage source="font" onClick={this.props.openModal.bind(this, CONSTANTS["setting"], record)}
                                    type="setting"
                                />
                            </JRUI.JRTooltip>}
                        {ac.includes("flowview") && record.tmEffectflag != "D" &&
                            <JRUI.JRTooltip title="查看流程">
                                <JRUI.JRImage source="font" type="schedule"
                                    onClick={this.handleViewFlow.bind(this, record)}
                                />
                            </JRUI.JRTooltip>}
                        {ac.includes("delete") && (!hasFlow || (hasFlow && text <= 1 && record.tmEffectflag != "D")) &&
                            <JRUI.JRTooltip title="删除">
                                <JRUI.JRImage source="font" onClick={this.handleDelete.bind(this, record)}
                                    type="delete"
                                />
                            </JRUI.JRTooltip>}
                    </span>
                );
            }
        });
        return columns;
    }
    // 渲染页面
    render() {
        // const { getFieldDecorator } = this.props.form;
        let { exportParams,
            tableHeaders = {}, showAllFields } = this.state;
        let { rowKey = () => { } } = this.props.config;
        let uploadProps = tableHeaders.import ? {
            name: "file",
            action: tableHeaders.import,
            showUploadList: false,
            className: "upload-btn-container",
            accept: "application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            onChange: this.onUploadChange.bind(this)
        } : {};
        const superSearchItem = this.gernerateFormItem();
        const len = superSearchItem ? superSearchItem.length : 0;
        const showItems = superSearchItem.slice(0, 3);
        const otherItems = superSearchItem.slice(3);
        let tableProps = {
            columns:this.gernerateColumns(),
            bordered: true,
            dataSource: this.state.listData,
            loading: this.state.loading,
            onChange: this.handleTableChange.bind(this),
            pagination: this.state.pagination,
            rowKey: rowKey.bind(this),
            scroll: {x: true },
            expandedRowRender: this.expandedColumns && this.expandedColumns.length ? this.expandedRowRender : undefined,
            className: "zj-scroll-table",
            rowClassName: (record)=>{
                if(this.expandedColumns && this.expandedColumns.length && (!record[this.expandedDataKey] || !record[this.expandedDataKey].length)){
                        return "no-expand-icon";
                }
            }
        };
        return (
            <article className="advanced-table-box">
                <div ref={this.setCurrComp} style={{ position: "relative" }} />
                <section className="search-header">
                    <Form layout="inline"
                        className="search-field"
                    >
                        {showItems}
                        {showAllFields && otherItems}
                    </Form>
                    <div className="btn-box">
                        <JRUI.JRButton htmlType="button"
                            onClick={this.resetQueryForm.bind(this)}
                        ><JRUI.JRImage source="font" type="reload" />清空</JRUI.JRButton>
                        <JRUI.JRButton htmlType="button"
                            onClick={this.handleQuerySubmit.bind(this)}
                            type="primary"
                        ><JRUI.JRImage source="font" type="search" />查询</JRUI.JRButton>
                    </div>

                    {len > 3 ? <div className="search-toggle">
                        <span onClick={this.handleShowAllFields.bind(this)}><JRUI.JRImage source="font" type={showAllFields ? "up" : "down"} /></span>
                    </div> : ""}
                </section>
                <section className="table-content">
                    {tableHeaders.add &&
                        <JRUI.JRButton htmlType="button"
                            onClick={this.props.openModal.bind(this, CONSTANTS["update"], null)}
                            type="primary"
                        ><JRUI.JRImage source="font" type="plus" />新增</JRUI.JRButton>}
                    {tableHeaders.template &&
                        <JRUI.JRALink href={tableHeaders.template} download>
                            <JRUI.JRButton htmlType="button"
                                type="primary"
                            ><JRUI.JRImage source="font" type="download" />模板下载</JRUI.JRButton>
                        </JRUI.JRALink>}
                    {tableHeaders.import &&
                        <JRUI.JRFileupload {...uploadProps}>
                            <JRUI.JRButton htmlType="button"
                                type="primary"
                            >
                                <JRUI.JRImage source="font" type="upload" />批量导入
                            </JRUI.JRButton>
                        </JRUI.JRFileupload>}
                    {tableHeaders.export &&
                        <JRUI.JRALink href={tableHeaders.export + exportParams} download>
                            <JRUI.JRButton htmlType="button"
                                type="primary"
                            ><JRUI.JRImage source="font" type="export" />导出</JRUI.JRButton>
                        </JRUI.JRALink>}
                    <JRUI.JRTable {...tableProps} />
                </section>
            </article>
        );
    }
}
const DecoratedTable = Form.create()(DecoratedTableForm);
export default DecoratedTable;
