/*
 * @Author: Zhao Kunkun
 * @Date: 2019-03-07 14:42:27
 * @Last Modified by: Zhao kunkun
 * @Last Modified time: 2019-03-20 15:22:43
 */
import React from "react";
import { TreeSelect } from "antd";

export default class JRTreeSelect extends React.Component {
    render() {
        let tPorps = Object.assign({}, this.props, {showSearch: true, treeNodeFilterProp: "title"})
        return (<TreeSelect {...tPorps}
            className="jupiter-tree-select"
                />)
    }
}
