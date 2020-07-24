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
    ACTIVE_CHAT
} from "../actions/types";
import Echo from "laravel-echo";
import socketio from "socket.io-client";

const initialState = {
    echo: null,
    isFetching: false,
    chat: [],
    chats: [],
    chatError: null,
    chatSuccess: null,
    activeChat: null
}
const token = localStorage.getItem('uwin_manager_token')

export default function(state = initialState, action) {
    switch (action.type) {
        case INIT_CHAT:
            const initEcho = new Echo({
                host: "http://127.0.0.1:5050",
                broadcaster: "socket.io",
                client: socketio,
                auth: {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                },
            });
            return {
                ...state,
                echo: initEcho
            }
        case FETCHED_CHATS:
            return {
                ...state,
                chats: action.payload
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
        default:
            return {
                ...state
            }
    }
}