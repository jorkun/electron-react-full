/**
 * @Author: Zhao Kunkun
 * @Date: 2019-06-25 17:45:20
 * @Last Modified by: Zhao Kunkun
 * @Last Modified time: 2019-06-25 17:48:13
 */
import React from "react";
export default class JRDrag extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cursor: "pointer",
            relativeX: 0,
            relatveY: 0,
            isDragging: false
        };
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
    }
    componentDidMount() {
        let node = this.refs.dragPanel;
        node.style.left = "50px"; node.style.top = "50px";
    }
    handleMouseEnter() {
        this.setState({cursor: "cursor"})
    }
    handleMouseLeave() {
        this.setState({isDragging: false})
    }
    handleMouseDown() {
        this.setState({isDragging: true})
    }
    handleMouseUp() {
        console.log(this.state.isDragging);
        this.setState({relativeX: 0, relativeY: 0, isDragging: false})
    }
    handleMouseMove(e) {
        let node = this.refs.dragPanel; this.setState({
            cursor: "move",
            relativeX: e.clientX - node.offsetLeft,
            relativeY: e.clientY - node.offsetTop
        });
        if(this.state.isDragging) {
            node.style.left = e.pageX - this.state.relativeX + "px";
            node.style.top = e.pageY - this.state.relativeY + "px";
        }
    }
    render() {
        return (<div onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
            onMouseDown={this.handleMouseDown}
            onMouseUp={this.handleMouseUp}
            onMouseMove={this.handleMouseMove}
            ref="dragPanel"
            style={{"cursor": this.state.cursor}}
                >{this.props.children}</div>)
    }
}
