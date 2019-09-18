/*
 * @Author: Zhao Kunkun
 * @Date: 2019-03-07 14:42:27
 * @Last Modified by: Zhao kunkun
 * @Last Modified time: 2019-03-12 17:48:06
 */
import { message } from "antd";
import "jrui/index.scss";
message.config({
    duration: 2,
    maxCount: 1,
    top: 80,
    prefixCls: "jupiter-messagebox"
});
const JRMessageBox = (type = "info", msg = "服务异常") => {
    message[type](msg);
};

export default JRMessageBox;