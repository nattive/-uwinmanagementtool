import React, { Component } from 'react'
import Dashboard from './Dashboard'
import { Redirect } from 'react-router-dom'

export default class DashboardClass extends Component {

    
    render() {
        const token = localStorage.getItem("uwin_manager_token");
        return !token ? <Redirect to="/login" /> : <Dashboard />;
    }
}
