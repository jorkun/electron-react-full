import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { scrollSpy, Element } from "react-scroll";
import Ajax from "Pub/js/ajax";
import _ from "lodash";
import { updateGroupList, setUpdateHomePageFun } from "Store/home/action";
import "./index.less";
/**
 * 工作桌面 首页 页面
 * 各个此贴应用及工作台中的小部件 通过 js 片段进行加载渲染
 */

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        let { groups } = this.props;
        return (
            <div>
                <div>header</div>
                {groups.map(ele=><p>{ele}</p>)}
            </div>
        );
    }
}
Header.propTypes = {
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
)(Header);
