import {
    INIT_CHAT,
    FETCHING_CHATS,
    FETCHED_CHATS,
    FETCHED_CHAT,
    NULL_CHAT_ERR,
    CHAT_SUCCESS,
    CHAT_ERROR
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


export const postMessage = (message) => dispatch => {

    const token = localStorage.getItem('uwin_manager_token')
    dispatch({
        type: NULL_CHAT_ERR,
    })


    Axios.post(
            `${baseUrl}chat/messages`, {
                text: message,
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