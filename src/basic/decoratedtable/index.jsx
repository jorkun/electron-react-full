/*
 * @Author: Zhao Kunkun
 * @Date: 2019-04-08 15:19:03
 * @Last Modified by: Zhao Kunkun
 * @Last Modified time: 2019-07-23 14:40:06
 */
import React, { Component } from "react";
import "jrui/index.scss";

import { Form } from "antd";
import ColumnModal from "./column-modal";
import FLowViewModal from "components/flow-view/index";
import ProcessModal from "components/modal-process/index";
import * as API from "./decoratedtable-api";
import {
    JRStatistic,
    JRALink, JRFuzzySearch, JRMessagebox,
    JRTextbox, JRImage, JRButton, JRTable, JRConfirmbox,
    JRSwitch, JRCombobox, JRDatebox, JRRangePicker, JRTooltip, JRFileupload
} from "jrui";
import CONSTANTS from "./constants";
import COMMON_CONSTANTS from "utils/constants";
import {FormatDate} from "utils/common";
// import moment from "moment";
const DATE_FORMAT = "yyyy-MM-dd";
const FormItem = Form.Item;
class DecoratedTableForm extends Component {
    static defaultProps = {
        config: {
            date: Date.now(),// 系统平台日
            hasFlow: false,
            isInputPage: false,// 准入页面特殊处理
            defaultParams: {},
            noMaintain: false,// 有无维护功能
            processModalSize: "large",
            tableName: "",// 自定义列的表名
            tableHeaders: {},// {add: true,import:url,export:url,template:url}
            rowKey: () => { },
            forbidText: {},
            moduleId: "",// 有流程时必须传入
            searchKey: "searchList",
            customColumns: [],
            fuzzySearchList: [],// 模糊搜索：[{key: "*",title: "自动识别",description: "模糊搜索"}]
            columns: {
                start: [],
                middle: [],// 一般是数据库配出来的
                end: []
            },
            superSearchList: [],// //高级搜索条件配置{type: "text",name: "text",label: "标签名"}
            actions: {
                save: () => { },
                page: () => { },
                delete: () => { },
                forbid: () => { },
                bodyExport: ()=>{return null;}
            }
        }
    };
    constructor(props) {
        super(props);
        let moduleId = props.config.moduleId || "";
        let tableName = props.config.tableName || "";
        this.columnsSessionKey = moduleId + tableName;
        this.state = {
            date: props.config.date ||  Date.now(),// 系统平台日
            hasFlow: props.config.hasFlow || false,
            listData: [],
            params: {},
            tableName,
            moduleId,
            isInputPage: props.config.isInputPage || false,// 准入页面特殊处理
            noMaintain: props.config.noMaintain || false,
            processModalSize: props.config.processModalSize || {},
            forbidText: props.config.forbidText || {},
            tableHeaders: props.config.tableHeaders || {},
            searchKey: props.config.searchKey || "",
            columns: Object.assign({}, props.config.columns, {middle: []}),
            defaultParams: props.config.defaultParams || {},
            superSearchList: [],
            fuzzySearchList: [],
            fuzzySearch: null,
            formCfg: props.config.form || [],
            actions: props.config.actions || {},
            customColumns: [],
            showAllSearch: false,
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
        this.getColumnInfo(props.config.tableName);
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
    async getColumnInfo(name) {

        // 获取缓存中的显示列
        let columns = Object.assign({}, this.props.config.columns, {
            middle: JSON.parse(localStorage.getItem(this.columnsSessionKey) || "[]")
        });
        let result = {};
        if (name) {
            result = await API.GetColumnInfo(name);
        }
        if (result) {
            const searchDatas = result.columns || [];
            let fuzzySearchList = [], superSearchList = [];
            searchDatas.map(d => {
                if (d.isCsearch === "Y") {
                    fuzzySearchList.push({
                        key: d.columnCode,
                        title: d.columnTitle,
                        description: d.warnText || d.columnTitle
                    });
                }
                if (d.isHsearch === "Y") {
                    superSearchList.push({
                        type: d.columType,
                        name: d.columnCode,
                        label: d.columnTitle,
                        options: d.filters || []
                    });
                }
            });
            let params = {};
            superSearchList.map(s => (params[s.name] = ""));
            let customColumns = result.head || [];
            if(!columns.middle || !columns.middle.length) {
                columns.middle = customColumns.filter(c=> !!c.defaultShow);
            }
            this.setState({customColumns, columns, fuzzySearchList, superSearchList, params });
        }
    }
    // 获取表格数据
    async getListData() {
        this.setState({
            loading: true,
            listData: []
        });
        let { pagination, moduleId, defaultParams = {},
            opType = "1", tmEffectflag, showAllSearch, hasFlow, fuzzySearch,
            filteredInfo, sort, direction, searchKey, actions } = this.state;
        let params = hasFlow ? {tmEffectflag} : {};
        filteredInfo = filteredInfo || {};
        let filteredParams = {};
        for(let key in filteredInfo) {
            if(filteredInfo[key] && filteredInfo[key].length) {
                filteredParams[key] = filteredInfo[key].join(",");
            }
        }
        if (fuzzySearch && !showAllSearch) {
            params = Object.assign({}, params, fuzzySearch);
        } else {
            let formValues = this.props.form.getFieldsValue();
            params = Object.assign({}, params, formValues);
        }
        if (defaultParams) {
            params = Object.assign({}, params, defaultParams)
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
        if(keys && keys.length) {
            urlP = "?" + (keys.map((key) => {
                if(params[key])
                    return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
                else return;
            }).filter(Boolean).join("&"));
        }
        return urlP;
    }
    // 保存配置的列
    saveColumns(data) {
        localStorage.setItem(this.columnsSessionKey, JSON.stringify(data || []));
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
                return <JRTextbox autoComplete="off" placeholder={item.label} />;
            case "date": // 日期选择
                return <JRDatebox />;
            case "rangeDate": // 区间选择
                return <JRRangePicker />;
            case "select": // 下拉框
                return (
                    <JRCombobox placeholder={item.label}
                        emptyText="请选择"
                        container={this.currComp}
                        data={Array.isArray(item.options) ? item.options : []}
                    />

                )
            default:
                return <JRTextbox autoComplete="off" placeholder={item.label} />;
        }
    }
    gernerateFormItem() {
        let { superSearchList } = this.state;
        const { getFieldDecorator } = this.props.form;
        return superSearchList.map((s, i) => {
            return (
                <FormItem key={i}
                    label={s.label}
                    style={s.style || {}}
                >
                    {getFieldDecorator(`${s.name}`, {
                        initialValue: s.type === "date" ? null : ""
                    })(
                        this.switchItem(s)
                    )}
                </FormItem>)
        });
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
    // 模糊查询
    handleQuery(obj) {
        this.setState({
            fuzzySearch: this.state.showAllSearch ? null : obj
        }, ()=> {
            if(!this.state.showAllSearch) {
                this.getListData()
            }
        });
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
    handleShowColumnModal() {
        this.setState({
            isShowColumnModal: true
        })
    }
    // 导入
    onUploadChange(e) {
        if (Array.isArray(e)) {
            return e;
        }
        let isSuccess = false;
        try {
            if (e && e.fileList && e.fileList.length) {
                e.fileList.map(l => {
                    let res = l.response;
                    if(!l.uploaded && res) {
                        let result = res.code === "000";
                        if(result) {
                            isSuccess = true;
                            JRMessagebox("success", "导入完成");
                        } else {
                            JRMessagebox("error", res.message || "导入失败");
                        }
                        l.uploaded = true;
                    }
                })
                if(isSuccess) {
                    this.getListData();
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
    // 高级搜索切换
    handleShowAllSearch() {
        this.setState({ showAllSearch: !this.state.showAllSearch })
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
                <JRStatistic
                    value={Number(num)}
                    precision={2}
                />);
            case "2": // 万元
                return (
                    <JRStatistic
                        value={Number(num) / 10000}
                        precision={2}
                    />);
            case "3": // 亿元
                return (
                    <JRStatistic
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
        JRConfirmbox({
            type: "confirm",
            content: `确定${text}吗？`,
            okText: "确定",
            cancelText: "取消",
            onOk() {
                actions.forbid(record, (isSuccess) => {
                    if (isSuccess) {
                        JRMessagebox("success", `${text.substring(0,2)}成功`);
                        self.getListData();
                    }
                });

            }
        });
    }
    handleDelete(record) {
        let self = this;
        let { actions } = this.state;
        JRConfirmbox({
            type: "confirm",
            content: COMMON_CONSTANTS.DELETE_DESCRIPTION,
            okText: COMMON_CONSTANTS.DELETE_OK_TEXT,
            cancelText: COMMON_CONSTANTS.DELETE_CANCEL_TEXT,
            onOk() {
                actions.delete(record, (isSuccess) => {
                    if (isSuccess) {
                        JRMessagebox("success", COMMON_CONSTANTS.DELETE_SUCCESS_TEXT);
                        self.getListData();
                    }
                });
            }
        });
    }

    // 打开办理页面
    openProcessModal(data) {
        this.setState({
            itemData: data || null
        }, () => {
            this.setState({
                isShowProcessModal: true
            })
        });
    }
    canEdit(record) {
        // let {hasFlow, date: currDate, isInputPage} = this.state;
        let {hasFlow} = this.state;
        // let {taskseq: text, startDate, endDate} = record;
        let {taskseq: text} = record;
        // isInputPage && (moment(currDate).isBefore(startDate.valueOf(), "day") || moment(currDate).isAfter(endDate.valueOf(), "day"));
        return !hasFlow || (hasFlow && text === 1 && record.flowFlag != "0")
    }
    canDelete(record) {
        let {hasFlow} = this.state;
        // let {hasFlow, date, isInputPage} = this.state;
        // let {taskseq: text, startDate, endDate} = record;
        let {taskseq: text} = record;
        return (!hasFlow && record.tmEffectflag != "D") || (hasFlow && text <= 1 && record.flowFlag != "0" && record.tmEffectflag != "D");
    }
    gernerateColumns() {
        let {columns: orginColumns, pagination,
            filteredInfo, noMaintain, hasFlow, forbidText,actions } = this.state;
        filteredInfo = filteredInfo || {};
        forbidText = forbidText || {};
        const columns = [...orginColumns.start, ...orginColumns.middle, ...orginColumns.end];
        columns.map(c => {
            c.className = c.className || "";
            if (c.isIndex) {
                c.title = "序号";
                c.dataIndex = "index";
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
                    <JRSwitch checked={("" + text).trim() === "E" || ("" + text).trim() === "0"}
                        checkedChildren={forbidText.checked || "有效"}
                        unCheckedChildren={forbidText.unchecked || "无效"}
                        onChange={this.handleSwitchChange.bind(this, record)}
                    />
                );
            } else if(c.filters && c.filters.length) {
                let dicts = c.filters;
                c.render = (text) => {
                    let obj = dicts.find(f => f.value == text);
                    return obj ? obj.text || text : text;
                }
                if(c.filters.length <= 1) {
                    c.filters = null;
                } else {
                    c.filteredValue = filteredInfo[c.dataIndex] || null;
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
            if(c.width != undefined && c.width != null) {
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
                            <JRTooltip title="历史">
                                <JRImage source="font"
                                    onClick={this.props.openModal.bind(this, CONSTANTS["history"], record)}
                                    type="issues-close"
                                />
                            </JRTooltip>}
                        {ac.includes("preview") &&
                            <JRTooltip title="预览">
                                <JRImage source="font" onClick={this.props.openModal.bind(this, CONSTANTS["view"], record)}
                                    type="eye"
                                />
                            </JRTooltip>}

                        {ac.includes("detail") &&
                            <JRTooltip title="查看详情">
                                <JRImage source="font" onClick={this.props.openModal.bind(this, CONSTANTS["detail"], record)}
                                    type="eye"
                                />
                            </JRTooltip>}
                        {ac.includes("edit") && this.canEdit(record) &&
                            <JRTooltip title="修改">
                                <JRImage source="font" onClick={this.props.openModal.bind(this, CONSTANTS["update"], record)}
                                    type="edit"
                                />
                            </JRTooltip>}
                        {hasFlow && text > 1 && record.flowFlag != "0" &&
                            <JRTooltip title="办理">
                                <JRImage source="font"
                                    onClick={this.openProcessModal.bind(this, record)}
                                    type="audit"
                                />
                            </JRTooltip>}
                        {hasFlow && !noMaintain && record.flowFlag === "0" &&
                            <JRTooltip title="维护">
                                <JRImage source="font"
                                    onClick={this.props.openModal.bind(this, CONSTANTS["maintain"], record)}
                                    type="file-sync"
                                />
                            </JRTooltip>}
                        {ac.includes("config") &&
                            <JRTooltip title="配置">
                                <JRImage source="font" onClick={this.props.openModal.bind(this, CONSTANTS["setting"], record)}
                                    type="setting"
                                />
                            </JRTooltip>}
                        {/* 授信核定有此功能，其余暂无 */}
                        {ac.includes("carry") && record.tmEffectflag === "E" && record.crCycle === "1" &&
                            <JRTooltip title="结转">
                                <JRImage source="font" onClick={this.props.openModal.bind(this, CONSTANTS["carry"], record)}
                                    type="snippets"
                                />
                            </JRTooltip>}
                        {ac.includes("flowview") && record.tmEffectflag != "D" &&
                            <JRTooltip title="查看流程">
                                <JRImage source="font" type="schedule"
                                    onClick={this.handleViewFlow.bind(this, record)}
                                />
                            </JRTooltip>}
                        {ac.includes("delete") && this.canDelete(record) &&
                            <JRTooltip title="删除">
                                <JRImage source="font" onClick={this.handleDelete.bind(this, record)}
                                    type="delete"
                                />
                            </JRTooltip>}
                        {ac.includes("export") && record.tmEffectflag === "E" && actions.bodyExport && actions.bodyExport(record)}
                    </span>
                );
            }
        });
        return columns;
    }
    // 渲染页面
    render() {
        // const { getFieldDecorator } = this.props.form;
        let { columns: orginColumns, superSearchList = [], customColumns = [],
            isShowFlowViewModal, itemData, exportParams, tmEffectflag,
            tableHeaders = {}, fuzzySearchList, showAllSearch,
            hasFlow = false, opType, isShowProcessModal,
            processModalSize,
            isShowColumnModal } = this.state;
        let { rowKey = () => { } } = this.props.config;
        let hasNormalSearch = superSearchList && superSearchList.length;

        const uploadProps = {
            name: "file",
            action: tableHeaders.import,
            showUploadList: false,
            className: "upload-btn-container",
            accept: "application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            onChange: this.onUploadChange.bind(this)
        };
        return (
            <article className="advanced-table-box">
                <div ref={this.setCurrComp} style={{ position: "relative" }} />
                <ProcessModal
                    closeModal={(isSuccess) => {
                        this.setState({
                            itemData: null,
                            isShowProcessModal: false
                        }, () => {
                            isSuccess && this.getListData();
                        })
                    }}
                    itemData={itemData}
                    visible={isShowProcessModal}
                    size={processModalSize}
                />
                <ColumnModal
                    closeModal={(mc) => {
                        let { columns } = this.state;
                        columns.middle = mc || orginColumns.middle;
                        this.saveColumns(mc);
                        this.setState({
                            isShowColumnModal: false,
                            columns
                        })
                    }}
                    all={customColumns}
                    columns={orginColumns.middle}
                    visible={isShowColumnModal}
                />
                <FLowViewModal
                    closeModal={() => {
                        this.setState({
                            isShowFlowViewModal: false,
                            itemData: null
                        })
                    }}
                    itemData={itemData}
                    visible={isShowFlowViewModal}
                />
                <section className="search-header jupiter">
                    <div className="search-field">
                        {fuzzySearchList && fuzzySearchList.length ?
                        <JRFuzzySearch
                            style={{ width: "calc(100% - 420px)", display: "inline-block", maxWidth: 440 }}
                            data={fuzzySearchList}
                            disabled={showAllSearch}
                            onSearch={this.handleQuery.bind(this)}
                        /> : ""}
                        {hasFlow ? <div style={{width: 400, verticalAlign: "top", display: "inline-block", marginLeft: "10px"}}>
                            <label>操作类型:</label>
                            <JRCombobox onChange={this.handleTypeChange.bind(this)}
                                container={this.currComp}
                                style={{width: 120, margin: "0 8px"}}
                                defaultValue="1"
                                data={[{
                                    text: "办理",
                                    value: "1"
                                }, {
                                    text: "查询",
                                    value: "2"
                                }]}
                            />
                            <label>流程状态:</label>
                            <JRCombobox disabled={opType === "1"}
                                container={this.currComp}
                                defaultValue=""
                                value={tmEffectflag}
                                onChange={this.handleEffectChange.bind(this)}
                                style={{width: 120, margin: "0 8px"}}
                                emptyText="所有"
                                data={[{
                                    text: "未办结",
                                    value: "A"
                                }, {
                                    text: "已办结",
                                    value: "E"
                                }, {
                                    text: "无效",
                                    value: "D"
                                }]}
                            />
                        </div> : ""}
                    </div>
                    <div className="btn-box">
                        {hasNormalSearch ?
                            <JRALink href="javascript:void(0)"
                                style={{ marginRight: 10 }}
                                onClick={this.handleShowAllSearch.bind(this)}
                            >{showAllSearch ? "普通搜索" : "高级搜索"}</JRALink> : ""}
                        {customColumns && customColumns.length ?
                            <JRButton htmlType="button" onClick={this.handleShowColumnModal.bind(this)}>
                                <JRImage source="font" type="setting" />
                            </JRButton> : ""}
                    </div>
                    {hasNormalSearch && showAllSearch ?
                        <Form layout="inline"
                            className="search-field"
                        >
                            {/* {hasFlow ? <FormItem label="操作类型">
                                {getFieldDecorator("opType", {
                                    initialValue: opType
                                })(
                                    <JRCombobox onChange={this.handleTypeChange.bind(this)}
                                        container={this.currComp}
                                        data={[{
                                            text: "办理",
                                            value: "1"
                                        }, {
                                            text: "查询",
                                            value: "2"
                                        }]}
                                    />
                                )}
                            </FormItem> : ""}
                            {hasFlow ? <FormItem label="流程状态">
                                {getFieldDecorator("tmEffectflag", {
                                    initialValue: ""
                                })(
                                    <JRCombobox disabled={opType === "1"}
                                        container={this.currComp}
                                        emptyText="所有"
                                        data={[{
                                            text: "未办结",
                                            value: "A"
                                        }, {
                                            text: "已办结",
                                            value: "E"
                                        }, {
                                            text: "无效",
                                            value: "D"
                                        }]}
                                    />
                                )}
                            </FormItem> : ""} */}
                            {this.gernerateFormItem()}
                            <div className="btn-box">
                                <JRButton htmlType="button"
                                    onClick={this.handleQuerySubmit.bind(this)}
                                    type="primary"
                                ><JRImage source="font" type="search" />查询</JRButton>
                                <JRButton htmlType="button"
                                    onClick={this.resetQueryForm.bind(this)}
                                ><JRImage source="font" type="reload" />清空</JRButton>
                            </div>
                        </Form> : ""}
                </section>
                <section className="table-content">
                    {tableHeaders.add &&
                        <JRButton htmlType="button"
                            onClick={this.props.openModal.bind(this, CONSTANTS["update"], null)}
                            type="primary"
                        ><JRImage source="font" type="plus" />新增</JRButton>}
                    {tableHeaders.template &&
                        <JRALink href={tableHeaders.template} download>
                            <JRButton htmlType="button"
                                type="primary"
                            ><JRImage source="font" type="download" />模板下载</JRButton>
                        </JRALink>}
                    {tableHeaders.import &&
                        <JRFileupload {...uploadProps}>
                            <JRButton htmlType="button"
                                type="primary"
                            >
                                <JRImage source="font" type="upload" />批量导入
                            </JRButton>
                        </JRFileupload>}
                    {tableHeaders.export &&
                        <JRALink href={tableHeaders.export + exportParams} download>
                            <JRButton htmlType="button"
                                type="primary"
                            ><JRImage source="font" type="export" />导出</JRButton>
                        </JRALink>}
                    <JRTable columns={this.gernerateColumns()}
                        bordered
                        dataSource={this.state.listData}
                        loading={this.state.loading}
                        onChange={this.handleTableChange.bind(this)}
                        pagination={this.state.pagination}
                        rowKey={rowKey.bind(this)}
                        scroll={{ x: true }}
                        className="zj-scroll-table"
                    />
                </section>
            </article>
        );
    }
}
const DecoratedTable = Form.create()(DecoratedTableForm);
export default DecoratedTable;
