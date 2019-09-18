/*
 * @Author: Zhao Kunkun
 * @Date: 2019-03-07 14:42:27
 * @Last Modified by: Zhao Kunkun
 * @Last Modified time: 2019-04-08 15:16:12
 */

import React from "react";
import {AutoComplete } from "antd";
export default class JRAutoComplete extends React.Component {
    state = {  }
    render() {
        return <AutoComplete className="jupiter-auto-complete" {...this.props}>{this.props.children}</AutoComplete>
    }
}

