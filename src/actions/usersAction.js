import {
    FETCHING_USERS,
    FETCHED_USERS,
    ERR_FETCHING_USERS,
    NULL_ALL_ERRORS,
    FETCHED_USER,
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