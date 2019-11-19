/*
 * @Author: Zhao Kunkun
 * @Date: 2019-03-07 14:42:27
 * @Last Modified by: Zhao kunkun
 * @Last Modified time: 2019-03-20 15:41:51
 */
import React from "react";
import {Statistic } from "antd";
export default class JRStatistic extends React.Component {
    state = {  }
    render() {
        return <Statistic className="jupiter-statistic" {...this.props} />
    }
}

