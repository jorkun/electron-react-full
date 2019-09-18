/*
 * @Author: Zhao Kunkun
 * @Date: 2019-03-07 14:42:27
 * @Last Modified by: Zhao kunkun
 * @Last Modified time: 2019-03-26 17:24:34
 */
import React, {Component} from "react";
import { Input } from "antd";

class JRMultitextbox extends Component {
    constructor(props) {
        super(props);
        this.state = { count: props.value ? props.value.length : 0 }
    }
    //WARNING! To be deprecated in React v17. Use new lifecycle static getDerivedStateFromProps instead.
    componentWillReceiveProps(nextProps) {
        let {value} = nextProps;
        if(value && value.length != this.state.count) {
            this.setState({
                count: value.length
            });
        }
    }
    onChange = (e) => {
        let v = e.target.value;
        this.setState({
            count: v.length
        });
        this.props.onChange && this.props.onChange(v);
    }
    render() {
        let tProps = Object.assign({}, {
            autosize: { minRows: 2, maxRows: 6 }
        }, this.props);
        let { maxLength } = this.props;
        return (<span className="jupiter-multitextbox">
            <Input.TextArea {...tProps} onChange={this.onChange} />
            {maxLength && <span className="count">{this.state.count || 0} / {maxLength}</span>}
        </span>)
    }
}

export default JRMultitextbox;