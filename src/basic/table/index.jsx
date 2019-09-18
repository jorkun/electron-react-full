/*
 * @Author: Zhao Kunkun
 * @Date: 2019-03-07 14:42:27
 * @Last Modified by: Zhao Kunkun
 * @Last Modified time: 2019-06-10 11:22:12
 */
import React from "react";
import { Table } from "antd";
import AntdTableFooter from "./tfooter";
class JRTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            summaryColumns:[],
            summaryDataSource: {},
            loading: true,
            showSum: false
         }
    }
    componentDidMount() {
        this.setSumData(this.props);
    }
    componentWillReceiveProps(nextProps) {
        let {summaryColumns=[], loading} = this.state;
        if(summaryColumns.length != nextProps.columns.length ||
            loading != nextProps.loading) {
            this.setState({
                loading: nextProps.loading
            });
            !nextProps.loading && this.setSumData(nextProps);
        }
    }
    tableId = `jrtable_${+new Date()}_${parseInt(Math.random() * 100000)}`;
    // 金额转化
    convertAmount(unit, num) {
        if(isNaN(num)) return this.numberFormat(Number(0), 2);
        switch(unit) {
            case "1": // 元
                return this.numberFormat(Number(num), 2);
            case "2": // 万元
                return this.numberFormat(Number(num) / 10000, 2);
            case "3": // 亿元
                return this.numberFormat(Number(num) / 100000000, 4);
            default:
                return this.numberFormat(Number(0), 2);
        }
    }
    numberFormat = (num, decimal = 0) => {
        let v = num + "";
        let deci = "";
        if(v.includes(",")) v = v.replace(/,/g, "");

        if(v.includes(".")) {
            let sp = v.split(".");
            v = sp[0];
            deci = decimal > 0 ? parseFloat("." + sp[1]).toFixed(decimal).substring(1) : "";
        } else if(decimal > 0) {
            deci = ".0".padEnd(decimal + 1, "0");
        }
        return v ? v.replace(/(?=(\B\d{3})+$)/g, ",") + (decimal > 0 ? deci : "") : v;
    }
    setSumData = (props) => {
        let {columns, dataSource} = props;
        let showSum = false;
        let summaryColumns = [], summaryDataSource = {};
        if(dataSource && dataSource.length && columns && columns.length) {
            columns.map((c,i) => {
                if(i === 0 && !["Y", 1].includes(c.summary)) return;// 第一列去除？
                if(["Y", 1].includes(c.summary) && c.dataType === "amount") {
                    showSum = true;
                    let sum = dataSource.reduce((s, d) => (d[c.dataIndex] + s), 0);
                    summaryDataSource[c.dataIndex] = sum;
                    summaryColumns.push({
                        dataIndex: c.dataIndex,
                        render: (val) => `<b>${this.convertAmount(c.unit, val)}</b>`
                    })
                } else {
                    summaryColumns.push(undefined);
                }
            });
        }
        this.setState({summaryColumns, summaryDataSource, showSum});
    }
    render() {
        let { summaryColumns=[],
            summaryDataSource = {}, showSum} = this.state;
        return <div>
            <Table {...this.props} id={this.tableId}
                className="jupiter-table"
            />
            {showSum ?
            <AntdTableFooter tableId={this.tableId}
                dataSource={this.props.dataSource}
                columns={this.props.columns}
                summaryColumns={summaryColumns}
                summaryDataSource={summaryDataSource}
            />:""}
        </div>
    }
}
export default JRTable;