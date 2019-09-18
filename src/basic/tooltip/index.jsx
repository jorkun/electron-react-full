/*
 * @Author: Zhao Kunkun
 * @Date: 2019-03-07 14:42:27
 * @Last Modified by: Zhao kunkun
 * @Last Modified time: 2019-03-15 14:57:05
 */
import React from "react";
import { Tooltip } from "antd";
import "jrui/index.scss";
const JRTooltip = (props) => {
    return <Tooltip className="jupiter-tooltip" {...props}>{props.children}</Tooltip>
}
export default JRTooltip;