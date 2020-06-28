import React, { Component } from "react";
import { Switch, Route, Link, useHistory } from "react-router-dom";
import SignInView from "../Auth/Signin/SignInView";
import SignUp from "../Auth/SignUp/SignUp";
import SignUpClass from "../Auth/SignUp/SignUpClass";
import Dashboard from "../layouts/Main/Dashboard";
import DashboardClass from "../layouts/Main/DashboardClass";
// import Dashboard from '../layouts/Main/Dashboard';

export default function MainApp() {
  let history = useHistory();
  return (
    <Switch>
      <Route exact path="/">
        <DashboardClass />
      </Route>
      <Route path="/login">
        <SignInView />
      </Route>
      <Route path="/createManager">
        <SignUpClass history={history} />
      </Route>
      <Route path="/dashboard">{/* <Dashboard /> */}</Route>
    </Switch>
  );
}
