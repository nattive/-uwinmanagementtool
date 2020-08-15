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
import { css } from 'glamor';
import ScrollToBottom from 'react-scroll-to-bottom';

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
import Echo from "laravel-echo";
import chatBackground from "./image/chat.jpg";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { getUser } from "../../../actions/usersAction";
import { baseUrlNoApi } from "../../../Misc/baseUrl";
class ChatArena extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            notSentMessage: [],
            receiver: {},
            open: false,
            queuedMessage: [],
            AnchorEl: null,
            messages: [],
            messageData: [],
            width: 0, height: 0
        };

        // this.containsObject = this.containsObject.bind(this);
        this.handlePostMessage = this.handlePostMessage.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

    }

    componentWillReceiveProps(newProps) {
        if (newProps.chats && newProps.chats !== this.props.chats) {
            this.setState({ messages: newProps.chats.chat_messages });
            newProps.chats &&
                newProps.chats.chat_messages.map(message => {
                    this.state.messageData.push({
                        position: message.position ?
                            message.position :
                            message.user_id === this.props.manager.user.id ?
                                "right" :
                                "left",
                        type: "text",
                        text: message.text,
                        date: message.updated_at,
                    })
                })
        }
        if (newProps.FetchedManager !== this.props.FetchedManager) {
            this.setState({ receiver: newProps.FetchedManager });
        }
        if (newProps.receiver !== this.props.receiver) {
            this.setState({ receiver: newProps.receiver });
        }
        if (newProps.activeChat !== this.props.activeChat && newProps.activeChat) {
            const token = localStorage.getItem('uwin_manager_token')
            newProps.fetchChatsById(newProps.activeChat.chat.id);
            window.Echo = new Echo({
                broadcaster: 'pusher',
                key: '43c8f03f6308989dfc9b',
                cluster: 'eu',
                encrypted: false,
                authEndpoint: `${baseUrlNoApi}broadcasting/auth`,
                auth: {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            });

            window.Echo
                .join(newProps.activeChat.channel)
                .here(user => {
                    console.log(user);
                })
                .joining(user => {
                    console.log(user);
                })
                .leaving(user => {
                    console.log(user)
                })
                .listen('.chat', (event) => {
                    const { message } = event
                    console.log(message)
                    this.setState({ queuedMessage: [] })
                    this.setState({
                        messageData: [
                            ...this.state.messageData,
                            {
                                position: message.position ?
                                    message.position :
                                    message.user_id === this.props.manager.user.id ?
                                        "right" :
                                        "left",
                                type: "text",
                                text: message.text,
                                dateString: message.created_at
                            }
                        ]
                    })
                })
        }
    }
    handlePostMessage() {
        const now = new Date();
        this.setState({ message: [] })
        this.state.queuedMessage.push({
            user_id: this.props.manager.user.id,
            receiver_id: this.state.receiver.id,
            text: this.state.message,
            updated_at: date.format(now, 'hh:mm A'),
            created_at: date.format(now, 'hh:mm A'),
            id: Math.random() * 10
        })
        if (this.props.activeChat) {
            this.props.postMessage(
                this.state.message,
                this.state.receiver.id,
                this.props.activeChat.chat.id
            )
        } else {
            this.state.notSentMessage.push({
                user_id: this.props.manager.user.id,
                receiver_id: this.state.receiver.id,
                text: this.state.message,
                updated_at: date.format(now, 'hh:mm A'),
                created_at: date.format(now, 'hh:mm A'),
                id: Math.random() * 10
            })
        }

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

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }
    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }


    render() {
        const { innerWidth: width, innerHeight: height } = window;
        const now = new Date();
        const ROOT_CSS = css({
            backgroundImage: `url(${chatBackground})`,
            height: this.state.height - 150,
        });
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
                        this.props.receiver !== [] ? (
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
                    />
                    <CardContent id="cardMessage" style={
                        {
                            height: this.state.height - 100,
                            overflowY: "hidden",
                        }
                    } >
                        <ScrollToBottom className={ROOT_CSS}>
                            {this.props.isFetching && (<SystemMessage text={<CircularProgress size={22} />} />)}
                            {

                                this.state.messages.length > 0 ? (
                                    <MessageList
                                        className='message-list'
                                        lockable={true}
                                        toBottomHeight={this.state.height}
                                        dataSource={this.state.messageData} />)
                                    :
                                    (<SystemMessage text={' No message sent'} />)
                            } {
                                this.state.queuedMessage.length > 0 && (
                                    this.state.queuedMessage.map((message) => (
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
                                                dateString={date.format(now, 'hh:mm A')}
                                                status={"waiting"} />
                                        </React.Fragment>
                                    ))
                                )
                            } 
                        </ScrollToBottom>
                      
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
    receiver: state.chat.receiver,
    chats: state.chat.chats.data,
    receiver: state.chat.receiver,
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
    channel: PropTypes.string.isRequired,
    receiver: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(ChatArena);