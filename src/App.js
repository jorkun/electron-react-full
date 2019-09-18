import React from 'react'
// import { Router } from './components'
import Routes from './route/index'
import {connect} from "react-redux";
// import './styles/index.less'

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <Routes />
  }

} // class App end

const AppStore = connect(
  (state) => ({
    // nlinkUrl: state.appData.nlinkUrl,
    // userCode: state.appData.userCode,
    // projectCode: state.appData.projectCode
  }),
  {
    // initAppData
  }
)(App);
export default AppStore;