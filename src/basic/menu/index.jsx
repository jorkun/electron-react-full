/*
 * @Author: Zhao Kunkun
 * @Date: 2019-03-07 14:42:27
 * @Last Modified by: Zhao Kunkun
 * @Last Modified time: 2019-06-12 10:04:56
 */
import React from "react";
import { Menu } from "antd";
const SubMenu = Menu.SubMenu;
export default class JRMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    generaMenuDom(menuList) {
        if(!menuList || !menuList.length) return [];
        return menuList.map(mn => {
            if (!mn.children || !mn.children.length) {
                return (
                    <Menu.Item
                        key={mn.name}
                        text={mn.text}
                    >{mn.text}</Menu.Item>)
            } else {
                return (
                    <SubMenu key={mn.name}
                        title={mn.text}
                    >{this.generaMenuDom(mn.children)}</SubMenu>
                )
            }
        });
    }
    render() {
        let children = this.generaMenuDom(this.props.data);
        return (
            <Menu {...this.props} className="jupiter-menu">
                {children}
            </Menu>)
    }
}