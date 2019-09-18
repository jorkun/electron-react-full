/*
 * @Author: Zhao kunkun
 * @Date: 2018-11-27 16:48:34
 * @Last Modified by: Zhao Kunkun
 * @Last Modified time: 2019-06-05 16:29:57
 */
import React from "react";
import { Layout, Anchor, Icon } from "antd";
// import Info from "./introduction";
import GetPage from "components/loadable/index";
const { Link } = Anchor;
const { Sider, Content } = Layout;

import "./index.scss";

export default class UIDoc extends React.Component {
    state = {
        collapsed: false,
        content: "",
        keys: [],
        title: "UI组件说明文档",
        openKeys: [""],
        linkList: [{
            name: "",
            text: "资金系统控件",
            children: [{
                name: "amountbox",
                text: "JRAmountInput 金额输入框"
            }, {
                name: "ratebox",
                text: "JRRatebox 利率输入框"
            }, {
                name: "ten-thousand-input",
                text: "JRTenThousandbox 万元输入框"
            }, {
                name: "hundred-million-input",
                text: "JRHundredMillionInput 亿元输入框"
            }, {
                name: "bandbox",
                text: "JRBandbox 组合选择框"
            }, {
                name: "rich-editor",
                text: "JRRichEditor 富文本编辑器"
            }, {
                name: "contextmenu",
                text: "JRContextmenu 右键菜单"
            }, {
                name: "code-editor",
                text: "JRCodeEditor 代码着色"
            }]
        }]
    };
    componentDidMount() {
        this.init();
    }
    init =()=>{
        let Comp = GetPage(() => import("jrui/amountbox/demo.jsx"));
        this.setState({
            content: <Comp />
        })
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }
    onSelect = (e) => {
        this.setState({
            keys: [e.key],
            title: e.item.props.text
        });
    }

    onOpen = (openKeys) => {
        this.setState({
            openKeys
        });
    }
    scrollToAnchor = (e, link) => {
        e.preventDefault();
        let anchorName = link.href;
        if (anchorName) {
            // 找到锚点
            // let anchorElement = document.getElementById(anchorName);
            // // 如果对应id的锚点存在，就跳转到锚点
            // if (anchorElement) { anchorElement.scrollIntoView(); }
            let Comp = GetPage(() => import(`jrui/${anchorName}/demo.jsx`));
            this.setState({
                content: <Comp />
            })
        }
    }
    generaLinkDom = (linkList) => {

        return linkList.map(mn => {
            if (!mn.children || !mn.children.length) {
                return (
                    <Link
                        key={mn.name}
                        // href="javascript:void(0);"
                        href={mn.name}
                        title={mn.text}
                    />)
            } else {
                return (
                    <Link key={mn.name}
                        href={mn.name}
                        // href="javascript:void(0);"
                        title={<span>{mn.text}</span>}
                    >{this.generaLinkDom(mn.children)}</Link>
                )
            }
        });
    }
    render() {
        const { collapsed, linkList = [] } = this.state;
        return (
            <Layout className="ui-introduction">
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                    theme="light"
                >
                    <div className="logo">
                        <Icon type="read" />UI组件说明文档
                    </div>
                    <Anchor onClick={this.scrollToAnchor}>
                        {this.generaLinkDom(linkList)}
                    </Anchor>
                </Sider>
                <Layout>
                    <Content>
                        <div className="ui-test-container">
                            <h3>组件测试：</h3>
                            {this.state.content}
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}
