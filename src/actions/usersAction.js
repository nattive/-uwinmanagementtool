import {
    FETCHING_USERS,
    FETCHED_USERS,
    ERR_FETCHING_USERS,
    NULL_ALL_ERRORS,
    FETCHED_USER,
    UPDATE_PROFILE,
    UPDATING_PROFILE,
    ERR_UPDATING_PROFILE,
    STORE_USER,
    HAS_UPDATED_PROFILE,
    STORE_NOTIFICATION,
    GET_NOTIFICATION
} from './types'
import axios from 'axios'
import { baseUrl } from '../Misc/baseUrl'


export const getUsers = () => dispatch => {
    dispatch({
        type: NULL_ALL_ERRORS
    })
    dispatch({
        type: FETCHING_USERS,
        payload: true
    })

    const token = localStorage.getItem('uwin_manager_token')

    axios.get(`${baseUrl}users/active/all`, {
        headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
            console.log(res)
            dispatch({
                type: FETCHED_USERS,
                payload: res.data
            })
            dispatch({
                type: FETCHING_USERS,
                payload: false
            })

        }

    ).catch(err => {
        dispatch({
            type: ERR_FETCHING_USERS,
            payload: err.response
        })
        dispatch({
            type: FETCHING_USERS,
            payload: false
        })
    })
}

export const getUser = (id) => dispatch => {
    console.log(id);
    dispatch({
        type: NULL_ALL_ERRORS
    })
    dispatch({
        type: FETCHING_USERS,
        payload: true
    })

    const token = localStorage.getItem('uwin_manager_token')

    axios.get(`${baseUrl}users/get/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
            console.log(res)
            dispatch({
                type: FETCHED_USER,
                payload: res.data
            })
            dispatch({
                type: FETCHING_USERS,
                payload: false
            })

        }

    ).catch(err => {
        dispatch({
            type: ERR_FETCHING_USERS,
            payload: err.response
        })
        dispatch({
            type: FETCHING_USERS,
            payload: false
        })
    })
}

export const updateProfile = (data) => dispatch => {

    console.log(data);
    dispatch({ type: UPDATE_PROFILE })
    dispatch({ type: UPDATING_PROFILE })

    const token = localStorage.getItem('uwin_manager_token')

    axios.post(`${baseUrl}users/update/${data.user_id}`, {
        name: data.name,
        password: data.password,
        location: data.location,
        email: data.email,
        phoneNumber: data.phoneNumber,
        guarantorPhone: data.guarantorPhone,
        guarantorAddress: data.guarantorAddress,
        thumbnail_url: data.thumbnail_url,
        url: data.url,
        user_id: data.user_id,
        oldPassword: data.oldPassword,
        isOnline: data.isOnline,
    }, {
        headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
            console.log(res)
            dispatch({
                type: STORE_USER,
                payload: res.data
            })
            dispatch({
                type: HAS_UPDATED_PROFILE
            })

        }

    ).catch(err => {
        dispatch({
            type: ERR_UPDATING_PROFILE,
            payload: err.response
        })
    })
}
export const storeNotification = (data) => dispatch => {

    const token = localStorage.getItem('uwin_manager_token')
    const {
        title,
        body,
        type,
    } = data
    axios.post(`${baseUrl}notification`, {
        title,
        body,
        type,
    }, {
        headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
        console.log(res)
        dispatch({
            type: STORE_NOTIFICATION,
            payload: res.data
        })
    })
}