import React, { Component } from "react";
import { Menu } from "antd";
import JRContextmenu from "./index";
import { JRMessagebox } from "jrui";
import COMMON_CONSTANTS from "utils/constants";
const SubMenu = Menu.SubMenu;
class JRContextmenuDemo extends Component {
    render() {
        const menu = (
            <Menu>
                <Menu.Item onClick={() => {
                    JRMessagebox("success", "导出");
                }}
                >导出</Menu.Item>
                <Menu.Item onClick={() => {
                    JRMessagebox("success", COMMON_CONSTANTS.DELETE_SUCCESS_TEXT);
                }}
                >删除</Menu.Item>
                <SubMenu title="更多">
                    <Menu.Item onClick={() => {
                        JRMessagebox("success", "查看");
                    }}
                    >查看</Menu.Item>
                </SubMenu>
                <SubMenu title="禁用菜单" disabled>
                    <Menu.Item>授权</Menu.Item>
                </SubMenu>
            </Menu>
        );
        return (<section>
            <JRContextmenu menu={menu}>
                <span className="contextmenu-demo">右键点击</span>
            </JRContextmenu>
        </section>);
    }
}

export default JRContextmenuDemo;