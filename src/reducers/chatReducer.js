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
    OPEN_CHAT,
    GET_ONLINE_MANAGERS,
    GETTING_ONLINE_MANAGERS,
    ONLINE_MANAGERS,
    ERROR_GETTING_ONLINE_MANAGERS,
    OPEN_NOTIFICATION,
    OPEN_TOP_NOTIFICATION,
    CREATE_GROUP,
    CREATING_GROUP,
    ERR_CREATING_GROUP,
    GROUP_CREATED,
    FETCHED_GROUPS,
    FETCH_GROUP,
    ERR_FETCHING_GROUPS,
    FETCHED_GROUP,
    FETCHING_GROUPS
} from "../actions/types";
// import Echo from "laravel-echo";
import socketio from "socket.io-client";
import { baseUrl, baseUrlNoApi } from "../Misc/baseUrl";
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
    hasInitiatedChat: false,
    privateChats: [],
    receiver: [],
    privateChatError: null,
    notification: null,
    notifications: [],
    /**
     * Who is online
     */
    onlineManager: [],
    OM_err: null,
    isFetchingOM: false,
    /**
     * Chat Group
     */
    isCreatingGroup: false,
    errCreatingGroup: null,
    groupSuccess: null,
    group: {},
    isFetchingGroup: false,
    fetchedGroups: [],
    fetchedGroup: {},
    errFetchingGroups: null
}
const token = localStorage.getItem('uwin_manager_token')
    //uwinitni_uwinitnigeria
    //uwinBet9ja10
export default function(state = initialState, action) {
    switch (action.type) {
        case INIT_CHAT:

            return {
                ...state,
                echo: true
            }

        case FETCHED_CHATS:
            return {
                ...state,
                chats: action.payload
            }
        case OPEN_CHAT:
            return {
                ...state,
                receiver: action.payload,
                hasInitiatedChat: true,
                chats: [],
            }

        case NEW_MESSAGE:
            return {
                ...state,
                newMessage: action.payload
            }
        case OPEN_NOTIFICATION:
            return {
                ...state,
                notification: action.payload,
            }
        case OPEN_TOP_NOTIFICATION:
            return {
                ...state,
                notifications: initialState.notifications.push(action.payload)
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
        case GET_ONLINE_MANAGERS:
            return {
                ...state,
                onlineManager: [],
                OM_err: null,
                isFetchingOM: false,

            }
        case GETTING_ONLINE_MANAGERS:
            return {
                ...state,
                isFetchingOM: true
            }
        case ONLINE_MANAGERS:
            return {
                ...state,
                onlineManager: action.payload,
                OM_err: null,
                isFetchingOM: false
            }
        case ERROR_GETTING_ONLINE_MANAGERS:
            return {
                ...state,
                isFetchingOM: false,
                OM_err: action.payload,
            }
        case FETCH_GROUP:
            return {
                ...state,
                isFetchingGroup: false,
                fetchedGroups: [],
                fetchedGroup: {},
                errFetchingGroups: null
            }
        case FETCHING_GROUPS:
            return {
                ...state,
                isFetchingGroup: true,
            }

        case FETCHED_GROUPS:
            return {
                ...state,
                isFetchingGroup: false,
                fetchedGroups: action.payload
            }
        case ERR_FETCHING_GROUPS:
            return {
                ...state,
                isFetchingGroup: false,
                errFetchingGroups: action.payload,
            }
        case FETCHED_GROUP:
            return {
                ...state,
                isFetchingGroup: false,
                fetchedGroup: action.payload,
            }

        case CREATE_GROUP:
            return {
                ...state,
                isCreatingGroup: false,
                errCreatingGroup: null,
                group: {}
            }
        case CREATING_GROUP:
            return {
                ...state,
                isCreatingGroup: true,
            }
        case ERR_CREATING_GROUP:
            return {
                ...state,
                isCreatingGroup: false,
                errCreatingGroup: action.payload,
            }
        case GROUP_CREATED:
            return {
                ...state,
                isCreatingGroup: false,
                errCreatingGroup: null,
                group: action.payload,
                groupSuccess: "Group created Succesfully"
            }

        default:
            return {
                ...state
            }
    }
}