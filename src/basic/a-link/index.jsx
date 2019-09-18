/*
 * @Author: Zhao Kunkun
 * @Date: 2019-03-07 14:42:27
 * @Last Modified by: Zhao Kunkun
 * @Last Modified time: 2019-07-12 15:14:14
 */
import React from "react";
export default class JRALink extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() {
        return <a  {...this.props} className={"jupiter-link" + (this.props.className ? " " + this.props.className : "")}>{this.props.children}</a>
    }
}