/*
 * @Author: Zhao Kunkun
 * @Date: 2019-03-07 11:40:25
 * @Last Modified by: Zhao kunkun
 * @Last Modified time: 2019-03-20 15:37:15
 */
import React from "react";
import JRInput from "../input";
// 利率输入控件
export default class JRRatebox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() {
        const format = "#,###.0000";// 利率输入控件
        let tisProps = Object.assign({}, {
            align: "right",
            format
        }, this.props);
        return <JRInput {...tisProps} />
    }
}