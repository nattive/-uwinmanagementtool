import React, { Component } from "react";
import Sign from "./Sign";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";

 class SignInView extends Component {
componentWillReceiveProps(newProps){
  if (newProps.token !== '') {
   this.props.history.push("/");

   
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
  token: state.auth.token
})


export default connect(mapStateToProps, null)(withRouter(SignInView));