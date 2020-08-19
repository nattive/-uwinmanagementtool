import React from 'react';
import ReactNotifications from 'react-browser-notifications';
import PropTypes from "prop-types";
import { connect } from 'react-redux'
import { initPrivateChat } from '../actions/chatAction'
import { Redirect } from 'react-router-dom';
class Notification extends React.Component {
    constructor(props) {
        super(props);
        this.showNotifications = this.showNotifications.bind(this);
        // this.handleClick = this.handleClick.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        // this.showNotifications()

        this.state = {
            showNotification: null,
            type: null,
            header: '.',
            other: {},
            body: '',
        }
    }

    showNotifications() {
        // If the Notifications API is supported by the browser
        // then show the notification
        if (this.n.supported()) this.n.show();
        // alert(205)
    }

    static getDerivedStateFromProps(props, state) {
        if (props.notification !== state.notification) {
            const { notification } = props
            if (notification) {
                return {
                    showNotification: true,
                    type: notification.message ? 'message' : 'other',
                    header: notification.message ? 'New message from ' + notification.sender.name : 'other',
                    main: null,
                    other: notification.receiver,
                    body: notification.message ? notification.message.text : 'other',
                }
            }
        }
    }
    handleClick(event) {
        // Do something here such as
        // console.log("Notification Clicked") OR
        // window.focus() OR
        // window.open("http://www.google.com")

        // Lastly, Close the notification
      return <Redirect to='/chats' />
        // this.n.close(event.target.tag);
    }

    componentDidUpdate(props, state) {
        if (this.state.showNotification)
            this.showNotifications()

    }
    render() {
        const { Title, main } = this.state

        return (
            <div>
                <ReactNotifications
                    onRef={ref => (this.n = ref)} // Required
                    title={this.state.header} // Required
                    body={this.state.body}
                    icon="icon.png"
                    tag="abcdef"
                    timeout="2000"
                    onClick={event => this.handleClick(event)}
                />

            </div>
        )
    }
}

Notification.propTypes = {
    notification: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    notification: state.chat.notification,
});
export default connect(mapStateToProps, { initPrivateChat })(Notification);