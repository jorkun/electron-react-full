/*
 * @Author: Zhao Kunkun
 * @Date: 2019-03-07 14:42:27
 * @Last Modified by: Zhao kunkun
 * @Last Modified time: 2019-03-20 17:35:35
 */
import React from "react";
import { Upload } from "antd";

class JRFileupload extends React.Component {
    render() {
        let fProps = Object.assign({}, this.props, {
            withCredentials: true,
            headers: {
                authorization: sessionStorage.token
            }
        })
        return <Upload {...fProps} className="jupiter-file-upload" />
    }
}

export default JRFileupload;