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
} from './types'
import { baseUrl } from '../Misc/baseUrl'
import Axios from 'axios'

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