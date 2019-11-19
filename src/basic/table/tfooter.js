/**
 * @Author: Zhao Kunkun
 * @Date: 2019-06-04 15:30:11
 * @Last Modified by: Zhao Kunkun
 * @Last Modified time: 2019-06-04 16:20:01
 */
import {PureComponent} from "react";
import PropTypes from "prop-types";
import "./tfooter.scss";

// export type TableColumnProps = {
//     dataIndex: string,
//     render?: (val: any) => any,
// }

class AntdTableTFoot extends PureComponent {

    static propTypes = {
        tableId: PropTypes.string.isRequired,
        dataSource: PropTypes.array.isRequired,
        summaryDataSource: PropTypes.object.isRequired,
        columns: PropTypes.array.isRequired,
        summaryColumns: PropTypes.arrayOf(PropTypes.shape({
            dataIndex: PropTypes.string.isRequired,
            render: PropTypes.func
        })),
        totalSummaryText: PropTypes.string
    };

    static defaultProps = {
        totalSummaryText: "合计"
    };

    componentDidMount() {
        this.renderSummary();
    }

    componentDidUpdate(prevProps) {
        if(this.props.dataSource !== prevProps.dataSource
            || this.props.summaryDataSource !== prevProps.summaryDataSource) {
            this.renderSummary();
        }
    }

    componentWillUnmount() {
        let tfoot = document.querySelector("#" + this.props.tableId + " .ant-table-body>table>tfoot");
        if(!tfoot) return;
        tfoot.parentNode.removeChild(tfoot);
    }

    renderSummary = () => {
        let table = document.querySelector("#" + this.props.tableId + " .ant-table-body>table");
        if(!table) return;

        let tFoot = table.querySelector("tfoot");
        if(tFoot) {
            tFoot.parentNode.removeChild(tFoot);
        }

        tFoot = document.createElement("tfoot");
        tFoot.setAttribute("class", "ant-table-tfoot");
        let tr = document.createElement("tr");

        this.props.columns.forEach((item, idx) => {
            let td = document.createElement("td");

            if(idx === 0) {
                td.innerText = this.props.totalSummaryText;
                td.setAttribute("class", "text-center");
            } else {
                let summary = this.props.summaryColumns[idx - 1];
                if(summary) {
                    td.innerHTML = summary.dataIndex
                        ? `<span>${summary.render
                            ? summary.render(this.props.summaryDataSource[summary.dataIndex])
                            : this.props.summaryDataSource[summary.dataIndex]}</span>`
                        : "&nbsp;";
                    td.setAttribute("class", "text-right");
                }
            }
            tr.appendChild(td);
            td = null;
        });
        tFoot.appendChild(tr);
        table.appendChild(tFoot);
        tr = null;
        tFoot = null;
        table = null;
    };

    render() {
        return null;
    }

}


export default AntdTableTFoot;