import axios from 'axios'
import { baseUrl } from '../Misc/baseUrl'
import {
    AUTH_IS_LOADING,
    AUTH_STOPPED_LOADING,
    HAS_REGISTER,
    ERR_REGISTER,
    NULL_ERR_REGISTER,
    ERR_LOGIN,
    NULL_ERR_LOGIN,
    GEN_PASSWORD,
    STORE_USER,
    TOKEN
} from './types'
import { ChecklistExist } from './checkoutAction'
import jwt from 'jsonwebtoken'

export const login = (email, password) => dispatch => {
    dispatch({
        type: NULL_ERR_LOGIN
    })
    dispatch({
        type: AUTH_IS_LOADING
    })

    axios.post(`${baseUrl}auth/login`, {
        email: email,
        password: password
    }).then(res => {
        console.log(res)
        localStorage.removeItem('uwin_manager_token')
        localStorage.setItem('uwin_manager_token', res.data.success.token)
        dispatch({
            type: AUTH_STOPPED_LOADING
        })
        dispatch({
            type: TOKEN,
            payload: res.data.success.token
        })
        dispatch({
            type: STORE_USER,
            payload: res.data.user
        })
        dispatch(ChecklistExist(res.data.user.id))

    }).catch(err => {
        console.log(err.response)
        if (err.response !== undefined && err.response.status === 500) {
            dispatch({
                type: AUTH_STOPPED_LOADING
            })
            dispatch({
                type: ERR_LOGIN,
                payload: 'Server Error'
            })
        } else {

            dispatch({
                type: AUTH_STOPPED_LOADING
            })
            dispatch({
                type: ERR_LOGIN,
                payload: err.response !== undefined && err.response.data ? err.response.data.error : JSON.stringify(err.response)
            })
        }

    })
}
export const register = data => dispatch => {

    dispatch({
        type: NULL_ERR_REGISTER
    })
    dispatch({
        type: AUTH_IS_LOADING
    })

    axios.post(`${baseUrl}auth/signup`, {
        business_unit: data.business_unit,
        isHOM: data.isHOM,
        duty: 'manager',
        isActive: 'true',
        email: data.email,
        head_of_manager_id: data.head_of_manager_id,
        name: data.name,
        password: data.password,
    }).then(res => {
        console.log(res)
        dispatch({
            type: AUTH_STOPPED_LOADING
        })
        dispatch({
            type: HAS_REGISTER,
            payload: res.status === 200 || res.status === 201 ? true : false
        })

    }).catch(err => {
        console.log(err.response)
        dispatch({
            type: AUTH_STOPPED_LOADING
        })
        dispatch({
            type: ERR_REGISTER,
            payload: err.response.data
        })
    })
}

export const generatePassword = () => dispatch => {

    var length = 10,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    dispatch({
        type: GEN_PASSWORD,
        payload: retVal
    })
}

export const verifyRedirect = () => dispatch => {
    const token = localStorage.getItem('uwin_manager_token')

    axios.get(`${baseUrl}auth/user`, { headers: { Authorization: `Bearer ${token}` } })
        .then(res => {
            console.log(res)
            dispatch({
                type: AUTH_IS_LOADING
            })
            dispatch({
                type: STORE_USER,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err.response)
            dispatch({
                type: AUTH_STOPPED_LOADING
            })
            dispatch({
                type: ERR_LOGIN,
                payload: err.response ? err.response.data : JSON.stringify(err)
            })
        })

}