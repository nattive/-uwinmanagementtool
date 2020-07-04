import React, { Component } from "react";
import Dashboard from "./Dashboard";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { ChecklistExist } from "../../actions/checkoutAction";
import { getWSKPA, LatestWSKPA } from "../../actions/reportAction";
class DashboardClass extends Component {
  componentDidMount() {
    // this.props.ChecklistExist()
    this.props.getWSKPA();
    this.props.LatestWSKPA();
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
})(DashboardClass);
