/*
 * @Author: Zhao Kunkun
 * @Date: 2019-02-27 09:24:43
 * @Last Modified by: Zhao kunkun
 * @Last Modified time: 2019-03-07 11:23:07
 */
import React, { Component } from "react";
import { Row, Col, Table, Button } from "antd";
import JLabel, {
    JRAmountLabel,
    JRDateLabel,
    JRRateLabel,
    JRTenThousandLabel,
    JRDurationLabel,
    JRPriceLabel
} from "ui/JLabel";
import JInput, {
    JRAmountInput,
    JRIntbox,
    JRLongbox,
    JRDurationbox,
    JRPricebox,
    JRRatebox,
    JRTenThousandbox,
    JRTextbox
} from "ui/JInput";
import JDateBox, { JRDatebox } from "ui/JDateBox";
import { JRCombobox } from "ui/JSelect";
import { JRWindow } from "ui/JModal";
const columns = [{
    title: "参数",
    dataIndex: "params"
}, {
    title: "说明",
    dataIndex: "desc"
}, {
    title: "类型",
    dataIndex: "type"
}, {
    title: "默认值",
    dataIndex: "default"
}];
class UIComponents extends Component {
    state = {
        visibleModal: false,
        visibleModal2: false,
        loadingModal: false
    }
    showModal = () => {
        this.setState({
            visibleModal: true
        })
    }
    showModal2 = () => {
        this.setState({
            visibleModal2: true
        })
    }
    handleOk2 = (e) => {
        console.log(e);
        this.setState({
            loadingModal: true
        });
        setTimeout(() => {
            this.setState({
                loadingModal: false,
                visibleModal2: false
            });
        }, 5000);
    }

