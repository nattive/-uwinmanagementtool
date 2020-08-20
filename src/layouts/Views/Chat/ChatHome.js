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
import ChatSideAreaMenu from "./ChatSideAreaMenu";

class ChatHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0, height: 0
    };
  }
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
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
          <Grid item xs={12} sm={12} md={6}>
            {!this.props.hasInitiatedChat ? (
              <Grid item justify="center" alignContent="center">
                <Card styled={{ backgroundColor: '#373737044' }}>
                  <CardHeader
                    action={<ChatSideAreaMenu />}
                    style={
                      {
                        backgroundColor: "#373737099",
                        color: "rgb(46, 44, 44)",
                      }
                    }
                  />
                  <CardContent id="cardMessage" style={
                    {
                      height: this.state.height - 150,
                      overflowY: "hidden",
                    }
                  } >
                    <Typography variant='h5'>Select a manager to view/chat with them</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ) : (
                <ChatArena />
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
  receiver: state.chat.receiver,
  hasInitiatedChat: state.chat.hasInitiatedChat,
  pusher: state.chat.pusher,
  chatError: state.chat.chatError,
  manager: state.auth.manager,

});

export default connect(mapStateToProps, { fetchChats, postMessage, fetchPrivateChats })(ChatHome);
