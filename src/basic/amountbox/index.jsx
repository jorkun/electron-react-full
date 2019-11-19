/*
 * @Author: Zhao Kunkun
 * @Date: 2019-03-07 11:40:25
 * @Last Modified by: Zhao Kunkun
 * @Last Modified time: 2019-07-04 15:21:54
 */
import React from "react";
import JRInput from "../input";
// 金额输入控件
export default class JRRatebox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const format = "#,###.00";// 金额输入控件
        let tisProps = Object.assign({}, {
            align: "right",
            format,
            maxLength: 20
        }, this.props);
        return <JRInput {...tisProps} />
    }
}
