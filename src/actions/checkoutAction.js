import {
    CHECKING_CHECKLIST,
    START_STORING_CHECKLIST,
    STOP_STORING_CHECKLIST,
    ERR_STORING_CHECKLIST,
    ERR_CHECKLIST_EXIST_STATUS,
    CHECKLIST_EXIST_STATUS,
    OPEN_DIALOG,
    HAS_STORED_CHECKLIST,
    APP_IS_LOADING,
    NEXT_CHECKLIST
} from './types'
import axios from 'axios'
import store from '../Misc/store'
import { baseUrl } from '../Misc/baseUrl'

export const ChecklistExist = (id) => dispatch => {
    dispatch({
        type: CHECKING_CHECKLIST
    })
    dispatch({
        type: APP_IS_LOADING,
        payload: true
    })

    const token = localStorage.getItem('uwin_manager_token')

    axios.get(`${baseUrl}checklist/check`, {
        headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
            dispatch({
                type: OPEN_DIALOG,
                payload: res.data
            })
            dispatch({
                type: APP_IS_LOADING,
                payload: false
            })

        }

    ).catch(err => {
        dispatch({
            type: ERR_CHECKLIST_EXIST_STATUS,
            payload: err.response
        })
        dispatch({
            type: APP_IS_LOADING,
            payload: false
        })
    })
}

export const getLatestChecklist = (id) => dispatch => {
    dispatch({
        type: CHECKING_CHECKLIST
    })

    const token = localStorage.getItem('uwin_manager_token')

    axios.get(`${baseUrl}checklist/latest`, {
        headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
            console.log(res.data)
            dispatch({
                type: NEXT_CHECKLIST,
                payload: res.data
            })

        }

    ).catch(err => {
        dispatch({
            type: ERR_CHECKLIST_EXIST_STATUS,
            payload: err.response
        })
        dispatch({
            type: APP_IS_LOADING,
            payload: false
        })
    })
}

export const storeChecklist = () => dispatch => {
    dispatch({
        type: APP_IS_LOADING,
        payload: true
    })
    dispatch({
        type: START_STORING_CHECKLIST
    })
    const token = localStorage.getItem('uwin_manager_token')

    axios.get(`${baseUrl}checklist/store`, {
        headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
            console.log(res)
            dispatch({
                type: HAS_STORED_CHECKLIST,
                payload: res.data.itExist === 'false' ? false : true
            })
            dispatch({
                type: APP_IS_LOADING,
                payload: false
            })

            dispatch({
                type: OPEN_DIALOG,
                payload: res.data.itExist === 'false' ? true : false
            })

        }

    ).catch(err => {
        dispatch({
            type: APP_IS_LOADING,
            payload: false
        })
        dispatch({
            type: ERR_STORING_CHECKLIST,
            payload: err.response
        })
    })
}