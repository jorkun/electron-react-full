/* eslint-disable react/jsx-key */
/*
 * @Author: Zhao Kunkun
 * @Date: 2019-03-07 14:42:27
 * @Last Modified by: Zhao Kunkun
 * @Last Modified time: 2019-06-18 15:59:25
 */

import React from "react";

export default class Item extends React.Component {
    render() {
        let {label} = this.props;
        return [
            <td className="jupiter-descriptions-item-label">{label}</td>,
            <td className="jupiter-descriptions-item-content">{this.props.children}</td>
            ]
    }
}