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
import {
    fetchChats,
    postMessage,
    initPrivateChat,
    fetchChatsById,
} from "../../../actions/chatAction";
import SendIcon from "@material-ui/icons/Send";
import store from "../../../Misc/store";
import { FETCHED_CHAT } from "../../../actions/types";
import { SystemMessage } from 'react-chat-elements'
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
import { getUser } from "../../../actions/usersAction";
class ChatArena extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            receiver: {},
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
            this.setState({ messages: newProps.chats.chat_messages });
        }
        if (newProps.FetchedManager) {
            this.setState({ receiver: newProps.FetchedManager });
        }

        if (newProps.myMessage) {
            // this.setState({ queuedMessage: "" });
            if (newProps.newMessage !== this.props.newMessage) {
                this.state.messages.push({
                    text: newProps.newMessage.text,
                    user: newProps.chat.user,
                    id: newProps.newMessage.user_id,
                    created_at: newProps.newMessage.created_at,
                });
            }

        }

        if (newProps.myMessage) {
            // this.setState({ queuedMessage: "" });
            if (newProps.myMessage !== this.props.myMessage) {
                var dateNow = new Date();
                var date5SecondsAgo = dateNow.getTime();
                this.state.messages.push({
                    text: newProps.myMessage,
                    user: this.props.manager,
                    id: newProps.newMessage.user_id,
                    created_at: date5SecondsAgo,
                });
            }

        }
    }

    UNSAFE_componentWillMount() {
        if (this.props.activeChat.chat.id) {
            this.props.fetchChatsById(this.props.activeChat.chat.id);
        }
    }
    handlePostMessage() {
        this.props.postMessage(
            this.state.message,
            this.state.receiver.id,
            this.props.activeChat.chat.id
        );
        this.setState({ queuedMessage: this.state.message });
        this.props.fetchChats()
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
    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }
    render() {
        const { anchorEl } = this.state;
        const chatMenu = (
            <>
                <div>
                    <MaterialButton
                        variant="text"
                        color="primary"
                        onClick={this.handleClickOpen}>
                        Create Group
                    </MaterialButton>
                    <Dialog open={this.state.open} onClose={this.handleClose}
                        aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title"> Create Chat Group </DialogTitle>
                        <DialogContent>
                            <DialogContentText> Chat Group name ? </DialogContentText>
                            <TextField autoFocus margin="dense"
                                id="name"
                                label="Group name"
                                type="text"
                                fullWidth />
                        </DialogContent>
                        <DialogActions>
                            <MaterialButton onClick={this.handleClose} color="primary" >
                                Cancel </MaterialButton>
                            <MaterialButton onClick={this.handleClose} color="primary" >
                                Create </MaterialButton>
                        </DialogActions>
                    </Dialog>
                </div>
            </>
        );
        return (<>
            <Card >
                <CardHeader title={
                    this.state.receiver !== {} ? (
                        this.state.receiver.name
                    ) : (<CircularProgress />
                        )
                }
                    subheader="online"
                    action={chatMenu}
                    style={
                        {
                            backgroundColor: "#373737099",
                            color: "rgb(46, 44, 44)",
                        }
                    }
                /> <CardContent id="cardMessage"
                    style={
                        {
                            height: "400px",
                            overflowY: "scroll",
                            backgroundImage: `url(${chatBackground})`,
                        }
                    } >
                    {this.props.isFetching && (<SystemMessage text='Fetching Messages' />)}{
                        this.state.messages.length > 0 ? (
                            this.state.messages.map((message) => (
                                <React.Fragment >
                                    <MessageBox position={
                                        message.position ?
                                            message.position :
                                            message.user_id === this.props.manager.id ?
                                                "right" :
                                                "left"
                                    }
                                        // title={
                                        //   message.user_id === this.props.manager.id
                                        //     ? null
                                        //     : message.user.name
                                        // }
                                        type={"text"}
                                        text={message.text}
                                        dateString={message.created_at}
                                        status={message.status ? "waiting" : "sent"} />
                                </React.Fragment>
                            ))
                        ) :
                            (<SystemMessage text={' No message sent'} />)
                    } {
                        this.state.queuedMessage && (<>
                            <MessageBox position={"right"}
                                type={"text"}
                                text={this.state.queuedMessage}
                                status={"waiting"}
                            /> </>
                        )
                    }
                    <div style={{ float: "left", clear: "both" }}
                        ref={(el) => { this.messagesEnd = el; }}>
                    </div>
                </CardContent> <CardActions >
                    <Input placeholder="Type here..."
                        ref={
                            (el) => (this.inputRef = el)}
                        value={this.state.message}
                        multiline={true}
                        onChange={
                            (e) => this.setState({ message: e.target.value })}
                        rightButtons={<
                            Button
                            onClick={this.handlePostMessage}
                            color="primary"
                            backgroundColor="black"
                            text="Send" /
                        >
                        }
                    /> </CardActions> </Card> </>
        );
    }
}

const mapStateToProps = (state) => ({
    echo: state.chat.echo,
    isFetching: state.chat.isFetching,
    chat: state.chat.chat,
    chats: state.chat.chats.data,
    activeChat: state.chat.activeChat,
    chatError: state.chat.chatError,
    newMessage: state.chat.newMessage,
    myMessage: state.chat.myMessage,
    manager: state.auth.manager,
    FetchedManager: state.managers.FetchedManager,
});

const mapDispatchToProps = {
    fetchChats,
    postMessage,
    initPrivateChat,
    getUser,
    fetchChatsById,
};

ChatArena.propTypes = {
    activeChat: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(ChatArena);