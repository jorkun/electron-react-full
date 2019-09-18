import React from "react";
import AllApps from "./AllApps/index";
import { Popover } from "antd";
import {langCheck} from "Pub/js/utils";
class AllAppBtn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allAppsVisible: false
        };
    }
    render() {
        let { allAppsVisible } = this.state;
        return (
            <div className="margin-right-20">
                <Popover
                    overlayClassName="all-apps-popover"
                    content={<AllApps />}
                    placement="bottomRight"
                    arrowPointAtCenter={true}
                    align={{
                        offset: [200, 0]
                    }}
                    onVisibleChange={isVisible => {
                        this.setState({
                            allAppsVisible: isVisible
                        });
                    }}
                    trigger="click"
                >
                    <i
                        title={langCheck('0000PUB-000100')}/* 国际化处理： 全部应用*/
                        field="application"
                        fieldname={langCheck('0000PUB-000100')}/* 国际化处理： 全部应用*/
                        className={
                            allAppsVisible
                                ? "iconfont icon-quanbuyingyong allApplyColor"
                                : "iconfont icon-quanbuyingyong"
                        }
                    />
                </Popover>
            </div>
        );
    }
}
export default AllAppBtn;
