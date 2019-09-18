/*
 * @Author: zhangliming
 * @Date: 2019-07-29 14:42:27
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-07-29 15:20:44
 */
import React from "react";
import { Icon  } from "antd";

export default class JRIcon extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() {
        let tisProps = Object.assign({}, {
            fontSize: "16px"
        }, this.props);
        return <Icon  {...tisProps} className="jupiter-icon" />
    }
}