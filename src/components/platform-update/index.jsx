/**
 * @Author: Zhao Kunkun
 * @Date: 2019-10-23 10:30:42
 * @Last Modified by: Zhao Kunkun
 * @Last Modified time: 2019-10-23 14:26:09
 */
import React, { Component } from 'react';
import {JRModal, JRProgressmeter} from 'Jrui';
import {ipcRenderer} from 'electron';
class PlatformUpdateModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogVisible: false,
            showClose: false,
            percentage: 0,
            strokeWidth: 200
        }
    }
    componentDidMount() {
        let _this = this;
        //接收主进程版本更新消息
        ipcRenderer.on('message', (event, arg) => {
            // for (var i = 0; i < arg.length; i++) {
            // console.log(arg);
            if('update-available' == arg.cmd) {
                //显示升级对话框
                _this.setState({dialogVisible: true});
            } else if('download-progress' == arg.cmd) {
                //更新升级进度
                /**
                 *
                 * message{bytesPerSecond: 47673
                  delta: 48960
                  percent: 0.11438799862426002
                  total: 42801693
                  transferred: 48960
                  }
                 */
                // console.log(arg.message.percent);
                let percent = Math.round(parseFloat(arg.message.percent));
                _this.setState({percentage: percent});
            } else if('error' == arg.cmd) {
                _this.setState({dialogVisible: false});
                // _this.$message('更新失败');
            }
            // }
        });
        //20秒后开始检测新版本
        this.timeOut = window.setTimeout(() => {
            ipcRenderer.send('checkForUpdate');
        }, 20000);
        //间隔1小时检测一次
        this.interval = window.setInterval(() => {
            ipcRenderer.send('checkForUpdate');
        }, 3600000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
        clearInterval(this.timeOut);
    }
    handleCancel() {
        this.setState({
            dialogVisible: false
        })
    }
    render() {
        return (
        <JRModal
            onCancel={this.handleCancel.bind(this)}
            visible={this.state.dialogVisible}
            size="small"
            title={'正在下载更新'}
            footer={null}
        >
            <p />
            <JRProgressmeter percent={this.state.percentage} status="active"/>
        </JRModal>);
    }
}

export default PlatformUpdateModal;