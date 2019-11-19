/* eslint-disable react/jsx-key */
/*
 * @Author: Zhao Kunkun
 * @Date: 2019-03-07 14:42:27
 * @Last Modified by: Zhao Kunkun
 * @Last Modified time: 2019-06-18 16:47:43
 */

import React from "react";

export default class JRDescriptions extends React.Component {
    static defaultProps={
        bordered: false, //边框线
        title: "", // 标题
        column: 2, // 列数
        children: []
    }
    constructor(props) {
        super(props);
        this.state={};
    }
    getTd() {
        let {column=2, children} = this.props;
        let totalLen = children.length;
        let trs = [];
        if(children) {
            if(column <= totalLen) {
                let i = 0;
                while(i < Math.ceil(totalLen/column)) {
                    trs.push(<tr className="jupiter-descriptions-row">{children.slice(i * column, (i + 1) * column)}</tr>);
                    i++;
                }
            } else {
                trs.push(<tr className="jupiter-descriptions-row">{children}</tr>);
            }
        }
        return trs;
    }
    render() {
        let {title, bordered, align, style} = this.props;
        return (<div className={`jupiter-descriptions${bordered ? " bordered" : ""}${align ? " align-" + align : ""}`} style={style}>
            {title && <div className="jupiter-descriptions-title">{title}</div>}
            <div className="jupiter-descriptions-view">
                <table>
                    <tbody>{this.getTd()}</tbody>
                </table>
            </div>
        </div>)
    }
}
