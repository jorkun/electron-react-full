import React, {Component} from "react";

import {Row, Col} from "antd";
import {JRCombobox, JRImage, JRChosenbox} from "jrui";
import {ConvertDictToData} from "utils/common";
import InitialMessage from "utils/intl";
import * as API from "./formdata-validation-api";

export default class Detailtable extends Component {
    constructor(props) {
        super(props);
        let detailList;
        if (props.data && props.data.length) {
            detailList = [...props.data];
        } else {
            detailList = [this.getDefaultData()];
            props.asyncData(detailList);
        }
        this.state = {
            detailList,
            requrlList: [],
            flowkeyList: [],
            flowtaskseqList: []
        };
        this.currComp = null;
        this.setCurrComp = el => {
            this.currComp = el;
        }
    }

    componentDidMount() {
        let {data} = this.props;
        if (!data || !data.length) {
            this.props.asyncData(this.state.detailList);
        }
        this.getComboBoxList();
    }

    componentWillReceiveProps(nextProps) {
        let {data} = nextProps;
        let detailList = [];
        if (data && data.length) {
            detailList = [...data];
        } else {
            detailList = [this.getDefaultData()];
        }
        this.setState({
            detailList
        });
    }

    getComboBoxList() {
        let self = this;
        Promise.all([
            API.GetAllRequestMappingData(), // 请求url
            API.GetAllFlowkeyData() // 流程key
        ]).then(values => {
            self.setState({
                requrlList: ConvertDictToData(values[0], "key", "value"),
                flowkeyList: ConvertDictToData(values[1], "key", "value")
            });
        }).catch(err => {
            console.log(err);
        });
        let flowtaskseqList = [];
        for (let i = 1; i < 13; i++) {
            flowtaskseqList.push({value: i, text: i});
        }
        self.setState({
            flowtaskseqList
        });
    }

    getDefaultData() {
        return {
            "requrl": "",
            "flowkey": "",
            "flowtaskseq": []
        };
    }

    // 账户数据来源、限制字段、表达式、条件值change事件
    handleValueChange(index, key, value) {
        let {detailList} = this.state;
        detailList[index][key] = value;

        this.setState({
            detailList
        }, () => {
            key === "value" && value;
        });
        this.props.asyncData(detailList);
    }

    removeRow(index) {
        let {detailList} = this.state;
        detailList.splice(index, 1);
        this.setState({
            detailList: detailList
        });
        this.props.asyncData(detailList);
    }

    addRow(index) {
        let {detailList} = this.state;
        // let newRow = this.getDefaultData();
        let curRow = detailList[index];
        let newRow = {
            "requrl": curRow["requrl"],
            "flowkey": curRow["flowkey"],
            "flowtaskseq": curRow["flowtaskseq"]
        };
        detailList.push(newRow);
        this.setState({detailList});
        this.props.asyncData(detailList);
    }

    render() {
        let {detailList, requrlList, flowkeyList, flowtaskseqList} = this.state;
        let {isReadonly = false} = this.props;
        let itemList = detailList.map((d, i) => {
            return (
                <Row className="item"
                    key={i}
                >
                    <Col span={2}>{i + 1}</Col>
                    <Col span={7}>
                        <JRCombobox
                            data={requrlList || []}
                            value={d.requrl}
                            emptyText={InitialMessage("common.select.emptytext")}
                            onChange={this.handleValueChange.bind(this, i, "requrl")}
                        />
                    </Col>
                    <Col span={7}>
                        <JRCombobox
                            data={flowkeyList || []}
                            value={d.flowkey}
                            emptyText={InitialMessage("common.select.emptytext")}
                            onChange={this.handleValueChange.bind(this, i, "flowkey")}
                        />
                    </Col>
                    <Col span={5}>
                        <JRChosenbox
                            data={flowtaskseqList || ""}
                            value={d.flowtaskseq}
                            emptyText={InitialMessage("common.select.emptytext")}
                            onChange={this.handleValueChange.bind(this, i, "flowtaskseq")}
                        />
                    </Col>
                    <Col span={3}
                        className="action-box"
                    >
                        {!isReadonly && detailList.length > 1 &&
                        <JRImage source="font" type="minus-circle-o"
                            onClick={this.removeRow.bind(this, i)}
                        />}
                        {!isReadonly &&
                        <JRImage source="font" type="plus-circle-o"
                            onClick={this.addRow.bind(this, i)}
                        />}
                    </Col>
                </Row>)
        });

        return (
            <section className="editable-table">
                <Row className="header">
                    <Col span={2}>{InitialMessage("common.columns.index")}</Col>
                    <Col span={7}>
                        {InitialMessage("formdatavalidationpage.requrl")}
                    </Col>
                    <Col span={7}>
                        {InitialMessage("formdatavalidationpage.flowkey")}
                    </Col>
                    <Col span={5}>
                        {InitialMessage("formdatavalidationpage.flowtaskseq")}
                    </Col>
                    <Col span={3}>{InitialMessage("common.columns.operate")}</Col>
                </Row>
                {itemList}
            </section>
        );
    }
}
