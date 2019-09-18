/*
 * @Author: Zhao Kunkun
 * @Date: 2019-03-07 14:42:27
 * @Last Modified by: Zhao Kunkun
 * @Last Modified time: 2019-04-08 15:16:12
 */

import React from "react";
import { Button } from "antd";
export default class JRButton extends React.Component {
    state = {  }
    render() {
        return <Button className="jupiter-button" {...this.props}>{this.props.children}</Button>
    }
}