    handleCancel2 = (e) => {
        console.log(e);
        this.setState({
            visibleModal2: false
        });
    }
    handleOk = (e) => {
        console.log(e);
        this.setState({
            visibleModal: false
        });
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visibleModal: false
        });
    }
    render() {
        return (
            <div className="ui-info">
                <section id="jupiter">
                    <div className="title">介绍</div>
                    <p>
                        这是一套专门为资金平台2.0设计的组件，以第三方组件库Ant Design原有UI组件为基础的再封装，
                        在前端开发中，以平台封装的的组件为主，三方组件为辅进行开发。
                    </p>
                </section>
                <section id="JLabel">
                    <div className="title">JLabel 标签</div>
                    <p>页面或表单显示标签</p>
                    <div className="item-title">何时使用</div>
                    <p>当页面需要显示金额标签、日期标签、利率标签、万元标签、期限标签、单价标签时可使用。</p>
                    <div className="item-title">代码演示</div>
                    <Row gutter={12}>
                        {/* 简单用法 */}
                        <Col span={12}>
                            <div className="code-box">
                                <div className="code-box-demo">
                                    <JLabel value="1234.5" />
                                </div>
                                <div className="code-box-meta">
                                    <div className="code-box-title">基本</div>
                                    <div>
                                        <p>简单用法</p>
                                    </div>
                                </div>
                                <div className="highlight-wrapper">
                                    <div className="highlight">
                                        <pre>
                                            <code>
                                                {`import JLabel from "ui/JLabel";
ReactDOM.render(
    <JLabel value="普通标签" />},
    mountNode
);`}
                                            </code>
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        {/* 金额标签 */}
                        <Col span={12}>
                            <div className="code-box">
                                <div className="code-box-demo">
                                    <JRAmountLabel value="1234.5" />
                                </div>
                                <div className="code-box-meta">
                                    <div className="code-box-title">金额标签</div>
                                    <div>
                                        <p><strong>金额标签控件，格式：#,###.00</strong>，默认右对齐</p>
                                    </div>
                                </div>
                                <div className="highlight-wrapper">
                                    <div className="highlight">
                                        <pre>
                                            <code>
                                                {`import {JRAmountLabel} from "ui/JLabel";
ReactDOM.render(
    <JRAmountLabel value="1234.5" />},
    mountNode
);`}
                                            </code>
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        {/* 利率标签控件 */}
                        <Col span={12}>
                            <div className="code-box">
                                <div className="code-box-demo">
                                    <JRRateLabel value="1234.5" />
                                </div>
                                <div className="code-box-meta">
                                    <div className="code-box-title">利率标签，格式：</div>
                                    <div>
                                        <p><strong>利率标签，格式：#,###.0000%</strong>，默认右对齐</p>
                                    </div>
                                </div>
                                <div className="highlight-wrapper">
                                    <div className="highlight">
                                        <pre>
                                            <code>
                                                {`import {JRRateLabel} from "ui/JLabel";
ReactDOM.render(
    <JRRateLabel value="1234.5" />,
    mountNode
);`}
                                            </code>
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        </Col>

                        {/* 万元标签控件 */}
                        <Col span={12}>
                            <div className="code-box">
                                <div className="code-box-demo">
                                    <JRTenThousandLabel value="1234.5" />
                                </div>
                                <div className="code-box-meta">
                                    <div className="code-box-title">万元标签，格式：</div>
                                    <div>
                                        <p><strong>万元标签，格式：#,###.0000</strong>，默认右对齐</p>
                                    </div>
                                </div>
                                <div className="highlight-wrapper">
                                    <div className="highlight">
                                        <pre>
                                            <code>
                                                {`import {JRTenThousandLabel} from "ui/JLabel";
ReactDOM.render(
    <JRTenThousandLabel value="1234.5" />,
    mountNode
);`}
                                            </code>
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        {/* 期限标签控件 */}
                        <Col span={12}>
                            <div className="code-box">
                                <div className="code-box-demo">
                                    <JRDurationLabel value="1234.5" />
                                </div>
                                <div className="code-box-meta">
                                    <div className="code-box-title">期限标签，格式：</div>
                                    <div>
                                        <p><strong>期限标签，格式：#,###.0000</strong>，默认右对齐</p>
                                    </div>
                                </div>
                                <div className="highlight-wrapper">
                                    <div className="highlight">
                                        <pre>
                                            <code>
                                                {`import {JRDurationLabel} from "ui/JLabel";
ReactDOM.render(
    <JRDurationLabel value="1234.5" />,
    mountNode
);`}
                                            </code>
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        {/* 单价标签 */}
                        <Col span={12}>
                            <div className="code-box">
                                <div className="code-box-demo">
                                    <JRPriceLabel value="1234.5" />
                                </div>
                                <div className="code-box-meta">
                                    <div className="code-box-title">单价标签，格式：</div>
                                    <div>
                                        <p><strong>单价标签，格式：#,###.000000000000</strong>，默认右对齐</p>
                                    </div>
                                </div>
                                <div className="highlight-wrapper">
                                    <div className="highlight">
                                        <pre>
                                            <code>
                                                {`import {JRPriceLabel} from "ui/JLabel";
ReactDOM.render(
    <JRPriceLabel value="1234.5" />,
    mountNode
);`}
                                            </code>
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        {/* 日期标签 */}
                        <Col span={12}>
                            <div className="code-box">
                                <div className="code-box-demo">
                                    <JRDateLabel value={1550818372735} />
                                </div>
                                <div className="code-box-meta">
                                    <div className="code-box-title">日期标签，格式：yyyy</div>
                                    <div>
                                        <p><strong>日期标签，格式：yyyy-MM-dd</strong>，默认左对齐</p>
                                    </div>
                                </div>
                                <div className="highlight-wrapper">
                                    <div className="highlight">
                                        <pre>
                                            <code>
                                                {`import {JRDateLabel} from "ui/JLabel";
ReactDOM.render(
    <JRDateLabel value={1550818372735} />,
    mountNode
);`}
                                            </code>
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <div className="item-title">API</div>
                    <p>
                        除上述几个例子以外，还可以通过设置 JLabel 的属性来产生不同的标签格式。<br />
                        标签的属性说明如下：
                </p>
                    <Table columns={columns}
                        pagination={false}
                        size="middle"
                        rowKey={(r, i) => i}
                        dataSource={[{
                            params: "format",
                            desc: `数据格式设置：【
                            "#,###.00",
                            "#,###.0000",
                            "#,###.0000%",
                            "#,###.000000000000",
                            "yyyy-MM-dd"
                        】`,
                            type: "string",
                            "default": "#,###.00"
                        }, {
                            params: "align",
                            desc: "标签位置：【left|right】",
                            type: "string",
                            "default": "数字格式: right，日期格式默认：left"
                        }, {
                            params: "value",
                            desc: "数值",
                            type: "string | long",
                            "default": "0"
                        }]}
                    />
                </section>
                <section id="JInput">
                    <div className="title">JInput 输入框</div>
                    <p>页面或表单输入框</p>
                    <div className="item-title">何时使用</div>
                    <p>当页面需要输入金额、长/短整型、期限、利率、单价、普通文本等数据时使用。</p>
                    <div className="item-title">代码演示</div>
                    <Row gutter={12}>
                        {/* 简单用法 */}
                        <Col span={12}>
                            <div className="code-box">
                                <div className="code-box-demo">
                                    <JInput />
                                </div>
                                <div className="code-box-meta">
                                    <div className="code-box-title">基本</div>
                                    <div>
                                        <p>简单用法</p>
                                    </div>
                                </div>
                                <div className="highlight-wrapper">
                                    <div className="highlight">
                                        <pre>
                                            <code>
                                                {`import JInput from "ui/JInput";
onChange = (value) => {
    console.log("value值：",value);
}
ReactDOM.render(
    <JInput onChange={this.onChange}/>},
    mountNode
);`}
                                            </code>
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        {/* 金额输入控件 */}
                        <Col span={12}>
                            <div className="code-box">
                                <div className="code-box-demo">
                                    <JRAmountInput />
                                </div>
                                <div className="code-box-meta">
                                    <div className="code-box-title">金额输入</div>
                                    <div>
                                        <p><strong>金额输入，格式：#,###.00</strong>, 默认右对齐</p>
                                    </div>
                                </div>
                                <div className="highlight-wrapper">
                                    <div className="highlight">
                                        <pre>
                                            <code>
                                                {`import {JRAmountInput} from "ui/JInput";
onChange = (value) => {
    console.log("value值：",value);
}
ReactDOM.render(
    <JRAmountInput onChange={this.onChange} />},
    mountNode
);`}
                                            </code>
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        {/* 短整型输入控件 */}
                        <Col span={12}>
                            <div className="code-box">
                                <div className="code-box-demo">
                                    <JRIntbox />
                                </div>
                                <div className="code-box-meta">
                                    <div className="code-box-title">短整型输入</div>
                                    <div>
                                        <p><strong>短整型输入，格式：#,###</strong>, 默认右对齐</p>
                                    </div>
                                </div>
                                <div className="highlight-wrapper">
                                    <div className="highlight">
                                        <pre>
                                            <code>
                                                {`import {JRIntbox} from "ui/JInput";
onChange = (value) => {
    console.log("value值：",value);
}
ReactDOM.render(
    <JRIntbox onChange={this.onChange} />},
    mountNode
);`}
                                            </code>
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        </Col>

                        {/* 长整形输入控件 */}
                        <Col span={12}>
                            <div className="code-box">
                                <div className="code-box-demo">
                                    <JRLongbox />
                                </div>
                                <div className="code-box-meta">
                                    <div className="code-box-title">长整形输入</div>
                                    <div>
                                        <p><strong>长整形输入，格式：#,###</strong>, 默认右对齐</p>
                                    </div>
                                </div>
                                <div className="highlight-wrapper">
                                    <div className="highlight">
                                        <pre>
                                            <code>
                                                {`import {JRLongbox} from "ui/JInput";
onChange = (value) => {
    console.log("value值：",value);
}
ReactDOM.render(
    <JRLongbox onChange={this.onChange} />},
    mountNode
);`}
                                            </code>
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        </Col>

                        {/* 期限输入控件 */}
                        <Col span={12}>
                            <div className="code-box">
                                <div className="code-box-demo">
                                    <JRDurationbox />
                                </div>
                                <div className="code-box-meta">
                                    <div className="code-box-title">期限输入</div>
                                    <div>
                                        <p><strong>期限输入，格式：#,###.0000</strong>, 默认右对齐</p>
                                    </div>
                                </div>
                                <div className="highlight-wrapper">
                                    <div className="highlight">
                                        <pre>
                                            <code>
                                                {`import {JRDurationbox} from "ui/JInput";
onChange = (value) => {
    console.log("value值：",value);
}
ReactDOM.render(
    <JRDurationbox onChange={this.onChange} />},
    mountNode
);`}
                                            </code>
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        </Col>

                        {/* 单价输入控件 */}
                        <Col span={12}>
                            <div className="code-box">
                                <div className="code-box-demo">
                                    <JRPricebox />
                                </div>
                                <div className="code-box-meta">
                                    <div className="code-box-title">单价输入</div>
                                    <div>
                                        <p><strong>单价输入，格式：#,###.000000000000</strong>, 默认右对齐</p>
                                    </div>
                                </div>
                                <div className="highlight-wrapper">
                                    <div className="highlight">
                                        <pre>
                                            <code>
                                                {`import {JRPricebox} from "ui/JInput";
onChange = (value) => {
    console.log("value值：",value);
}
ReactDOM.render(
    <JRPricebox onChange={this.onChange} />},
    mountNode
);`}
                                            </code>
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        {/* 利率输入控件 */}
                        <Col span={12}>
                            <div className="code-box">
                                <div className="code-box-demo">
                                    <JRRatebox />
                                </div>
                                <div className="code-box-meta">
                                    <div className="code-box-title">单价输入</div>
                                    <div>
                                        <p><strong>单价输入，格式：#,###.0000</strong>, 默认右对齐</p>
                                    </div>
                                </div>
                                <div className="highlight-wrapper">
                                    <div className="highlight">
                                        <pre>
                                            <code>
                                                {`import {JRRatebox} from "ui/JInput";
onChange = (value) => {
    console.log("value值：",value);
}
ReactDOM.render(
    <JRRatebox onChange={this.onChange} />},
    mountNode
);`}
                                            </code>
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        </Col>

                        {/* 万元输入控件 */}
                        <Col span={12}>
                            <div className="code-box">
                                <div className="code-box-demo">
                                    <JRTenThousandbox />
                                </div>
                                <div className="code-box-meta">
                                    <div className="code-box-title">万元输入</div>
                                    <div>
                                        <p><strong>万元输入，格式：#,###.0000</strong>, 默认右对齐</p>
                                    </div>
                                </div>
                                <div className="highlight-wrapper">
                                    <div className="highlight">
                                        <pre>
                                            <code>
                                                {`import {JRTenThousandbox} from "ui/JInput";
onChange = (value) => {
    console.log("value值：",value);
}
ReactDOM.render(
    <JRTenThousandbox onChange={this.onChange} />},
    mountNode
);`}
                                            </code>
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        </Col>

                        {/* 文本输入控件 */}
                        <Col span={12}>
                            <div className="code-box">
                                <div className="code-box-demo">
                                    <JRTextbox />
                                </div>
                                <div className="code-box-meta">
                                    <div className="code-box-title">文本输入</div>
                                    <div>
                                        <p><strong>文本输入</strong>, 默认左对齐</p>
                                    </div>
                                </div>
                                <div className="highlight-wrapper">
                                    <div className="highlight">
                                        <pre>
                                            <code>
                                                {`import {JRTextbox} from "ui/JInput";
onChange = (value) => {
    console.log("value值：",value);
}
ReactDOM.render(
    <JRTextbox onChange={this.onChange} />},
    mountNode
);`}
                                            </code>
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <div className="item-title">API</div>
                    <p>
                        除上述几个例子以外，还可以通过设置 JInput 的属性来产生不同的输入框格式。<br />
                        输入框的属性说明如下：
                </p>
                    <Table columns={columns}
                        pagination={false}
                        size="middle"
                        rowKey={(r, i) => i}
                        dataSource={[{
                            params: "format",
                            desc: `数据格式设置：【
                            "#,###.00",
                            "#,###.0000",
                            "#,###",
                            "#,###.000000000000"
                        】`,
                            type: "string",
                            "default": "无"
                        }, {
                            params: "align",
                            desc: "文本位置：【left|right】",
                            type: "string",
                            "default": "left"
                        }, {
                            params: "value",
                            desc: "值",
                            type: "string | number",
                            "default": "无"
                        }, {
                            params: "onChange",
                            desc: "输入改变时回调，参数为输入框的值",
                            type: "function(e:value)",
                            "default": "无"
                        }]}
                    />
                </section>
                <section id="JDateBox">
                    <div className="title">JDateBox 日期选择框</div>
                    <p>日期输入控件</p>
                    <div className="item-title">何时使用</div>
                    <p>业务上需要选择时间。</p>
                    <div className="item-title">代码演示</div>
                    <Row gutter={12}>
                        {/* 基本用法 */}
                        <Col span={12}>
                            <div className="code-box">
                                <div className="code-box-demo">
                                    <JDateBox onChange={(v) => { console.log(v) }} />
                                </div>
                                <div className="code-box-meta">
                                    <div className="code-box-title">基本</div>
                                    <div>
                                        <p><strong>日期选择，默认格式：YYYY-MM-DD</strong>, 默认左对齐</p>
                                    </div>
                                </div>
                                <div className="highlight-wrapper">
                                    <div className="highlight">
                                        <pre>
                                            <code>
                                                {`import JDateBox from "ui/JDateBox";
onChange = (value) => {
    console.log("value值：",value);
}
ReactDOM.render(
    <JDateBox onChange={this.onChange} />},
    mountNode
);`}
                                            </code>
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        </Col>

                        {/* 自定义格式 */}
                        <Col span={12}>
                            <div className="code-box">
                                <div className="code-box-demo">
                                    <JRDatebox onChange={(v) => { console.log(v) }} format="YYYY年MM月DD日" />
                                </div>
                                <div className="code-box-meta">
                                    <div className="code-box-title">自定义格式</div>
                                    <div>
                                        <p>自定义格式：YYYY年MM月DD日</p>
                                    </div>
                                </div>
                                <div className="highlight-wrapper">
                                    <div className="highlight">
                                        <pre>
                                            <code>
                                                {`import {JRDatebox} from "ui/JDateBox";
onChange = (value) => {
    console.log("value值：",value);
}
ReactDOM.render(
    <JRDatebox onChange={this.onChange}
        format="YYYY年MM月DD日"/>,
    mountNode
);`}
                                            </code>
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <div className="item-title">API</div>
                    <p>
                        除上述例子以外，还可以通过设置 JDateBox 的属性来产生不同的日期格式。<br />
                        日期选择框的属性说明如下：
                    </p>
                    <Table columns={columns}
                        pagination={false}
                        size="middle"
                        rowKey={(r, i) => i}
                        dataSource={[{
                            params: "format",
                            desc: <span>展示的日期格式，配置参考 <a href="http://momentjs.com/">moment.js</a></span>,
                            type: "string",
                            "default": "YYYY-MM-DD"
                        }, {
                            params: "value",
                            desc: "日期",
                            type: "string",
                            "default": "无"
                        }, {
                            params: "onChange",
                            desc: "时间发生变化的回调，发生在用户选择时间时",
                            type: "function(e:value)",
                            "default": "-"
                        }]}
                    />
                </section>
                <section id="JSelect">
                    <div className="title">JSelect 下拉框</div>
                    <p>下拉框输入控件</p>
                    <div className="item-title">何时使用</div>
                    <p>弹出一个下拉菜单给用户选择操作。</p>
                    <div className="item-title">代码演示</div>
                    <Row gutter={12}>
                        {/* 基本用法 */}
                        <Col span={12}>
                            <div className="code-box">
                                <div className="code-box-demo">
                                    <JRCombobox onChange={(v) => { console.log(v) }}
                                        data={[{
                                            key: "",
                                            value: "请选择"
                                        }, {
                                            key: "Lucy",
                                            value: "Lucy"
                                        }, {
                                            key: "Jack",
                                            value: "Jack"
                                        }, {
                                            key: "Rose",
                                            value: "Rose"
                                        }]}
                                    />
                                </div>
                                <div className="code-box-meta">
                                    <div className="code-box-title">基本</div>
                                    <div>
                                        <p>简单下拉菜单选择</p>
                                    </div>
                                </div>
                                <div className="highlight-wrapper">
                                    <div className="highlight">
                                        <pre>
                                            <code>
                                                {`import {JRCombobox} from "ui/JDateBox";
onChange = (value) => {
    console.log("value值：",value);
}
ReactDOM.render(
    <JRCombobox onChange={this.onChange}
        data={[{
            key: "请选择",
            value: ""
        }, {
            key: "Lucy",
            value: "Lucy"
        }, {
            key: "Jack",
            value: "Jack"
        }, {
            key: "Rose",
            value: "Rose"
        }]}
    />},
    mountNode
);`}
                                            </code>
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        </Col>

                        {/* 多选 */}

                        <Col span={12}>
                            <div className="code-box">
                                <div className="code-box-demo">
                                    <JRCombobox onChange={(v) => { console.log(v) }} mode="multiple"

                                        data={[{
                                            key: "",
                                            value: "请选择"
                                        }, {
                                            key: "Lucy",
                                            value: "Lucy"
                                        }, {
                                            key: "Jack",
                                            value: "Jack"
                                        }, {
                                            key: "Rose",
                                            value: "Rose"
                                        }]}
                                    />
                                </div>
                                <div className="code-box-meta">
                                    <div className="code-box-title">基本</div>
                                    <div>
                                        <p>多选下拉菜单</p>
                                    </div>
                                </div>
                                <div className="highlight-wrapper">
                                    <div className="highlight">
                                        <pre>
                                            <code>
                                                {`import {JRCombobox} from "ui/JDateBox";
onChange = (value) => {
    console.log("value值：",value);
}
ReactDOM.render(
    <JRCombobox onChange={this.onChange} mode="multiple"
        data={[{
            key: "请选择",
            value: ""
        }, {
            key: "Lucy",
            value: "Lucy"
        }, {
            key: "Jack",
            value: "Jack"
        }, {
            key: "Rose",
            value: "Rose"
        }]}
    />},
    mountNode
);`}
                                            </code>
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <div className="item-title">API</div>
                    <p>
                        下拉菜单的属性说明如下：
                </p>
                    <Table columns={columns}
                        pagination={false}
                        size="middle"
                        rowKey={(r, i) => i}
                        dataSource={[{
                            params: "mode",
                            desc: "设置 JSelect 的模式为多选或标签",
                            type: "'mutiple' | ''",
                            "default": "-"
                        }, {
                            params: "value",
                            desc: "选择的菜单值",
                            type: "string",
                            "default": "-"
                        }, {
                            params: "onChange",
                            desc: "时间发生变化的回调，发生在用户选择时间时",
                            type: "function(e:value)",
                            "default": "-"
                        }, {
                            params: "data",
                            desc: "下拉菜单键值对数组",
                            type: "Array<Object>",
                            "default": "[]"
                        }]}
                    />
                </section>
                <section id="JModal">
                    <div className="title">JModal 弹出框</div>
                    <p> 弹出框控件</p>
                    <div className="item-title">何时使用</div>
                    <p>需要用户处理事务，又不希望跳转页面以致打断工作流程时，可以使用 JModal 在当前页面正中打开一个浮层，承载相应的操作。</p>
                    <div className="item-title">代码演示</div>
                    <Row gutter={12}>
                        {/* 基本用法 */}
                        <Col span={12}>
                            <div className="code-box">
                                <div className="code-box-demo">
                                    <Button type="primary"
                                        onClick={this.showModal}
                                    >
                                        打开窗体
                                    </Button>
                                    <JRWindow
                                        title="基本窗体"
                                        visible={this.state.visibleModal}
                                        onOk={this.handleOk}
                                        onCancel={this.handleCancel}
                                    >
                                        <p>内容...</p>
                                        <p>内容...</p>
                                        <p>内容...</p>
                                    </JRWindow>
                                </div>
                                <div className="code-box-meta">
                                    <div className="code-box-title">基本</div>
                                    <div>
                                        <p>第一个对话框</p>
                                    </div>
                                </div>
                                <div className="highlight-wrapper">
                                    <div className="highlight">
                                        <pre>
                                            <code>
                                                {`import {JRWindow} from "ui/JModal";
import {Button} from "antd";
class App extends React.Component {
    state = {
        visible: false
    }
    showModal = () => {
        this.setState({
            visible: true
        })
    }
    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false
        });
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false
        });
    }
    render() {
        return (
            <div>
                <Button type="primary"
                    onClick={this.showModal}>
                    打开窗体
                </Button>
                <JRWindow
                    title="基本窗体"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <p>内容...</p>
                    <p>内容...</p>
                    <p>内容...</p>
                </JRWindow>
            </div>
          );
    }
}
ReactDOM.render(
    <App />,
    mountNode
);`}
                                            </code>
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className="code-box">
                                <div className="code-box-demo">
                                    <Button type="primary"
                                        onClick={this.showModal2}
                                    >打开自定义页脚窗体</Button>
                                    <JRWindow
                                        title="自定义页脚"
                                        footer={[
                                            <Button key="取消" onClick={this.handleCancel2}>取消</Button>,
                                            <Button key="保存" onClick={this.handleCancel2}>保存</Button>,
                                            <Button key="提交"
                                                type="primary"
                                                loading={this.state.loadingModal}
                                                onClick={this.handleOk2}
                                            >提交
                                            </Button>
                                        ]}
                                        visible={this.state.visibleModal2}
                                        onOk={this.handleOk2}
                                        onCancel={this.handleCancel2}
                                    >
                                        <p>内容...</p>
                                        <p>内容...</p>
                                        <p>内容...</p>
                                        <p>内容...</p>
                                        <p>内容...</p>
                                    </JRWindow>
                                </div>
                                <div className="code-box-meta">
                                    <div className="code-box-title">自定义页脚</div>
                                    <div>
                                        <p>更复杂的例子，自定义了页脚的按钮，点击提交后进入 loading 状态，完成后关闭。
不需要默认确定取消按钮时，你可以把 footer 设为 null。</p>
                                    </div>
                                </div>
                                <div className="highlight-wrapper">
                                    <div className="highlight">
                                        <pre>
                                            <code>
                                                {`import {JRWindow} from "ui/JModal";
import {Button} from "antd";
class App extends React.Component {
    state = {
        visible: false,
        loading: false
    }
    showModal = () => {
        this.setState({
            visible: true
        })
    }
    handleOk = (e) => {
        this.setState({
            loading: true
        });

        setTimeout(()=>{

            console.log(e);
            this.setState({
                loading: false,
                visible: false
            });
        }, 5000)
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false
        });
    }
    render() {
        return (
            <div>
                <Button type="primary"
                    onClick={this.showModal}
                >打开自定义页脚窗体</Button>
                <JRWindow
                    title="自定义页脚"
                    footer={[
                        <Button key="取消" onClick={this.handleCancel}>取消</Button>,
                        <Button key="保存" onClick={this.handleOk}
                        >保存</Button>,
                        <Button key="提交"
                            type="primary"
                            loading={this.state.loading}
                            onClick={this.handleOk}
                        >提交
                        </Button>
                    ]}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <p>内容...</p>
                    <p>内容...</p>
                    <p>内容...</p>
                    <p>内容...</p>
                    <p>内容...</p>
                </JRWindow>
            </div>
          );
    }
}
ReactDOM.render(
    <App />,
    mountNode
);`}
                                            </code>
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <div className="item-title">API</div>
                    <Table columns={columns}
                        pagination={false}
                        size="middle"
                        rowKey={(r, i) => i}
                        dataSource={[{
                            params: "size",
                            desc: "窗体宽度",
                            type: "'full'|'large'|'noraml'|'small'",
                            "default": "normal"
                        }, {
                            params: "okText",
                            desc: "确认按钮文字",
                            type: "string|ReactNode",
                            "default": "确定"
                        }, {
                            params: "cancelText",
                            desc: "取消按钮文字",
                            type: "string|ReactNode",
                            "default": "取消"
                        }, {
                            params: "confirmLoading",
                            desc: "确定按钮 loading",
                            type: "boolean",
                            "default": "无"
                        }, {
                            params: "title",
                            desc: "标题",
                            type: "string|ReactNode",
                            "default": "无"
                        }, {
                            params: "visible",
                            desc: "对话框是否可见",
                            type: "boolean",
                            "default": "无"
                        }, {
                            params: "onOk",
                            desc: "点击确定回调",
                            type: "function(e)",
                            "default": "无"
                        }, {
                            params: "onCancel",
                            desc: "点击遮罩层或右上角叉或取消按钮的回调",
                            type: "function(e)",
                            "default": "无"
                        }]}
                    />
                </section>
                <section id="JTable">
                    <div className="title">JTable 表格</div>
                    <p>表格控件, 展示行列数据。</p>
                    <div className="item-title">何时使用</div>
                    <p>当有大量结构化的数据需要展现时；<br />
                        当需要对数据进行排序、搜索、分页、自定义操作等复杂行为时。</p>
                    <div className="item-title">代码演示</div>
                    <div className="item-title">如何使用</div>
                    <p>指定表格的数据源 dataSource 为一个数组</p>
                    <pre>
                        <code>
                            {`const dataSource = [{
key: '1',
name: '胡彦斌',
age: 32,
address: '西湖区湖底公园1号'
}, {
key: '2',
name: '胡彦祖',
age: 42,
address: '西湖区湖底公园1号'
}];

const columns = [{
title: '姓名',
dataIndex: 'name',
key: 'name',
}, {
title: '年龄',
dataIndex: 'age',
key: 'age',
}, {
title: '住址',
dataIndex: 'address',
key: 'address',
}];

<Table dataSource={dataSource} columns={columns} />`}
                        </code>
                    </pre>
                    <div className="item-title">API</div>
                    <div className="item-title">Table</div>
                    <Table columns={columns}
                        pagination={false}
                        size="middle"
                        rowKey={(r, i) => i}
                        dataSource={[{
                            params: "columns",
                            desc: "表格列的配置描述，具体项见下表",
                            type: "	ColumnProps[]",
                            "default": "-"
                        }, {
                            params: "dataSource",
                            desc: "数据数组",
                            type: "any[]",
                            "default": ""
                        }, {
                            params: "loading",
                            desc: "页面是否加载中",
                            type: "boolean|object",
                            "default": "false"
                        }, {
                            params: "pagination",
                            desc: "分页器, 参考Ant Design",
                            type: "object",
                            "default": "无"
                        }, {
                            params: "onChange",
                            desc: "分页、排序、筛选变化时触发",
                            type: "Function(pagination, filters, sorter, extra: { currentDataSource: [] })",
                            "default": ""
                        }, {
                            params: "visible",
                            desc: "对话框是否可见",
                            type: "boolean",
                            "default": "无"
                        }, {
                            params: "onOk",
                            desc: "点击确定回调",
                            type: "function(e)",
                            "default": "无"
                        }, {
                            params: "onCancel",
                            desc: "点击遮罩层或右上角叉或取消按钮的回调",
                            type: "function(e)",
                            "default": "无"
                        }]}
                    />
                    <div className="item-title">Column</div>
                    <p>列描述数据对象，是 columns 中的一项，Column 使用相同的 API。</p>
                    <Table columns={columns}
                        pagination={false}
                        size="middle"
                        rowKey={(r, i) => i}
                        dataSource={[{
                            params: "align",
                            desc: "设置列内容的对齐方式",
                            type: "'left' | 'right' | 'center'",
                            "default": "'left'"
                        }, {
                            params: "className",
                            desc: "列的 className",
                            type: "string",
                            "default": "-"
                        }, {
                            params: "colSpan",
                            desc: "表头列合并,设置为 0 时，不渲染",
                            type: "number",
                            "default": ""
                        }, {
                            params: "dataIndex",
                            desc: "列数据在数据项中对应的 key，支持 a.b.c、a[0].b.c[1] 的嵌套写法",
                            type: "string",
                            "default": "-"
                        }, {
                            params: "fixed",
                            desc: "列是否固定，可选 true(等效于 left) 'left' 'right'",
                            type: "boolean|string",
                            "default": "false"
                        }, {
                            params: "sorter",
                            desc: "排序函数，本地排序使用一个函数(参考 Array.sort 的 compareFunction)，需要服务端排序可设为 true",
                            type: "Function|boolean",
                            "default": "-"
                        }, {
                            params: "width",
                            desc: "列宽度",
                            type: "string|number",
                            "default": "-"
                        }, {
                            params: "title",
                            desc: "列头显示文字",
                            type: "ReactNode|({ sortOrder, filters }) => ReactNode",
                            "default": "-"
                        }]}
                    />
                </section>

            </div>);
    }
}
export default UIComponents;