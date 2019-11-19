/*
 * @Author: Zhao Kunkun
 * @Date: 2019-03-11 11:58:40
 * @Last Modified by: zhangliming
 * @Last Modified time: 2019-08-29 10:03:55
 */
import React from "react"
import { Modal } from "antd"
import JRImage from "../image"
import JRIcon from "../icon"
import CfgRulesModal from "./config/rules"
import "jrui/index.scss"
import { isNull } from "util"
// import { url } from "inspector";
const MIN_HEIGHT = 300
class JRModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isShowCfgRulesModal: false,
            domHeight: Math.max(MIN_HEIGHT, document.body.clientHeight)
        }
        this.hasMounted = false
    }
    componentDidMount() {
        this.listenHeightChange()
        this.hasMounted = true
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.visible) {
            this.hasMounted = true
            this.listenHeightChange()
        }
    }
    componentWillUnmount() {
        this.hasMounted = false
        this.unlistenHeightChange()
    }
    listenHeightChange() {
        window.addEventListener("resize", () => {
            let domHeight = Math.max(MIN_HEIGHT, document.body.clientHeight)
            this.hasMounted && this.setState({ domHeight })
        })
    }
    unlistenHeightChange() {
        window.removeEventListener("resize", () => {})
    }
    handleAfterClose() {
        this.hasMounted = false
        this.unlistenHeightChange()
    }
    openCfgRuleModal() {
        this.setState({ isShowCfgRulesModal: true })
    }
    //最大化功能
    maxView = () => {
        let jupiterModal = this.refs["platform-modal-content"].parentNode.parentNode.parentNode
        let classNames = jupiterModal.getAttribute("class")
        if (classNames.endsWith("maxView") && classNames.includes("maxView")) {
            jupiterModal.classList.remove("maxView");
        } else {
            jupiterModal.classList.add("maxView")
        }
        this.setState({
            message:"zlm"
        })
    }
    //验证是否已是最大化
    classNameFunction = () => {
        if (!this.refs["platform-modal-content"]) {
            return false
        } else {
            let jupiterModal = this.refs["platform-modal-content"].parentNode.parentNode.parentNode;
            let classNames = jupiterModal.getAttribute("class")
            if (classNames.includes("maxView")) {
                return true
            } else {
                return false
            }
        }
    }
    render() {
        const isAdmin = [ "padmin", "admin" ].includes(window.sessionStorage.userid)
        let { domHeight, isShowCfgRulesModal } = this.state
        let {
            className,
            cancelText,
            okText,
            footer,
            onCancel,
            title,
            onOk,
            visible,
            confirmLoading,
            ruleData,
            formID,
            maxView = true, //是否有最大化图标
            size = "normal",
            height = 0 //,
            // centered = false
        } = this.props
        let width
        switch (size) {
            case "full":
                width = "90%"
                break
            case "large":
                width = "70%"
                break
            case "small":
                width = "35%"
                break
            case "normal":
            default:
                width = "50%"
                break
        }
        return (
            <Modal
                cancelText={cancelText}
                className={className + " jupiter-modal"}
                confirmLoading={confirmLoading}
                maskClosable={false}
                okText={okText}
                onCancel={onCancel}
                getContainer={() => document.querySelector(".zj-dashboard") || document.getElementById("root")}
                onOk={onOk}
                title={[
                    title,
                    formID &&
                    isAdmin && (
                        <JRImage
                            key="2"
                            source="font"
                            title="脚本配置"
                            type="tool"
                            onClick={this.openCfgRuleModal.bind(this)}
                            style={{
                                float: "right",
                                marginRight: 15,
                                marginTop: 7,
                                width: 35,
                                borderRight: "1px solid #ccc",
                                cursor: "pointer",
                                color: "rgba(0, 0, 0, 0.45)",
                                fontSize: 14,
                                zIndex: 1
                            }}
                        />
                    ),
                    maxView && (
                        <img
                            className="jupiter-modal-img"
                            src={
                                this.classNameFunction() ? (
                                    require("resources/images/minView.svg")
                                ) : (
                                    require("resources/images/maxView.svg")
                                )
                            }
                            onClick={this.maxView.bind(this)}
                            title={this.classNameFunction() ? "还原" : "最大化"}
                        />
                    )
                ]}
                footer={footer}
                visible={visible}
                width={width}
                // centered={centered}
                centered={true}
                destroyOnClose={true}
                afterClose={this.handleAfterClose.bind(this)}
            >
                {formID &&
                isAdmin && (
                    <CfgRulesModal
                        visible={isShowCfgRulesModal}
                        data={ruleData}
                        formID={formID}
                        closeModal={() => {
                            this.setState({
                                isShowCfgRulesModal: false
                            })
                        }}
                    />
                )}
                <div
                    className="platform-modal-content"
                    style={{
                        height: !this.classNameFunction()
                            ? height ? height : domHeight - (isNull(footer) ? 120 : 200)
                            : document.querySelector(".jupiter-modal") &&
                              document.querySelector(".jupiter-modal").offsetHeight - (isNull(footer) ? 50 : 110)
                    }}
                    ref="platform-modal-content"
                >
                    {this.props.children}
                </div>
            </Modal>
        )
    }
}

export default JRModal
