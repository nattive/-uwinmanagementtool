import React, { Component, useEffect } from "react";
import { Switch, Route, Link, useHistory } from "react-router-dom";
import SignInView from "../Auth/Signin/SignInView";
import SignUp from "../Auth/SignUp/SignUp";
import SignUpClass from "../Auth/SignUp/SignUpClass";
import Dashboard from "../layouts/Main/Dashboard";
import DashboardClass from "../layouts/Main/DashboardClass";
import { useDispatch } from "react-redux";
import { INIT_CHAT } from "../actions/types";
// import Dashboard from '../layouts/Main/Dashboard';

export default function MainApp() {
  let history = useHistory();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: INIT_CHAT });
  }, []);

  // echo
  //   .channel("laravel_database_private-chat")
  //   .listen("MessageSent", (ev) => console.log(ev));

  return (
    <Switch>
      <Route exact path="/">
        <DashboardClass />
      </Route>{" "}
      <Route exact path="/">
        <DashboardClass />
      </Route>
      <Route path="/login">
        <SignInView />
      </Route>{" "}
      <Route path="/createManager">
        <SignUpClass history={history} />{" "}
      </Route>{" "}
      <Route path="*">
        {" "}
        <p> 404 </p>
      </Route>
    </Switch>
  );
}
