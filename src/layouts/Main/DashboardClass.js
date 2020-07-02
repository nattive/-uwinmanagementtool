import React, { Component } from 'react'
import Dashboard from './Dashboard'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import {ChecklistExist} from '../../actions/checkoutAction'
class DashboardClass extends Component {

  componentDidMount(){
    // this.props.ChecklistExist()
  }
    render() {
        const token = localStorage.getItem("uwin_manager_token");
        return !token ? (
          <Redirect to="/login" />
        ) : (
          <Dashboard />
        );
    }
}
const mapStateToProps = (state) => ({
  manager: state.auth.manager,
});


export default connect(null, { ChecklistExist })(DashboardClass);