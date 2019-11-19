/*
 * @Author: Zhao Kunkun
 * @Date: 2019-03-14 17:33:49
 * @Description：模糊查询或者按照某个字段查询
 * @Last Modified by: Zhao kunkun
 * @Last Modified time: 2019-03-22 17:23:30
 */
import React, { Component } from "react";
import "jrui/index.scss";

import { Dropdown, Menu, Input, Icon } from "antd";

const InputGroup = Input.Group;
const defaultKey = "_all_";
const DEFAULT_SEARCH = {
    key: defaultKey,
    title: "自动识别",
    description: "模糊搜索"
};
export default class JRFuzzySearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchKey: defaultKey,
            searchValue: ""
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.disabled) {
            this.setState({
                searchKey: defaultKey,
                searchValue: ""
            })
        }
    }
    onSeachChange = ({ key: searchKey }) => {
        this.setState({ searchKey })
    }

    onSeachFieldChange = (e) => {
        this.setState({
            searchValue: e.target.value
        });
    }
    handleQuery = () => {
        if (this.props.disabled) return;
        let { searchKey, searchValue } = this.state;
        this.props.onSearch && this.props.onSearch({ [searchKey]: searchValue });
    }
    render() {
        let { searchKey, searchValue } = this.state;
        let { data = [], disabled = false } = this.props;
        data = data ? [DEFAULT_SEARCH, ...data] : [DEFAULT_SEARCH];
        const menu = (
            <Menu onClick={this.onSeachChange}>
                {data.map(s => (
                    <Menu.Item key={s.key}>
                        {s.title}
                    </Menu.Item>))}
            </Menu>);
        const thisSearch = data.find(s => (s.key === searchKey)) || {};
        return (
            <InputGroup compact
                className={"jupiter-fuzzy-search" + (disabled ? " disabled" : "")}
                style={this.props.style}
            >
                <Dropdown overlay={menu} disabled={disabled}>
                    <span className="ant-dropdown-link" href="#">
                        <Icon type="caret-down" />
                    </span>
                </Dropdown>
                {thisSearch.title && <span className="label-text">{thisSearch.title}：</span>}
                <Input
                    onChange={this.onSeachFieldChange}
                    placeholder={thisSearch.description}
                    className="jupiter-input-search"
                    value={searchValue}
                    onPressEnter={this.handleQuery}
                    disabled={disabled}
                    addonAfter={<Icon type="search" onClick={this.handleQuery} />}
                />
            </InputGroup>);
    }
}