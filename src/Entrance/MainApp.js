import React, { Component } from 'react'
import { Switch, Route, Link } from 'react-router-dom';
import SignInView from '../Auth/Signin/SignInView';
import SignUp from '../Auth/SignUp/SignUp';

export default class MainApp extends Component {
    render() {
        return (
          <Switch>
            <Route exact path="/">
            
              <Link to='/login' >  <p>dashboard</p></Link>
            </Route>
            <Route path="/login">
              <SignInView />
            </Route>
            <Route path="/createManager">
              <SignUp />
            </Route>
          </Switch>
        );
    }
}
