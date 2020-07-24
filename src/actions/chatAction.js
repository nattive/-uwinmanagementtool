import {
    INIT_CHAT,
    FETCHING_CHATS,
    FETCHED_CHATS,
    NULL_ACTIVE_CHAT_CHATS,
    NULL_CHAT_ERR,
    CHAT_SUCCESS,
    CHAT_ERROR,
    ACTIVE_CHAT,
    NULL_CHATS
} from './types'
import Axios from 'axios'
import { baseUrl } from '../Misc/baseUrl'
import store from '../Misc/store';

export const fetchChats = () => dispatch => {

    const token = localStorage.getItem('uwin_manager_token')
    dispatch({
        type: NULL_CHAT_ERR,
    })

    dispatch({
        type: FETCHING_CHATS,
        payload: true
    })

    Axios.get(`${baseUrl}chat/messages`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
            dispatch({
                type: FETCHED_CHATS,
                payload: res.data
            })
            dispatch({
                type: FETCHING_CHATS,
                payload: false
            })
        })
        .catch((err) => {
            dispatch({
                type: CHAT_ERROR,
                payload: err.response
            })
            dispatch({
                type: FETCHING_CHATS,
                payload: false
            })
        });
}


export const fetchChatsById = (id) => dispatch => {

    const token = localStorage.getItem('uwin_manager_token')
    dispatch({
            type: NULL_CHAT_ERR,
        })
        /**
         * ToDo: null all messages
         */
    dispatch({
        type: NULL_CHATS,
    })


    dispatch({
        type: FETCHING_CHATS,
        payload: true
    })

    Axios.get(`${baseUrl}chat/messages/chat-id/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
            console.log(res.data);
            dispatch({
                type: FETCHED_CHATS,
                payload: res.data
            })
            dispatch({
                type: FETCHING_CHATS,
                payload: false
            })
        })
        .catch((err) => {
            dispatch({
                type: CHAT_ERROR,
                payload: err.response
            })
            dispatch({
                type: FETCHING_CHATS,
                payload: false
            })
        });
}


export const initPrivateChat = (receiver_id) => dispatch => {

    const token = localStorage.getItem('uwin_manager_token')
    dispatch({
        type: NULL_CHAT_ERR,
    })
    dispatch({
        type: NULL_ACTIVE_CHAT_CHATS,
    })
    dispatch({
        type: FETCHING_CHATS,
        payload: true
    })

    Axios.post(`${baseUrl}chat/private/init`, {
            receiver_id,
        }, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
            console.log(res);
            dispatch({
                type: ACTIVE_CHAT,
                payload: res.data
            })
            dispatch({
                type: FETCHING_CHATS,
                payload: false
            })
        })
        .catch((err) => {
            dispatch({
                type: CHAT_ERROR,
                payload: err.response
            })
            dispatch({
                type: FETCHING_CHATS,
                payload: false
            })
        });
}


export const postMessage = (text, receiver_id, chat) => dispatch => {
    console.log(text);
    const token = localStorage.getItem('uwin_manager_token')
    dispatch({
        type: NULL_CHAT_ERR,
    })

    Axios.post(
            `${baseUrl}chat/messages`, {
                receiver_id: receiver_id,
                text: text,
                chatId: chat
            }, {
                headers: { Authorization: `Bearer ${token}` },
            }
        )
        .then((res) => {
            dispatch({
                type: CHAT_SUCCESS,
                payload: res.data
            })
        })
        .catch((err) => {
            dispatch({
                type: CHAT_ERROR,
                payload: err.response
            })
        });
}