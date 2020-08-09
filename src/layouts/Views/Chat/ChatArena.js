import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import date from 'date-and-time';
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
            message: [],
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

        // console.log()
        if (newProps.myMessage) {
            this.setState({ queuedMessage: "" });
            if (newProps.newMessage !== this.props.newMessage) {
                if (newProps.newMessage.id !== this.state.messages[this.state.messages.length - 1].id) {
                    this.state.messages.push({
                        user: newProps.chat.user,
                        ...newProps.newMessage,
                    });
                }
            }

        }


    }

    UNSAFE_componentWillMount() {
        if (this.props.activeChat.chat.id) {
            this.props.fetchChatsById(this.props.activeChat.chat.id);
        }
    }
    handlePostMessage() {
        const now = new Date();

        this.props.postMessage(
            this.state.message,
            this.state.receiver.id,
            this.props.activeChat.chat.id
        );
        this.state.messages.push({
            user_id: this.props.manager.user.id,
            receiver_id: this.state.receiver.id,
            text: this.state.message,
            updated_at:date.format(now, 'hh:mm A'),
            created_at:date.format(now, 'hh:mm A'),
            id: Math.random() * 10
        })
        // this.setState({ queuedMessage: this.state.message });
        // this.props.fetchChats()
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
        return (
            <>
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
                                                message.user_id === this.props.manager.user.id ?
                                                    "right" :
                                                    "left"
                                        }
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
                    </CardContent>
                    <div style={{ float: "left", clear: "both" }}
                        ref={(el) => { this.messagesEnd = el; }}>
                    </div>
                    <CardActions >
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
                        /> </CardActions>
                </Card>
            </>
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