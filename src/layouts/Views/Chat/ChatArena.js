import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Echo from "laravel-echo";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button as MaterialButton,
  Paper,
  IconButton,
  CircularProgress,
  TextField,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
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
import chatBackground from "./image/chat.jpg";
import MoreVertIcon from "@material-ui/icons/MoreVert";
class ChatArena extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      open: false,
      queuedMessage: null,
      AnchorEl: null,
      messages: [],
    };
    // this.containsObject = this.containsObject.bind(this);
    this.handlePostMessage = this.handlePostMessage.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  componentWillReceiveProps(newProps) {
    if (newProps.chats) {
      this.setState({ messages: newProps.chats });
    }
  }

  componentWillMount() {
    this.setState({ messages: this.props.chats });

  }
  componentWillReceiveProps(newProps) {
    if (newProps.chats) {
      this.setState({ messages: newProps.chats });
    }
    if (newProps.chat) {
      this.setState({ queuedMessage: "" });
      if (newProps.chat.text) {
        this.state.messages.push({
          text: newProps.chat.text.text,
          user: newProps.chat.user,
          id: newProps.chat.text.id,
          created_at: newProps.chat.text.created_at,
        });
      }
    }
  }

  handlePostMessage() {
    this.props.postMessage(this.state.message);
    var cardMessage = document.getElementById("cardMessage");
    cardMessage.scroll(0, 1000000);
    this.setState({ message: "", queuedMessage: this.state.message });
  }

  static propTypes = {
    prop: PropTypes,
  };
  handleClickOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    const { anchorEl } = this.state;
    const chatMenu = (
      <>
        <div>
          <MaterialButton variant="text" color="primary" onClick={this.handleClickOpen}>
          Create Group
          </MaterialButton>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Create Chat Group</DialogTitle>
            <DialogContent>
              <DialogContentText>
               Chat Group name?
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Group name"
                type="text"
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <MaterialButton onClick={this.handleClose} color="primary">
                Cancel
              </MaterialButton>
              <MaterialButton onClick={this.handleClose} color="primary">
                Create
              </MaterialButton>
            </DialogActions>
          </Dialog>
        </div>
      </>
    );
    return (
      <>
        <Card>
          <CardHeader
            title="Chat"
            subheader="users"
            action={chatMenu}
            style={{
              backgroundColor: "#373737099",
              color: "rgb(46, 44, 44)",
            }}
          />
          <CardContent
            id="cardMessage"
            style={{
              height: "400px",
              overflowY: "scroll",
                backgroundImage: `url(${chatBackground})`,
            }}
          >
            <div style={{ display: "flex", justifyContent: "center" }}>
              {this.props.isFetching && (
                <CircularProgress size={24} color="primary" />
              )}
            </div>
            {this.state.messages.map((message) => (
              <React.Fragment>
                <MessageBox
                  position={
                    message.position
                      ? message.position
                      : message.user.id === this.props.manager.id
                      ? "right"
                      : "left"
                  }
                  title={
                    message.user && message.user.id === this.props.manager.id
                      ? null
                      : message.user.name
                  }
                  type={"text"}
                  text={message.text}
                  dateString={message.created_at}
                  status={message.status ? "waiting" : "sent"}
                />
              </React.Fragment>
            ))}
            {this.state.queuedMessage && (
              <>
                <MessageBox
                  position={"right"}
                  type={"text"}
                  text={this.state.queuedMessage}
                  status={"waiting"}
                />
              </>
            )}
          </CardContent>
          <CardActions>
            <Input
              placeholder="Type here..."
              ref={(el) => (this.inputRef = el)}
              value={this.state.message}
              multiline={true}
              onChange={(e) => this.setState({ message: e.target.value })}
              rightButtons={
                <Button
                  onClick={this.handlePostMessage}
                  color="primary"
                  backgroundColor="black"
                  text="Send"
                />
              }
            />
          </CardActions>
        </Card>
      </>
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

const mapDispatchToProps = {
  fetchChats,
  postMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatArena);
