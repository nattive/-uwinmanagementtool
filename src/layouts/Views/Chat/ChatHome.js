import React, { Component } from "react";
import Axios from "axios";
import { baseUrl, baseUrlNoApi } from "../../../Misc/baseUrl";
import Echo from "laravel-echo";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Paper,
  IconButton,
  CircularProgress,
  TextField,
  Typography,
} from "@material-ui/core";
import { connect } from "react-redux";
import { fetchChats, postMessage, fetchPrivateChats } from "../../../actions/chatAction";
import SendIcon from "@material-ui/icons/Send";
import store from "../../../Misc/store";
import { FETCHED_CHAT, NEW_MESSAGE } from "../../../actions/types";
import "react-chat-elements/dist/main.css";
import {
  MessageList,
  Input,
  MessageBox,
  Button,
  SideBar,
  ChatList,
} from "react-chat-elements";
import chatBackground from "./image/chatbg.jpg";
import ChatArena from "./ChatArena";
import ContactTab from "./ContactTab";
import EchoRedux from 'laravel-echo-redux';

class ChatHome extends Component {

  // c
  componentDidMount() {
    this.props.fetchPrivateChats()
    const token = localStorage.getItem('uwin_manager_token')

    const config = {
      store, //Redux store (required)
      debug: true, //Debug mode on/off (optional)
      host: baseUrlNoApi,
      encrypted: false,
      authEndpoint: `${baseUrlNoApi}broadcasting/auth`,
      auth: {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    }
    EchoRedux.init(config)

    EchoRedux.subscribe('my-channel', 'my-event', 'NEW_MESSAGE');

    /**
     * update unline status
     */
    // Echo.join('my-channel')
    //   .joining((user) => {
    //     console.log(user)
    //   })
    //   .listen('my-event', (event) => {
    //     console.log(event)
    //   })
  }
  // }
  componentWillReceiveProps(props) {
    
    if (props.initEcho !== this.props.initEcho){
      props.initEcho.join('my-channel')
        .joining((user) => {
          console.log(user)
        })
        .listen('my-event', (event) => {
          console.log(event)
        })
    }
  // if (props.echo !== this.props.echo) {
  //   const { echo, manager, activeChat } = props;
  //   var channel = echo.subscribe('my-channel');
  //   channel.bind('my-event', function (data) {
  //     console.log(data.message);
  //     store.dispatch({
  //       type: NEW_MESSAGE,
  //       payload: data.message
  //     });
  //   });
  // }
  }


  render() {
    const messageCard = {
      backgroundColor: "#dc004e",
      color: "#fff",
      color: "rgb(43, 42, 42)",
      marginBottom: "20px",
      borderRadius: "10px 10px 10px 0",
      width: "80%",
      fontSize: 14,
    };
    return (
      <div>
        <Grid container>
          <Grid item xs={12} sm={12} md={7}>
            {!this.props.activeChat ? (
              <Grid container justify="center" alignContent="center">
                <Typography variant="h3">Please select a chat</Typography>
              </Grid>
            ) : (
                <ChatArena activeChat={this.props.activeChat} />
              )}
          </Grid>
          <Grid item xs={12} sm={12} md={5}>
            <ContactTab />
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  echo: state.chat.echo,
  isFetching: state.chat.isFetching,
  chat: state.chat.chat,
  chats: state.chat.chats,
  activeChat: state.chat.activeChat,
  pusher: state.chat.pusher,
  chatError: state.chat.chatError,
  manager: state.auth.manager,

});

export default connect(mapStateToProps, { fetchChats, postMessage, fetchPrivateChats })(ChatHome);
