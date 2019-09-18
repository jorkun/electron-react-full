import React from 'react'
import { Button } from 'antd'
import axios from "axios";
export default class Page extends React.Component {
  constructor(props) {
    super(props)
    console.log(this.props)
  }
  getAjax = async () => {
    let aa = await axios.get("/sdf", {});
    console.log(aa);
  }
  render() {
    const { params: { config }, history } = this.props
    return (
      <div>
        <p>demo - {config}</p>
        <hr />
        <Button onClick={this.getAjax}></Button>
        <Button onClick={() => {
          history.goBack()
        }}>back</Button>
      </div>
    )
  }

} // class Page end