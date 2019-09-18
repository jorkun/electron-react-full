/**
 * @Author: Zhao Kunkun
 * @Date: 2019-06-25 16:29:21
 * @Last Modified by: Zhao Kunkun
 * @Last Modified time: 2019-07-23 17:37:52
 */

import React, { Component } from "react";
import {JRModal, JRMessagebox, JRCodeEditor, JRRadioGroup, JRButton, JRImage} from "jrui"
import InitialMessage from "utils/intl";
import * as API from "./formdata-validation-api";
import {ConvertDictToData} from "utils/common";
import "./index.scss";
class FormdataValidationUpdateForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            data: {},
            effectflagList: [],
            tmEffectflag: "",
            scripttext: ""
        }
        this.isAdd = true;
    }
    componentWillReceiveProps(nextProps) {
        let { visible} = nextProps;
        if (visible !== this.state.visible) {
            this.setState({
                visible
            });
            visible && this.getComboxList();
        }
    }
    async getComboxList() {
        let self = this;
        Promise.all([
            API.GetComboxList("EFFECTTYPE"), // 数据状态
            API.GetConfigData(self.props.formID)
        ]).then((values) => {
            let data = values[1] || {};
            self.isAdd = !data.id;
            self.setState({
                effectflagList: ConvertDictToData(values[0] || []),
                data: values[1] || {},
                scripttext: data.scripttext || "",
                tmEffectflag: data.tmEffectflag || "E"
            });
        }).catch(err => {
            console.log(err);
        });
    }
    handleOk() {
        let {data = {}, tmEffectflag, scripttext} = this.state;
        let {formID:id} = this.props;
        API.SaveData(this.isAdd, Object.assign({detailList: []}, data, {tmEffectflag, scripttext, scriptname: id, id}), (isSuccess) => {
            if (isSuccess) {
                JRMessagebox("success", "配置成功");
                self.handleCancel(true);
            }
        });
    }
    handleCancel(isSuccess) {
        this.setState({
            data: {},
            tmEffectflag: "",
            scripttext: ""
        });
        this.props.closeModal(isSuccess);
    }
    handleChange(field, value) {
        this.setState({
            [field]: value
        });
    }

    render() {
        const {
            visible,
            effectflagList,
            data={}
        } = this.state;
        let {formID } = this.props;
        return (
            <JRModal
                className="script-modal"
                okText={InitialMessage("common.system.submittext")}
                onCancel={this.handleCancel.bind(this, false)}
                title={"自定义脚本配置"}
                visible={visible}
                footer={null}
                size="full"
            >
                <section className="script-editor-header">
                    <label>脚本编号: </label><span>{data.id || formID}</span>
                    <span className="divider-vertical">|</span>
                    <label>脚本状态: </label>
                    <JRRadioGroup options={effectflagList}
                        onChange={this.handleChange.bind(this, "tmEffectflag")}
                        defaultValue={data.tmEffectflag || "E"}
                    />
                    <span className="divider-vertical">|</span>
                    <JRButton type="primary" className="save-btn"
                        onClick={this.handleOk.bind(this)}
                        title="保存"
                    ><JRImage source="font" type="save"/></JRButton>
                </section>
                <JRCodeEditor
                    maxLength={5000}
                    value={this.state.scripttext}
                    className="script-editor-body"
                    onChange={this.handleChange.bind(this, "scripttext")}
                    funcList={[{
                        text: "基本设置",
                        value: "common",
                        children: [{
                            text: "setInitialValue(设置默认值)",
                            value: "FormDataValidationUtils.setInitialValue('', '');"
                        }, {
                            text: "setDisabled(设置置灰)",
                            value: "FormDataValidationUtils.setDisabled('');"
                        }, {
                            text: "cancelDisabled(取消置灰)",
                            value: "FormDataValidationUtils.cancelDisabled('');"
                        }, {
                            text: "setHidden(设置隐藏)",
                            value: "FormDataValidationUtils.setHidden('');"
                        }, {
                            text: "cancelHidden(取消隐藏)",
                            value: "FormDataValidationUtils.cancelHidden('');"
                        }, {
                            text: "setRequired(设置必填)",
                            value: "FormDataValidationUtils.setRequired('');"
                        }]
                    }, {
                        text: "其他",
                        value: "other",
                        children: [{
                            text: "getParam(获取请求参数值)",
                            value: "def params = FormDataValidationUtils.getParam('');"
                        }]
                    }]}
                />
            </JRModal>
        );
    }
}
export default FormdataValidationUpdateForm;