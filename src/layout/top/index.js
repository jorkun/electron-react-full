/**
 * @Author: Zhao Kunkun
 * @Date: 2019-09-27 17:24:09
 * @Last Modified by: Zhao Kunkun
 * @Last Modified time: 2019-11-18 17:58:38
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {JRImage} from 'Jrui';
import {setWinMaximizeOrMiximizeFn} from 'Store/layout/action';
import './index.less';
import {remote} from 'electron';
import getMultiLang from 'Pub/js/getMultiLang';
const TopMsg = getMultiLang('layout').top;
class TopLayout extends Component {
    constructor(props) {
        super(props);
    }
    handleWindow(type) {
        let win = remote.getCurrentWindow();
        switch(type) {
            case 'minimize':
                win.minimize()
                break
            case 'maximize':
                this.changeMaxiOrBackend();
                break
            case 'fullScreen':
                win.setFullScreen(!win.isFullScreen())
                break
            case 'close':
                win.close()
                break
        }
    }
    changeMaxiOrBackend() {
        let win = remote.getCurrentWindow();
        if(win.isMaximized()) {
            win.unmaximize();
            this.props.setWinMaximizeOrMiximizeFn(false);
        } else {
            this.props.setWinMaximizeOrMiximizeFn(true);
            win.maximize()
        }
    }
    render() {
        let {isMaximized, hasMix=true} = this.props;
        return (
        <article className="cbpc-top">
            <section className="title">{TopMsg['title']}</section>
            <section className="action">
                <JRImage source="font" type="minus"
                    title={TopMsg['minimize']}
                    onClick={this.handleWindow.bind(this, 'minimize')}
                />
                {hasMix &&
                <JRImage source="font" type={isMaximized ? 'switcher' : 'border'}
                    title={TopMsg[isMaximized ? 'tobottom' : 'maximize']}
                    onClick={this.handleWindow.bind(this, 'maximize')}
                />}
                <JRImage source="font" type="close"
                    className="close"
                    title={TopMsg['close']}
                    onClick={this.handleWindow.bind(this, 'close')}
                />
            </section>
        </article>);
    }
}
TopLayout.propTypes = {
    setWinMaximizeOrMiximizeFn: PropTypes.func.isRequired
};
const mapStateToProps = (state) => ({isMaximized: state.layoutData.isMaximized});

export default connect(mapStateToProps,
    {setWinMaximizeOrMiximizeFn})(TopLayout);