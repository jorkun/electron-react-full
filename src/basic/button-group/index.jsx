/*
 * @Author: Zhao Kunkun
 * @Date: 2019-03-07 14:42:27
 * @Last Modified by: Zhao Kunkun
 * @Last Modified time: 2019-06-12 16:30:26
 */

import React from "react";
import { Button } from "antd";
export default class JRButtonGroup extends React.Component {
    state = {  }
    render() {
        return <Button.Group className="jupiter-button-group" {...this.props}>{this.props.children}</Button.Group>
    }
}

