/*
 * @Author: Zhao Kunkun
 * @Date: 2019-03-07 14:42:27
 * @Last Modified by: Zhao kunkun
 * @Last Modified time: 2019-03-13 16:03:47
 */
import React from "react";
import { Tabs } from "antd";
const TabPane = Tabs.TabPane;
const generatePanes = (data) => {
    if (!data || !data.length) return [];
    return data.map(p => {
        return <TabPane tab={p.title} key={p.key}>{p.content}</TabPane>;
    })
}
const JRTabbox = (props) => {
    let panes = generatePanes(props.panes);
    return (<Tabs {...props} className="jupiter-tabbox">
        {panes}
    </Tabs>)
}
export default JRTabbox;