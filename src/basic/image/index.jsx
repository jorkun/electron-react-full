/*
 * @Author: Zhao Kunkun
 * @Date: 2019-03-07 14:42:27
 * @Last Modified by: Zhao kunkun
 * @Last Modified time: 2019-03-16 16:09:48
 */
import React from "react";
import { Icon } from "antd";
const JRImage = (props) => {
    return (props.source === "font" ?
        <Icon {...props} className="jupiter-image source-font" /> :
        <img {...props} alt=""
            className="jupiter-image source-link"
        />);
}
export default JRImage;