import React, { Component } from "react";
import Axios from "axios";
import { baseUrl } from "../../../Misc/baseUrl";
import Echo from "laravel-echo";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  List,
  ListItem,
  Typography,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  TextField,
  CardActionArea,
  Button,
  CardActions,
} from "@material-ui/core";

export default class ChatHome extends Component {
  constructor() {
    super();
    this.state = {
      message: "",
      messages: [],
    };
    // this.fetchMessages = this.fetchMessages.bind(this);
    this.postMessage = this.postMessage.bind(this);
  }
//   componentDidMount() {
//     this.fetchMessages();
//     // window.Echo.channel("private-chat").listen("MessageSent", (event) => {
//     //   console.log(event);

//     //   this.state.messages.push(event.message);
//     // });
//   }
//   fetchMessages() {
//     const token = localStorage.getItem("uwin_manager_token");

//     Axios.get(`${baseUrl}chat/messages`, {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//       .then((res) => {
//          window.Echo.channel("private-chat").listen("MessageSent", (event) => {
//            console.log(event);

//            this.state.messages.push(event.message);
//          });
//         console.log(res.data);
//       })
//       .catch((err) => console.log(err));
//   }
  postMessage() {
    const token = localStorage.getItem("uwin_manager_token");

    Axios.post(
      `${baseUrl}chat/messages`,
      {
        text: this.state.message,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }
  render() {
    const messageCard = {
      backgroundColor: "#dc004e",
      color: "#fff",
      marginBottom: "20px",
      borderRadius: "10px 10px 10px 0",
      width: '80%',
    };
    return (
      <div>
        <Grid container>
          <Grid item xs={12} sm={12} md={7}>
            <Card>
              <CardHeader title="Public Chat" />
              <CardContent>
                <List
                  component="ul"
                  style={{ height: "400px", overflowY: "scroll" }}
                >
                  {this.state.messages.length > 0 ? (
                    this.state.messages.map((message) => (
                      <React.Fragment key={message.id}>
                        <ListItem color="primary" style={messageCard}>
                          <ListItemAvatar>
                            <Avatar />
                          </ListItemAvatar>
                          <ListItemText
                            primary={message.user.name}
                            secondary={message.text}
                          />
                        </ListItem>
                      </React.Fragment>
                    ))
                  ) : (
                    <p>fetching message</p>
                  )}
                </List>
              </CardContent>
              <CardActions>
                <TextField
                  id="standard-basic"
                  value={this.state.message}
                  onChange={(e) => this.setState({ message: e.target.value })}
                  label="Standard"
                />
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={this.postMessage}
                >
                  Send
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <div className="col-md-6"></div>
        </Grid>
      </div>
    );
  }
}
