import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Form, Input, Button } from "antd";
const FormItem = Form.Item;
import Ajax from "Pub/js/ajax";
import _ from "lodash";
import { updateGroupList, setUpdateHomePageFun } from "Store/home/action";
function noop() {
    return false;
}
class LoginFormContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginError: null,
            isSubmitting: false
        };
    }
    handleSubmit(e) {
        this.setState({
            loginError: ""
        });
        e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
                return;
            }
            if (this.state.isSubmitting) return;
            this.toLogin(values);
        });
    }
    async toLogin(params) {
        // try {
        //     this.setState({
        //         isSubmitting: true
        //     });
        //     let data = await API.ToLogin({
        //         userid: params.userid,
        //         password: Base64Encode(params.password)
        //     });
        //     if (data && typeof data !="string") {
        //         data.modules && window.sessionStorage.setItem("menu", JSON.stringify(data.modules));
        //         window.sessionStorage.setItem("token", data.token);
        //         window.sessionStorage.setItem("orgid", data.orgid);
        //         window.sessionStorage.setItem("username", data.username);
        //         let permits = data.permits;
        //         if (!permits.length) {
        //             this.setState({
        //                 loginError: InitialMessage("loginpage.validator.noauth"),
        //                 isSubmitting: false
        //             });
        //             return;
        //         }
        //         // if (
        //         //     this.props.type === "againLogin" &&
        //         //     this.props.closeModal &&
        //         //     typeof this.props.closeModal === "function"
        //         // ) {
        //         //     this.props.closeModal()
        //         //     return
        //         // }
        //         window.sessionStorage.setItem("systemList", JSON.stringify(permits));
        //         // if(!data.checkedSystem && permits.length > 1) {
        //         if(permits.length > 1) {
        //                 history.push("/system");
        //                 window.sessionStorage.setItem("userid", data.userid);
        //         } else {
        //             let toSystem = data.checkedSystem || permits[0];
        //             toSystem && window.sessionStorage.setItem("currentSystem", JSON.stringify(toSystem));

        //             this.switchSystem(toSystem.sysId);
        //         }
        //     } else {
        //         this.setState({
        //             loginError: data || InitialMessage("loginpage.validator.error"),
        //             isSubmitting: false
        //         });
        //     }
        // } catch (error) {
        //     this.setState({
        //         loginError: InitialMessage("common.system.error"),
        //         isSubmitting: false
        //     });
        //     console.log(InitialMessage("loginpage.login.error"), error);
        // }
    }
    async switchSystem(sysId) {
        let data = await API.SwitchSystem(sysId);
        if (data && data.modules) {
            window.sessionStorage.setItem("menu", JSON.stringify(data.modules));
            history.push(Paths()[sysId] || "/undefined");
            // MessageBox("success", InitialMessage("loginpage.login.success"));
        } else {
            this.setState({
                // loginError: InitialMessage("common.system.error"),
                isSubmitting: false
            });
        }
    }
    handleReset() {
        this.props.form.resetFields();
        this.setState({
            loginError: ""
        });
    }
    handleChange() {
        this.setState({
            loginError: null
        });
    }
    render() {
        const { getFieldProps, isFieldValidating, getFieldError } = this.props.form;
        const nameProps = getFieldProps("userid", {
            rules: [
                {required: true, message: "用户" }
            ]
        });
        const passwdProps = getFieldProps("password", {
            rules: [
                {required: true, message: "密码" }
            ]
        });
        return (
            <Form layout="horizontal" >
                <FormItem><h3>账号登陆设置</h3></FormItem>
                <FormItem
                    help={isFieldValidating("userid") ? "" : (getFieldError("userid") || []).join(", ")}
                >
                    <Input {...nameProps}
                        autoComplete="off"
                        placeholder={"用户名"}
                        onPressEnter={this.handleSubmit.bind(this)}
                        prefix={
                            <i class="iconfont icon-yonghu1"></i>
                        }
                    />
                </FormItem>
                <FormItem >
                    <Input {...passwdProps}
                        autoComplete="off"
                        onContextMenu={noop}
                        onCopy={noop}
                        onCut={noop}
                        onKeyDown={this.handleChange.bind(this)}
                        onPaste={noop}
                        placeholder={"密码"}
                        onPressEnter={this.handleSubmit.bind(this)}
                        prefix={
                            <i class="iconfont icon-yonghu1"></i>
                        }
                        type="password"
                    />
                </FormItem>
                <Button className="login-btn"
                    htmlType="button"
                    loading={this.state.isSubmitting}
                    onClick={this.handleSubmit.bind(this)}
                    type="primary"
                >登陆</Button>
                {/* {this.props.type == "againLogin" ? null : ( */}
                    <Button className="login-btn"
                        htmlType="button"
                        onClick={this.handleReset.bind(this)}
                        type="primary"
                    >
                        重置
                    </Button>
                {/* )} */}
            </Form>
        );
    }
}

let LoginForm = Form.create()(LoginFormContent);
LoginForm.propTypes = {
    updateGroupList: PropTypes.func.isRequired,
    setUpdateHomePageFun: PropTypes.func.isRequired
};
export default connect(
    state => ({
        groups: state.homeData.groups,
    }),
    {
        updateGroupList,
        setUpdateHomePageFun
    }
)(LoginForm);