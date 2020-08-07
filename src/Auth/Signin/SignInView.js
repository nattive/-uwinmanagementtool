import React, { Component } from "react";
import Sign from "./Sign";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";

 class SignInView extends Component {
componentWillReceiveProps(newProps){
  if (newProps.redirectTo) {
  return <Redirect to={this.props.redirectTo} />
  }
}
  render() {
    return (
      <div>
        <Sign />
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  token: state.auth.token,
  redirectTo: state.auth.redirectTo
})


export default connect(mapStateToProps, null)(withRouter(SignInView));