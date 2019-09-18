/*
 * @Author: Zhao Kunkun
 * @Date: 2019-03-07 14:42:27
 * @Last Modified by: zhangliming
 * @Last Modified time: 2019-07-26 16:36:58
 */
import { notification } from "antd"
const JRNotification = (props = {}) => {
    notification.config({
        placement: props.placement || "topRight",
        className: "jupiter-notification"
    })
    let tProps = Object.assign(
        {},
        {
            message: props.message,
            description: props.description
        },
        props
    )
    return notification[props.type || "info"](tProps)
}
export default JRNotification
