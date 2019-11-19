import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Row, Col } from 'antd';
import { scrollSpy, Element } from "react-scroll";
import Ajax from "Pub/js/ajax";
import _ from "lodash";
import { updateGroupList, setUpdateHomePageFun } from "Store/home/action";
import "./index.less";
import LoginForm from "./loginForm";
import CustomerSer from "./customerSer";
import Connection from "./connection";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount(){
        this.props.updateHomePage()
    }
    addNumber=()=>{
        this.props.updateGroupList([2,3,4])
    }
    render() {
        // let { groups, layout, showEmpty } = this.props;
        return (
            <div className="home-page">
                <h2>中债金融估值中心“债管家” V1.0.1 （Beta版）</h2>
                <Row className="testRowClassName">
                    <Col span="8"><LoginForm></LoginForm></Col>
                    <Col span="8"><Connection></Connection></Col>
                    <Col span="8" className="testColClassName"><CustomerSer></CustomerSer></Col>
                </Row>
            </div>
        );
    }
}
Home.propTypes = {
    updateGroupList: PropTypes.func.isRequired,
    setUpdateHomePageFun: PropTypes.func.isRequired
};
export default connect(
    state => ({
        groups: state.homeData.groups,
        updateHomePage:state.homeData.updateHomePage
    }),
    {
        updateGroupList,
        setUpdateHomePageFun
    }
)(Home);
