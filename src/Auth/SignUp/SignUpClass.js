import React, { Component } from "react";
import SignUp from "./SignUp";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { generatePassword } from "../../actions/authAction";

class SignUpClass extends Component {
  componentDidMount(){
    this.props.generatePassword();
  }
  
  render() {
    return <SignUp />;
  }
}

const mapStateToProps = (state) => ({
  registerStatus: state.auth.registerStatus,
});

export default connect(mapStateToProps, { generatePassword })(SignUpClass);
