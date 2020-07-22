import React, { Component } from "react";
import Axios from "axios";
import { baseUrl } from "../../../Misc/baseUrl";
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
} from "@material-ui/core";
import { connect } from "react-redux";
import { fetchChats, postMessage } from "../../../actions/chatAction";
import SendIcon from "@material-ui/icons/Send";
import store from "../../../Misc/store";
import { FETCHED_CHAT } from "../../../actions/types";
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
class ChatHome extends Component {
 

  componentWillMount() {

    const { echo, manager } = this.props;
    echo
      .channel("laravel_database_private-chat")
      .listen("MessageSent", (ev) => {
        store.dispatch({
          type: FETCHED_CHAT,
          payload: {
            text: ev.text,
            user: ev.user,
          },
        });
      });
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
          <ChatArena />
           </Grid>
          <Grid item xs={12} sm={12} md={5}>
            <Card style={{ marginBottom: 10 }}>
              <CardHeader
                title="Recent Messages"
                action={
                  <TextField
                    id="standard-search"
                    label="Search field"
                    type="search"
                  />
                }
                style={{
                  backgroundColor: "#373737099",
                  color: "rgb(46, 44, 44)",
                }}
              />
              <CardContent style={{ height: "300px", overflowY: "scroll" }}>
                <ChatList
                  className="chat-list"
                  dataSource={[
                    {
                      avatar: "https://facebook.github.io/react/img/logo.svg",
                      alt: "Reactjs",
                      title: "Facebook",
                      subtitle: "What are you doing?",
                      date: new Date(),
                      unread: 0,
                    },
                    {
                      avatar: "https://facebook.github.io/react/img/logo.svg",
                      alt: "Reactjs",
                      title: "Facebook",
                      subtitle: "What are you doing?",
                      date: new Date(),
                      unread: 0,
                    },
                    {
                      avatar: "https://facebook.github.io/react/img/logo.svg",
                      alt: "Reactjs",
                      title: "Facebook",
                      subtitle: "What are you doing?",
                      date: new Date(),
                      unread: 0,
                    },
                    {
                      avatar: "https://facebook.github.io/react/img/logo.svg",
                      alt: "Reactjs",
                      title: "Facebook",
                      subtitle: "What are you doing?",
                      date: new Date(),
                      unread: 0,
                    },
                    {
                      avatar: "https://facebook.github.io/react/img/logo.svg",
                      alt: "Reactjs",
                      title: "Facebook",
                      subtitle: "What are you doing?",
                      date: new Date(),
                      unread: 0,
                    },
                    {
                      avatar: "https://facebook.github.io/react/img/logo.svg",
                      alt: "Reactjs",
                      title: "Facebook",
                      subtitle: "What are you doing?",
                      date: new Date(),
                      unread: 0,
                    },
                    {
                      avatar: "https://facebook.github.io/react/img/logo.svg",
                      alt: "Reactjs",
                      title: "Facebook",
                      subtitle: "What are you doing?",
                      date: new Date(),
                      unread: 0,
                    },
                    {
                      avatar: "https://facebook.github.io/react/img/logo.svg",
                      alt: "Reactjs",
                      title: "Facebook",
                      subtitle: "What are you doing?",
                      date: new Date(),
                      unread: 0,
                    },
                    {
                      avatar: "https://facebook.github.io/react/img/logo.svg",
                      alt: "Reactjs",
                      title: "Facebook",
                      subtitle: "What are you doing?",
                      date: new Date(),
                      unread: 0,
                    },
                    {
                      avatar: "https://facebook.github.io/react/img/logo.svg",
                      alt: "Reactjs",
                      title: "Facebook",
                      subtitle: "What are you doing?",
                      date: new Date(),
                      unread: 0,
                    },
                  ]}
                />
              </CardContent>
            </Card>
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
  chatError: state.chat.chatError,
  manager: state.auth.manager,
});

export default connect(mapStateToProps, { fetchChats, postMessage })(ChatHome);
