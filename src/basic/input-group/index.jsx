/*
 * @Author: Zhao Kunkun
 * @Date: 2019-03-07 14:42:27
 * @Last Modified by: Zhao Kunkun
 * @Last Modified time: 2019-06-14 11:20:20
 */

import React from "react";
import { Input } from "antd";
export default class JRInputGroup extends React.Component {
    state = {  }
    render() {
        return <Input.Group className="jupiter-input-group" {...this.props}>{this.props.children}</Input.Group>
    }
}

