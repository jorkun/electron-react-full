/*
 * @Author: Zhao Kunkun
 * @Date: 2019-03-07 14:42:27
 * @Last Modified by: Zhao kunkun
 * @Last Modified time: 2019-03-16 16:09:26
 */
import React, { Component } from "react";

import "jrui/index.scss";
const Event = {};
Event.addEvents = function (target, eventType, handle) {
    if (!target) return;
    if (document.addEventListener) {
        Event.addEvents = function (target, eventType, handle) {
            target.addEventListener(eventType, handle, false);
        };
    } else {
        Event.addEvents = function (target, eventType, handle) {
            target.attachEvent("on" + eventType, function () {
                handle.call(target, arguments);
            });
        };

    }
    Event.addEvents(target, eventType, handle);
}

Event.removeEvents = function (target, eventType, handle) {
    if (!target) return;
    if (document.removeEventListener) {
        Event.removeEvents = function (target, eventType, handle) {
            target.removeEventListener(eventType, handle);
        };
    } else {
        Event.removeEvents = function (target, eventType, handle) {
            target.detachEvent("on" + eventType, handle);
        };

    }
    Event.removeEvents(target, eventType, handle);
}
class JRContextmenu extends Component {

    static defaultProps = {
        style: {}
    }
    state = {
        visible: false
    }

    componentDidMount() {
        // 添加右键点击、点击事件监听
        this.target && Event.addEvents(this.target, "contextmenu", this.handleContextMenu);
        Event.addEvents(document, "click", this.handleClick);
        Event.addEvents(document, "scroll", this.handleScroll);
    }

    componentWillUnmount() {
        // 移除事件监听
        this.target && Event.removeEvents(this.target, "contextmenu", this.handleContextMenu);
        Event.removeEvents(document, "click", this.handleClick);
        Event.removeEvents(document, "scroll", this.handleScroll);
    }

    // 右键菜单事件
    handleContextMenu = (event) => {
        event.preventDefault()

        this.setState({ visible: true })

        // clientX/Y 获取到的是触发点相对于浏览器可视区域左上角距离
        const clickX = event.clientX
        const clickY = event.clientY
        // window.innerWidth/innerHeight 获取的是当前浏览器窗口的视口宽度/高度
        const screenW = window.innerWidth
        const screenH = window.innerHeight
        // 获取自定义菜单的宽度/高度
        const rootW = this.root.offsetWidth
        const rootH = this.root.offsetHeight

        // right为true，说明鼠标点击的位置到浏览器的右边界的宽度可以放下菜单。否则，菜单放到左边。
        // bottom为true，说明鼠标点击位置到浏览器的下边界的高度可以放下菜单。否则，菜单放到上边。
        const right = (screenW - clickX) > rootW
        const left = !right
        const bottom = (screenH - clickY) > rootH
        const top = !bottom

        if (right) {
            this.root.style.left = `${clickX}px`
        }

        if (left) {
            this.root.style.left = `${clickX - rootW}px`
        }

        if (bottom) {
            this.root.style.top = `${clickY}px`
        }
        if (top) {
            this.root.style.top = `${clickY - rootH}px`
        }
    };

    // 鼠标单击事件，当鼠标在任何地方单击时，设置菜单不显示
    handleClick = (event) => {
        const { visible } = this.state;
        const wasOutside = !(event.target && event.target.contains === this.root);

        if (wasOutside && visible) this.setState({ visible: false });
    };

    handleScroll = () => {
        const { visible } = this.state;
        if (visible) this.setState({ visible: false });
    };


    render() {
        let { style = {}, menu } = this.props;
        const wrapStyles = Object.assign({}, style)
        const { visible } = this.state;
        return (
            <div className="jupiter-contextmenu-container" style={wrapStyles}>
                <span ref={(ref) => { this.target = ref }}
                    className="jupiter-contextmenu-target"
                >{this.props.children}</span>
                {visible &&
                    <div ref={(ref) => { this.root = ref }} className="jupiter-contextmenu">
                        <ul>
                            {menu}
                        </ul>
                    </div>}
            </div>
        )
    }
}

export default JRContextmenu;