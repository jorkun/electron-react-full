/**
 * @Author: Zhao Kunkun
 * @Date: 2019-06-13 15:37:55
 * @Last Modified by: Zhao Kunkun
 * @Last Modified time: 2019-07-01 15:44:35
 */
import React, {Component} from "react";
// import JRButton from "../button";
import { Steps } from "antd";
const { Step } = Steps;
export default class JRSteps extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: props.current,
            steps: props.steps || []
        };
    }
    componentWillReceiveProps(nextProps) {
        let {current: ncurrent, steps=[]} = nextProps;
        if(ncurrent != this.state.current && ncurrent >= 0 && ncurrent < steps.length) {
            this.setState({current: ncurrent});
        }
    }
    next() {
        const current = this.state.current + 1;
        this.setState({ current });
    }
    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }
    render() {
        const {current, steps=[] } = this.state;
        if(!steps || !steps.length) return null;
        return (
            <div className="jupiter-steps" style={{padding: "20px 0"}}>
                <Steps current={current}>
                    {steps.map(item => (
                        <Step key={item.title} title={item.title} />
                    ))}
                </Steps>
                {/* <div className="steps-content" >{steps[current] ? steps[current].content : ""}</div> */}
                {/* <div className="steps-action">
                    {current < steps.length - 1 && (
                        <JRButton type="primary" onClick={() => this.next()}>
                            下一步
                        </JRButton>
                    )}
                    {current === steps.length - 1 && (
                        <JRButton type="primary" onClick={this.props.onOk && this.props.onOk()}>
                            完成
                        </JRButton>
                    )}
                    {current > 0 && (
                        <JRButton style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                            上一步
                        </JRButton>
                    )}
                </div> */}
            </div>
        );
    }
}