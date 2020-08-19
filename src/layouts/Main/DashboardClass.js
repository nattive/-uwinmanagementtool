import React, { Component } from "react";
import Dashboard from "./Dashboard";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { verifyRedirect } from "../../actions/authAction";
import {
    ChecklistExist,
    getLatestChecklist,
} from "../../actions/checkoutAction";
import { getUsers } from "../../actions/usersAction";
import { getWSKPA, LatestWSKPA } from "../../actions/reportAction";
import Echo from "laravel-echo";
import { baseUrlNoApi } from "../../Misc/baseUrl";
import Pusher from "pusher-js";
class DashboardClass extends Component {
    componentDidMount() {

        // this.props.ChecklistExist()
        this.props.getWSKPA();
        this.props.getLatestChecklist();
        this.props.LatestWSKPA();
        this.props.verifyRedirect();
        if (!this.props.manager.user) {
            this.props.getUsers();
            return <Redirect to="/login" />;
        }


    }
    UNSAFE_componentWillReceiveProps(props) {
        if (props.manager.user !== this.props.manager.user) {
           
            if (props.manager === {}) {
                return <Redirect to="/login" />;
            }
        }
        if (props.redirectTo) {
            return <Redirect to={props.redirectTo}
            />
        }
    }

    render() {
        const token = localStorage.getItem("uwin_manager_token");
        return !token && this.props.manager === {} ? (<Redirect to="/login" />
        ) : (<Dashboard />)
    }
}
const mapStateToProps = (state) => ({
    manager: state.auth.manager,
    redirectTo: state.auth.redirectTo
});

export default connect(mapStateToProps, {
    ChecklistExist,
    getWSKPA,
    LatestWSKPA,
    getLatestChecklist,
    verifyRedirect,
    getUsers,
})(DashboardClass);