import React, { Component, useEffect } from "react";
import {
  Switch,
  Route,
  Link,
  useHistory,
  BrowserRouter,
} from "react-router-dom";
import SignInView from "../Auth/Signin/SignInView";
import SignUp from "../Auth/SignUp/SignUp";
import SignUpClass from "../Auth/SignUp/SignUpClass";
import Dashboard from "../layouts/Main/Dashboard";
import DashboardClass from "../layouts/Main/DashboardClass";
import { useDispatch } from "react-redux";
import { INIT_CHAT, INIT_CHAT_PUSHER } from "../actions/types";
// import Dashboard from '../layouts/Main/Dashboard';

export default function MainApp() {
  let history = useHistory();

  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch({ type: INIT_CHAT_PUSHER });
    dispatch({ type: INIT_CHAT });
  }, []);

  // echo
  //   .channel("laravel_database_private-chat")
  //   .listen("MessageSent", (ev) => console.log(ev));

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login">
          <SignInView />
        </Route>
        <Route path="/">
          <DashboardClass />
        </Route>
        <Route path="*">
          
          <p> 404 </p>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
