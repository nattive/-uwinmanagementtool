import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import date from 'date-and-time';
import ChatBox, { ChatFrame } from 'react-chat-plugin';
import './chat.css'
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
    Avatar,
} from "@material-ui/core";
import { css } from 'glamor';
// import ScrollToBottom from 'react-scroll-to-bottom';
// import { GiftedChat } from 'react-gifted-chat';
import {
    fetchChats,
    postMessage,
    initPrivateChat,
    fetchChatsById, toggleOnline
} from "../../../actions/chatAction";
import { sendGroupMessage, fetchGroupChatsById } from "../../../actions/groupChat";
import SendIcon from "@material-ui/icons/Send";
import store from "../../../Misc/store";
import { FETCHED_CHAT } from "../../../actions/types";
import MessageIcon from '@material-ui/icons/Message';
import "react-chat-elements/dist/main.css";
import { makeStyles } from '@material-ui/core/styles';
import Echo from "laravel-echo";
import chatBackground from "./image/chat.jpg";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { getUser } from "../../../actions/usersAction";
import { baseUrlNoApi } from "../../../Misc/baseUrl";
import ChatSideAreaMenu from "./ChatSideAreaMenu";
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
            isTyping: true,
            messageData: [],
            width: 0, height: 0
        };

        // this.containsObject = this.containsObject.bind(this);
        this.handlePostMessage = this.handlePostMessage.bind(this);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentWillReceiveProps(newProps) {
        if (newProps.chatError !== this.props.chatError && newProps.chatError && newProps.chatError.text !== undefined) {
            const newMessage = {
                author: {
                    username: this.props.manager.user.name,
                    id: this.props.manager.user.id,
                    avatarUrl: this.props.manager.user.thumbnail_url
                },
                text: newProps.chatError.text,
                timestamp: +new Date(),
                type: 'text',
                id: Math.random() * 10,
                hasError: true,
            }
            this.setState((state) => {
                return { messageData: state.messageData.concat(newMessage) };
            });

        }
        if (newProps.chats && newProps.chats !== this.props.chats) {
            // this.setState({ messages: newProps.chats.chat_messages });
            newProps.chats.messages && newProps.chats.messages.length > 0 ?
                newProps.chats.messages.map(message => {
                    this.state.messageData.push(
                        message
                    )
                }) : this.setState({ messageData: [] })
        }
        if (newProps.FetchedManager !== this.props.FetchedManager) {
            this.setState({ receiver: newProps.FetchedManager });
        }

        if (newProps.receiver !== this.props.receiver) {
            this.setState({ receiver: newProps.receiver });
        }
        if (newProps.activeChat !== this.props.activeChat && newProps.activeChat) {

            const token = localStorage.getItem('uwin_manager_token')

            newProps.receiver && newProps.receiver.type !== 'group' ? newProps.fetchChatsById(newProps.activeChat.chat.id) : newProps.fetchGroupChatsById(newProps.receiver.id);

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
                .join('notification.' + this.props.manager.id)
                .here(user => {
                    console.log(user);
                })
                .listen('.notification', (event) => {
                    console.log(event)
                })

            window.Echo
                .join(newProps.activeChat.channel)
                .here(user => {
                    console.log(user);
                })
                // .joining(user => {
                //     console.log(user);
                //     this.props.toggleOnline({ isOnline: true, user_id: user.id })

                // })
                // .leaving(user => {
                //     this.props.toggleOnline({ isOnline: false, user_id: user.id })
                //     console.log(user)
                // })
                .listenForWhisper('typing', (e) => {
                    //   this.user = e.user;
                    this.setState({ isTyping: true })
                    console.log(e)
                    // remove is typing indicator after 0.9s
                    setTimeout(function () {
                        this.setState({ isTyping: false })
                    }, 900);
                })
                .listen('.chat', (event) => {

                    const { message } = event
                    console.log(message)
                    this.setState({ queuedMessage: [] })
                    if (message.user_id === this.props.manager.user.id) {
                        return
                    }
                    const newMessage = {
                        id: message.user_id,
                        text: message.text,
                        type: 'text',
                        timestamp: message.updated_at,
                        author: {
                            id: message.user_id,
                            avatarUrl: this.props.receiver.thumbnail_url,
                            username: this.props.receiver.name,
                        },
                    }
                    this.setState((state) => {
                        return { messageData: state.messageData.concat(newMessage) };
                    });
                    // let newMessagemessage = this.state.messageData.find(obj => obj.author.id === message.user_id);
                    // console.log(newMessagemessage);

                })
        }
    }


    handlePostMessage(message) {
        const now = new Date();
        // this.state.queuedMessage.push({
        //     user_id: this.props.manager.user.id,
        //     receiver_id: this.state.receiver.id,
        //     text: this.state.message,
        //     updated_at: date.format(now, 'hh:mm A'),
        //     created_at: date.format(now, 'hh:mm A'),
        //     id: Math.random() * 10
        // })
        var newMessage = {}
        if (this.props.activeChat) {
            if (this.props.receiver.type === 'group') {
                this.props.sendGroupMessage({
                    text: message,
                    group_id: this.props.receiver.id
                })
                newMessage = {
                    author: {
                        username: this.props.manager.user.name,
                        id: this.props.manager.user.id,
                        avatarUrl: this.props.manager.user.thumbnail_url
                    },
                    text: message,
                    timestamp: +new Date(),
                    type: 'text',
                    id: Math.random() * 10
                }
            } else {
                this.props.postMessage(
                    message,
                    this.props.receiver.id,
                    this.props.activeChat.chat.id
                )
                newMessage = {
                    author: {
                        username: this.props.manager.user.name,
                        id: this.props.manager.user.id,
                        avatarUrl: this.props.manager.user.thumbnail_url
                    },
                    text: message,
                    timestamp: +new Date(),
                    type: 'text',
                    id: Math.random() * 10
                }
            }

        } else {
            newMessage = {
                author: {
                    username: this.props.manager.user.name,
                    id: this.props.manager.user.id,
                    avatarUrl: this.props.manager.user.thumbnail_url
                },
                text: message,
                timestamp: +new Date(),
                type: 'text',
                hasError: true,
                id: Math.random() * 10
            }
        }
        this.setState((state) => {
            return { messageData: state.messageData.concat(newMessage) };
        });
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

    isTyping() {
        let channel = window.Echo
            .join(this.props.activeChat.channel)

        setTimeout(function () {
            channel.whisper('typing', {
                user: this.manageer.user,
                typing: true
            });
        }, 300);
    }
    render() {
        const { innerWidth: width, innerHeight: height } = window;
        const now = new Date();
        const ROOT_CSS = css({
            backgroundImage: `url(${chatBackground})`,
            height: this.state.height - 150,
        });
        const { anchorEl } = this.state;
        const { receiver } = this.props
        return (
            <>
                <Card styled={{ backgroundColor: '#373737044' }}>
                    <CardHeader title={
                        this.props.receiver !== [] ? (
                            this.props.receiver.name
                        ) : (<CircularProgress />
                            )
                    }
                        subheader={'participants: ' + receiver && receiver.type === 'group' ? receiver.users.length > 0 && receiver.users.map(user => user.name + ', ') : receiver.isOnline === 1 ? "online" : "Offline"}
                        avatar={<Avatar src={this.props.receiver.thumbnail_url || ''} />}
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
                            backgroundColor: '#fff'
                        }
                    } >
                        <ChatBox
                            showTypingIndicator={this.state.isTyping}
                            style={{ border: 'none' }}
                            messages={this.state.messageData}
                            userId={this.props.manager.user.id}
                            onSendMessage={this.handlePostMessage}
                            width={'10000px'}
                            height={this.state.height - 155}
                        />
                    </CardContent>
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
    chats: state.chat.chats,
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
    toggleOnline,
    sendGroupMessage,
    fetchGroupChatsById
};

ChatArena.propTypes = {
    channel: PropTypes.string.isRequired,
    receiver: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(ChatArena);