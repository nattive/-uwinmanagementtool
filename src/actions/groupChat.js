// 
// 
// 
// 
// 
// 

import {
    CREATE_GROUP,
    CREATING_GROUP,
    ERR_CREATING_GROUP,
    GROUP_CREATED,
    FETCHING_GROUPS,
    FETCHED_GROUPS,
    FETCHED_GROUP,
    FETCH_GROUP,
    ERR_FETCHING_GROUPS,
    INIT_GROUP_CHAT,
    ERR_INIT_GROUP_CHAT,
    UPDATE_GROUP,
    UPDATING_GROUP,
    ERR_UPDATING_GROUP,
    GROUP_UPDATED,
    ADD_USER_TO_GROUP,
    ADDING_USER_TO_GROUP,
    ERR_ADDING_USER_TO_GROUP,
    USERS_ADDED,
    SEND_GROUP_MESSAGE,
    GROUP_MESSAGE_SENT,
    ERR_SENDING_GROUP_MESSAGE,
    ACTIVE_CHAT,
    FETCHED_CHATS,
    CHAT_ERROR,
    NULL_CHAT_ERR,
    NULL_CHATS,
    FETCHING_CHATS,
} from './types'
import Axios from 'axios'
import { baseUrl } from '../Misc/baseUrl'
import store from '../Misc/store';

export const initGroup = (id) => dispatch => {

    // console.log(data);
    // dispatch({ type: CREATE_GROUP })

    const token = localStorage.getItem('uwin_manager_token')

    Axios.get(`${baseUrl}chat/group/init/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
            console.log(res)
            dispatch({
                type: INIT_GROUP_CHAT,
                payload: res.data.data
            })
            dispatch({
                type: FETCHED_CHATS,
                payload: res.data.data
            })

            dispatch({
                type: ACTIVE_CHAT,
                payload: {
                    channel: res.data.data.channel,
                    chat: res.data.data.chat
                }
            })
        }

    ).catch(err => {
        dispatch({
            type: ERR_INIT_GROUP_CHAT,
            payload: err.response
        })
    })
}

export const createGroup = (data) => dispatch => {

    console.log(data);
    dispatch({ type: CREATE_GROUP })
    dispatch({ type: CREATING_GROUP })

    const token = localStorage.getItem('uwin_manager_token')

    Axios.post(`${baseUrl}chat/group/store`, {
        name: data.name,
        users: data.users,
    }, {
        headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
            console.log(res)
            dispatch({
                type: GROUP_CREATED,
                payload: res.data
            })
        }

    ).catch(err => {
        dispatch({
            type: ERR_CREATING_GROUP,
            payload: err.response
        })
    })
}

export const updateGroup = (data) => dispatch => {
    console.log(data);
    dispatch({ type: UPDATE_GROUP })
    dispatch({ type: UPDATING_GROUP })

    const token = localStorage.getItem('uwin_manager_token')

    Axios.post(`${baseUrl}chat/group/update`, {
        name: data.name,
        users: data.users,
        description: data.description,
    }, {
        headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
            console.log(res)
            dispatch({
                type: GROUP_UPDATED,
                payload: res.data
            })
        }

    ).catch(err => {
        dispatch({
            type: ERR_UPDATING_GROUP,
            payload: err.response
        })
    })
}

export const addUsers = (users) => dispatch => {
    console.log(users);
    dispatch({ type: ADD_USER_TO_GROUP })
    dispatch({ type: ADDING_USER_TO_GROUP })

    const token = localStorage.getItem('uwin_manager_token')

    Axios.post(`${baseUrl}chat/group/addUser`, {
        users: users,
    }, {
        headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
            console.log(res)
            dispatch({
                type: USERS_ADDED,
                payload: res.data
            })
        }

    ).catch(err => {
        dispatch({
            type: ERR_ADDING_USER_TO_GROUP,
            payload: err.response
        })
    })
}

export const sendGroupMessage = (data) => dispatch => {

    console.log(data);
    dispatch({ type: SEND_GROUP_MESSAGE })

    const token = localStorage.getItem('uwin_manager_token')

    Axios.post(`${baseUrl}chat/group/groupChat`, {
        text: data.text,
        group_id: data.group_id,
    }, {
        headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
            console.log(res)
            dispatch({
                type: GROUP_MESSAGE_SENT,
                payload: res.data
            })
        }

    ).catch(err => {
        dispatch({
            type: CHAT_ERROR,
            payload: {
                error: err.message || err.response !== undefined ? err.response.data : JSON.stringify(err),
                text: data.text
            }
        })
    })
}


export const getMyGroups = () => dispatch => {

    const token = localStorage.getItem('uwin_manager_token')
    dispatch({
        type: FETCHING_GROUPS,
    })


    dispatch({
        type: FETCH_GROUP
    })

    Axios.get(`${baseUrl}chat/group/myGroup`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
            dispatch({
                type: FETCHED_GROUPS,
                payload: res.data.data
            })
        })
        .catch((err) => {
            dispatch({
                type: ERR_FETCHING_GROUPS,
                payload: err.response
            })
        });
}


export const fetchGroupChatsById = (id) => dispatch => {

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

    Axios.get(`${baseUrl}chat/group/get_messages/${id}`, {
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