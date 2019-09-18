/*
 * @Author: Zhao Kunkun
 * @Date: 2019-03-07 14:42:27
 * @Last Modified by: Zhao kunkun
 * @Last Modified time: 2019-03-07 14:43:38
 */
import { Modal } from "antd";
const JRConfirmbox = (props) => {
    try {
        return Modal[props.type](Object.assign({}, props, { wrapClassName: "jupiter-confirm-box" }));
    } catch (error) {
        return Modal.info({
            title: "信息提示",
            content: "组件参数有误，请检查！",
            wrapClassName: "jupiter-confirm-box"
        });
    }
}
export default JRConfirmbox;