import {
    INIT_CHAT,
    FETCHING_CHATS,
    FETCHED_CHATS,
    NULL_ACTIVE_CHAT_CHATS,
    NULL_CHAT_ERR,
    CHAT_SUCCESS,
    CHAT_ERROR,
    ACTIVE_CHAT,
    NULL_CHATS,
    MY_SENT_MESSAGE,
    GET_PRIVATE_CHAT,
    GETTING_PRIVATE_CHAT,
    ERROR_PRIVATE_CHAT,
    PRIVATE_CHATS,
    GET_ONLINE_MANAGERS,
    ERROR_GETTING_ONLINE_MANAGERS,
    ONLINE_MANAGERS,
    GETTING_ONLINE_MANAGERS,
    UPDATE_PROFILE,
    UPDATING_PROFILE,
    STORE_USER,
    ERR_UPDATING_PROFILE
} from './types'
import Axios from 'axios'
import { baseUrl } from '../Misc/baseUrl'
import store from '../Misc/store';
// 
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

export const getOnlineManagers = () => dispatch => {

    const token = localStorage.getItem('uwin_manager_token')
    dispatch({
        type: GET_ONLINE_MANAGERS,
    })

    dispatch({
        type: GETTING_ONLINE_MANAGERS,
    })

    Axios.get(`${baseUrl}chat/online/all`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
            dispatch({
                type: ONLINE_MANAGERS,
                payload: res.data
            })
        })
        .catch((err) => {
            dispatch({
                type: ERROR_GETTING_ONLINE_MANAGERS,
                payload: err.message || err.response && err.response.data || JSON.stringify(err) || 'An error occurred while fetching data'
            })
        });
}

export const fetchPrivateChats = () => dispatch => {

    const token = localStorage.getItem('uwin_manager_token')
    dispatch({
        type: GET_PRIVATE_CHAT,
    })

    dispatch({
        type: GETTING_PRIVATE_CHAT
    })

    Axios.get(`${baseUrl}chat/all`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
            dispatch({
                type: PRIVATE_CHATS,
                payload: res.data.data
            })
        })
        .catch((err) => {
            dispatch({
                type: ERROR_PRIVATE_CHAT,
                payload: err.response
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
            dispatch({
                type: MY_SENT_MESSAGE,
                payload: text
            })

        })
        .catch((err) => {
            dispatch({
                type: CHAT_ERROR,
                payload: err.response
            })
        });
}


export const toggleOnline = (data) => dispatch => {

    console.log(data);
    dispatch({ type: UPDATE_PROFILE })
    dispatch({ type: UPDATING_PROFILE })

    const token = localStorage.getItem('uwin_manager_token')

    Axios.post(`${baseUrl}users/update/${data.user_id}`, {
        isOnline: data.isOnline,
    }, {
        headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
            console.log(res)
            dispatch({
                type: STORE_USER,
                payload: res.data
            })
        }

    ).catch(err => {
        dispatch({
            type: ERR_UPDATING_PROFILE,
            payload: err.response
        })
    })
}