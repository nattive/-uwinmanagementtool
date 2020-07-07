import React, { Component } from "react";
import Dashboard from "./Dashboard";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { verifyRedirect } from '../../actions/authAction'
import { ChecklistExist, getLatestChecklist } from "../../actions/checkoutAction";
import { getWSKPA, LatestWSKPA } from "../../actions/reportAction";
class DashboardClass extends Component {
  componentDidMount() {
    // this.props.ChecklistExist()
    this.props.getWSKPA();
    this.props.getLatestChecklist();
    this.props.LatestWSKPA();
    this.props.verifyRedirect();
  }
  render() {
    const token = localStorage.getItem("uwin_manager_token");
    return !token ? <Redirect to="/login" /> : <Dashboard />;
  }
}
const mapStateToProps = (state) => ({
  manager: state.auth.manager,
});

export default connect(mapStateToProps, {
  ChecklistExist,
  getWSKPA,
  LatestWSKPA,
  getLatestChecklist,
  verifyRedirect,
})(DashboardClass);
