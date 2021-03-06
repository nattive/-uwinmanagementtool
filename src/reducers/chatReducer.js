import {
    INIT_CHAT,
    FETCHING_CHATS,
    FETCHED_CHATS,
    NULL_CHAT_ERR,
    FETCHED_CHAT,
    CHAT_ERROR,
    CHAT_SUCCESS,
    NULL_ACTIVE_CHAT_CHATS,
    NULL_CHATS,
    INIT_CHAT_PUSHER,
    ACTIVE_CHAT,
    NEW_MESSAGE,
    MY_SENT_MESSAGE,
    GET_PRIVATE_CHAT,
    GETTING_PRIVATE_CHAT,
    ERROR_PRIVATE_CHAT,
    PRIVATE_CHATS,
} from "../actions/types";
import Echo from "laravel-echo";
import socketio from "socket.io-client";
import { baseUrl, baseUrlNoApi } from "../Misc/baseUrl";
import EchoRedux from 'laravel-echo-redux';
import store from '../Misc/store'
const Pusher = require("pusher-js");

const initialState = {
    echo: null,
    pusher: null,
    isFetching: false,
    chat: [],
    chats: [],
    chatError: null,
    chatSuccess: null,
    activeChat: null,
    newMessage: null,
    myMessage: null,
    /**
     * Private chats
     */
    isFetchingPrivate: false,
    privateChats: [],
    privateChatError: null,
}
const token = localStorage.getItem('uwin_manager_token')

export default function(state = initialState, action) {
    switch (action.type) {
        case INIT_CHAT:
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
                // const initEcho = new Echo({

            // const initEcho = new Pusher('43c8f03f6308989dfc9b', {
            //     authEndpoint: `${baseUrlNoApi}broadcasting/auth`,
            //     cluster: 'eu',
            //     encrypted: true,
            //     auth: {
            //         headers: {
            //             Authorization: "Bearer " + token,
            //         },
            //     }
            // });

            // const initEcho = new Echo({
            //     broadcaster: 'pusher',
            //     key: '43c8f03f6308989dfc9b',
            //     cluster: 'eu',
            //     encrypted: true,
            //     authEndpoint: `${baseUrlNoApi}broadcasting/auth`,
            //     auth: {
            //         headers: {
            //             Authorization: "Bearer " + token,
            //         },
            //     }
            // })
            return {
                ...state,
                echo: true
            }
        case INIT_CHAT_PUSHER:
            var pusher = new Pusher('message.posted', {
                authEndpoint: `${baseUrlNoApi}broadcasting/auth`,
                cluster: 'eu',
                encrypted: false,
                auth: {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            });
            return {
                ...state,
                pusher: pusher
            }

        case FETCHED_CHATS:
            return {
                ...state,
                chats: action.payload
            }
        case NEW_MESSAGE:
            return {
                ...state,
                newMessage: action.payload
            }
        case MY_SENT_MESSAGE:
            return {
                ...state,
                myMessage: action.payload
            }

        case FETCHED_CHAT:
            return {
                ...state,
                chat: action.payload
            }

        case FETCHING_CHATS:
            return {
                ...state,
                isFetching: action.payload
            }

        case NULL_CHATS:
            return {
                ...state,
                chats: []

            }
        case NULL_ACTIVE_CHAT_CHATS:
            return {
                ...state,
                activeChat: null

            }

        case NULL_CHAT_ERR:
            return {
                ...state,
                chatError: null
            }
        case CHAT_ERROR:
            return {
                ...state,
                chatError: action.payload
            }
        case CHAT_SUCCESS:
            return {
                ...state,
                chatSuccess: action.payload
            }
        case ACTIVE_CHAT:
            return {
                ...state,
                activeChat: action.payload
            }
        case GET_PRIVATE_CHAT:
            return {
                ...state,
                isFetchingPrivate: false,
                // privateChat: null,
                privateChatError: null,
                privateChatSuccess: null,
            }
        case GETTING_PRIVATE_CHAT:
            return {
                ...state,
                isFetchingPrivate: true
            }
        case ERROR_PRIVATE_CHAT:
            return {
                ...state,
                privateChatError: action.payload,
            }
        case PRIVATE_CHATS:
            return {
                ...state,
                privateChats: action.payload,
                isFetchingPrivate: false,
                privateChatError: null,
            }

        default:
            return {
                ...state
            }
    }
}