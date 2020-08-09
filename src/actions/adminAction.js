import {
    GET_ALL_WSKA_REPORT,
    GETTING_ALL_WSKA_REPORT,
    ERR_ALL_WSKA_REPORT,
    ALL_WSKA_REPORT,
    GET_ALL_SFCR_REPORT,
    GETTING_ALL_SFCR_REPORT,
    ERR_ALL_SFCR_REPORT,
    ALL_SFCR_REPORT,
    GET_ALL_SALES_REPORT,
    GETTING_ALL_SALES_REPORT,
    ERR_ALL_SALES_REPORT,
    ALL_SALES_REPORT,
    APPROVING_REPORT,
    ERR_APPROVING_REPORT,
    REPORT_APPROVED,
    APPROVE_REPORT,
    ADMIN_FETCHING_ROLES,
    FETCH_ROLES,
    ADMIN_FETCHED_ROLES,
    ADMIN_ERR_FETCHING_ROLES,
    ADMIN_FETCHING_USERS,
    ADMIN_FETCHED_USERS,
    ADMIN_FETCHED_USER,
    ADMIN_ERR_FETCHING_USERS,
    NULL_ALL_ERRORS,
} from './types'
import { baseUrl } from '../Misc/baseUrl'
import Axios from 'axios'

export const getAllRoles = () => dispatch => {
    dispatch({
        type: ADMIN_FETCHING_ROLES
    })
    dispatch({
        type: FETCH_ROLES
    })

    const token = localStorage.getItem('uwin_manager_token')

    Axios.get(`${baseUrl}supervisor/roles/list`, {
        headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
            console.log(res)
            dispatch({
                type: ADMIN_FETCHED_ROLES,
                payload: res.data
            })

        }

    ).catch(err => {
        dispatch({
            type: ADMIN_ERR_FETCHING_ROLES,
            payload: err.response
        })
    })
}

export const getAllWskpa = () => dispatch => {
    dispatch({
        type: GETTING_ALL_WSKA_REPORT
    })
    dispatch({
        type: GET_ALL_WSKA_REPORT
    })

    const token = localStorage.getItem('uwin_manager_token')

    Axios.get(`${baseUrl}supervisor/report/wskpa`, {
        headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
            console.log(res)
            dispatch({
                type: ALL_WSKA_REPORT,
                payload: res.data
            })

        }

    ).catch(err => {
        dispatch({
            type: ERR_ALL_WSKA_REPORT,
            payload: err.response
        })
    })
}


export const getAllWskpaById = (id) => dispatch => {
    dispatch({
        type: GETTING_ALL_WSKA_REPORT
    })
    dispatch({
        type: GET_ALL_WSKA_REPORT
    })

    const token = localStorage.getItem('uwin_manager_token')

    Axios.get(`${baseUrl}supervisor/report/wskpa/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
            console.log(res)
            dispatch({
                type: ALL_WSKA_REPORT,
                payload: res.data
            })

        }

    ).catch(err => {
        dispatch({
            type: ERR_ALL_WSKA_REPORT,
            payload: err.response
        })
    })
}



export const getAllSfcr = () => dispatch => {
    dispatch({
        type: GETTING_ALL_SFCR_REPORT
    })
    dispatch({
        type: GET_ALL_SFCR_REPORT
    })

    const token = localStorage.getItem('uwin_manager_token')

    Axios.get(`${baseUrl}supervisor/report/sfcr`, {
        headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
            console.log(res)
            dispatch({
                type: ALL_SFCR_REPORT,
                payload: res.data
            })

        }

    ).catch(err => {
        dispatch({
            type: ERR_ALL_SFCR_REPORT,
            payload: err.response
        })
    })
}

export const getAllSales = () => dispatch => {
    dispatch({
        type: GETTING_ALL_SALES_REPORT
    })
    dispatch({
        type: GET_ALL_SALES_REPORT
    })

    const token = localStorage.getItem('uwin_manager_token')

    Axios.get(`${baseUrl}supervisor/report/sales`, {
        headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
            console.log(res)
            dispatch({
                type: ALL_SALES_REPORT,
                payload: res.data
            })

        }

    ).catch(err => {
        dispatch({
            type: ERR_ALL_SALES_REPORT,
            payload: err.response
        })
    })
}

export const getAllSfcrById = (id) => dispatch => {
    dispatch({
        type: GETTING_ALL_SFCR_REPORT
    })
    dispatch({
        type: GET_ALL_SFCR_REPORT
    })

    const token = localStorage.getItem('uwin_manager_token')

    Axios.get(`${baseUrl}supervisor/report/sfcr/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
            console.log(res)
            dispatch({
                type: ALL_SFCR_REPORT,
                payload: res.data
            })

        }

    ).catch(err => {
        dispatch({
            type: ERR_ALL_SFCR_REPORT,
            payload: err.response
        })
    })
}

export const getAllSalesById = (id) => dispatch => {
    dispatch({
        type: GETTING_ALL_SALES_REPORT
    })
    dispatch({
        type: GET_ALL_SALES_REPORT
    })

    const token = localStorage.getItem('uwin_manager_token')

    Axios.get(`${baseUrl}supervisor/report/sales/{id}`, {
        headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
            console.log(res)
            dispatch({
                type: ALL_SALES_REPORT,
                payload: res.data
            })

        }

    ).catch(err => {
        dispatch({
            type: ERR_ALL_SALES_REPORT,
            payload: err.response
        })
    })
}

export const approveReport = (data) => dispatch => {

    dispatch({
        type: APPROVE_REPORT
    })

    dispatch({
        type: APPROVING_REPORT

    })

    const token = localStorage.getItem('uwin_manager_token')

    Axios.post(`${baseUrl}supervisor/report/approve`, {
        report: data.report,
        report_id: data.report_id,
    }, {
        headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
            console.log(res)
            dispatch({
                type: REPORT_APPROVED,
                payload: res.data
            })
        }

    ).catch(err => {
        dispatch({
            type: ERR_APPROVING_REPORT,
            payload: err.response
        })
    })
}


export const admin_GetUsers = () => dispatch => {

    dispatch({
        type: NULL_ALL_ERRORS
    })
    dispatch({
        type: ADMIN_FETCHING_USERS,
        payload: true
    })

    const token = localStorage.getItem('uwin_manager_token')

    Axios.get(`${baseUrl}supervisor/user/all`, {
        headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
            console.log(res)
            dispatch({
                type: ADMIN_FETCHED_USERS,
                payload: res.data
            })
            dispatch({
                type: ADMIN_FETCHING_USERS,
                payload: false
            })

        }

    ).catch(err => {
        dispatch({
            type: ADMIN_ERR_FETCHING_USERS,
            payload: err.response
        })
        dispatch({
            type: ADMIN_FETCHING_USERS,
            payload: false
        })
    })
}