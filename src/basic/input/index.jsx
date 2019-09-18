/**
 * @Author: Zhao Kunkun
 * @Date: 2019-05-05 10:33:38
 * @Last Modified by: Zhao Kunkun
 * @Last Modified time: 2019-07-20 17:27:06
 */
import React from "react";
import {Input} from "antd";
import "jrui/index.scss";
const FORMAT = [ // 默认几种数据格式
    "#,###",// 长/短整型输入控件
    "#,###.00",// 金额输入控件
    "#,###.0000",// 万元/期限/利率输入控件
    "#,###.000000000000"// 单价输入控件
];
import ThemeContext from "../context"
class JRInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            initialValue: ""
        }
    }
    componentDidMount() {
        this.setValue(this.props.value)
    }
    componentWillReceiveProps(nextProps) {
        if(this.state.initialValue != nextProps.value) {
            this.setStateAsync({
                initialValue: nextProps.value
            });
            this.setValue(nextProps.value);
        }
    }
    setStateAsync(state) {
        let self = this;
        return new Promise((resolve) => {
            self.setState(state, resolve);
        })
    }
    numberFormat = (num, decimal = 0) => {
        let v = num + "";
        let deci = "";
        if(v.includes(",")) v = v.replace(/,/g, "");

        if(v.includes(".")) {
            let sp = v.split(".");
            v = sp[0];
            deci = decimal > 0 ? parseFloat("." + sp[1]).toFixed(decimal).substring(1) : "";
        } else if(decimal > 0) {
            deci = ".0".padEnd(decimal + 1, "0");
        }
        return v ? v.replace(/(?=(\B\d{3})+$)/g, ",") + (decimal > 0 ? deci : "") : v;
    }
    convertValue = (value) => {
        const {format} = this.props;
        if(value === "" || value === null || value === "null" || value === "undefined" || value === undefined) {
            value = 0;
        }
        let retvalue = value;
        // if (FORMAT.includes(format)) {
        //     retvalue = this.numberFormat(value) || 0;
        // }
        switch(format) {
            case FORMAT[0]:
                retvalue = this.numberFormat(value, 0) || 0;
                break;
            case FORMAT[1]:
                retvalue = this.numberFormat(value, 2) || 0;
                break;
            case FORMAT[2]:
                retvalue = this.numberFormat(value, 4) || 0;
                break;
            case FORMAT[3]:
                retvalue = this.numberFormat(value, 12) || 0;
                break;
            default:
                break;
        }
        return retvalue;
    }
    setValue = (value) => {
        let isNumber = FORMAT.includes(this.props.format);
        if(isNumber) {
            // if (!isNaN(value) && /^(-?\d+)(\.\d+)?$/.test(value) || value === "") {
            let retv = this.convertValue(isNaN(value) ? 0 : value);
            this.setStateAsync({
                value: retv
            });
            this.props.onChange && this.props.onChange(Number(value));
            // }
        } else {
            this.setStateAsync({
                value
            });
            this.props.onChange && this.props.onChange(value);
        }
    }
    //求和
    sum = (arr) => {
        return arr.reduce(function(total, currentValue) {
            return total + currentValue.crLimit
        }, 0)
    }
    handleInputBlur = (e) => {
        let {value: v} = e.target;
        let value = v;
        if(v) {
            if(v.toString().endsWith("w") || v.toString().endsWith("W")) {
                value = parseFloat(v) * 10000;
            } else if(v.toString().endsWith("E") || v.toString().endsWith("e")) {
                value = parseFloat(v) * 100000000;
            } else {
                value = parseFloat(v);
            }
            //特殊处理：用于判断授信额度与明细额度总和的关系，超出的部分赋差值
            if (this.context && this.context.data && this.context.data.systemDatas == "1") {
                let { dataList, crCkamount } = this.context.data
                let index = this.context.index
                dataList.map((item, i) => {
                    if (i == index) item.crLimit = value*10000
                })
                let num = this.sum(dataList)
                if (num > crCkamount) {
                    value = crCkamount / 10000 - (num / 10000 - value) //赋差值，即
                }
            }
        }
        this.setValue(value);
    }
    handleInputFocus = (e) => {
        let {value} = e.target;
        this.setStateAsync({
            value: value.replace(/,/g, "")
        });
    }
    handleInputChange = (e) => {
        let {value} = e.target;
        let isNumber = FORMAT.includes(this.props.format);
        if(isNumber) {
            if(/^(-?\d+)(\.)?(\d+)?(w|W|e|E)?$/.test(value) || value === "" || value === "-") {
                this.setStateAsync({
                    value
                })
            }
        } else {
            this.setStateAsync({
                value
            })
        }

    }
    render() {
        let {align, type, maxLength} = this.props;
        let wrapperClassName = "jupiter-input";
        let tProps = Object.assign({}, this.props, {
            type: type,
            onChange: this.handleInputChange,
            onFocus: this.handleInputFocus,
            onBlur: this.handleInputBlur,
            maxLength,
            className: `${wrapperClassName} text-${align}`,
            value: this.state.value
        });
        return <ThemeContext.Consumer>{() => <Input {...tProps} />}</ThemeContext.Consumer>
    }
}
JRInput.contextType = ThemeContext
export default JRInput
