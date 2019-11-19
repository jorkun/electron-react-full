/*
 * @Author: Zhao Kunkun
 * @Date: 2019-03-07 14:42:27
 * @Last Modified by: Zhao Kunkun
 * @Last Modified time: 2019-06-10 16:46:12
 */
import React from "react";
export default class JRLabel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() {
        let {style, title} = this.props;
        return (
        <span style={style} title={title}
            className={"jupiter-label" + (this.props.className ? " " + this.props.className : "")}
        >{title}</span>);
    }
}