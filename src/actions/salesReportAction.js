import {
    SENDING_SALES_REPORT,
    SENT_SALES_REPORT,
    FAIL_TO_SEND_SALES_REPORT,
    SEND_SALES_REPORT,
    GET_SALES_REPORT,
    SALES_REPORT,
    SALES_REPORTS,
    SALES_REPORT_ERR,
    WSKPA_LOADING_STATE,
    NULL_ERR_FETCHING_WSKPA,
    FETCHED_SINGLE_WSKPA,
    ERR_FETCHING_WSKPA,
} from './types'
import { baseUrl } from '../Misc/baseUrl';
import Axios from 'axios';
// 
// sales
// Latest

export const storeSalesReport = ({ data }) => dispatch => {

    console.log(data);

    dispatch({ type: SEND_SALES_REPORT })
    const token = localStorage.getItem('uwin_manager_token')

    if (token) {
        dispatch({ type: SENDING_SALES_REPORT })

        const {
            misc,
            totalPayout,
            fuel,
            report_date,
            pos,
            eCreditFunded,
            cashFunded,
            unsettledWinnings,
            totalRunCred,
            expenseTotal,
            onlineBalance,
            actualCashAtHand,
            expectedCashAtHand,
            balance,
        } = data

        Axios.post(`${baseUrl}report/sales/store`, {
            misc,
            totalPayout,
            fuel,
            report_date,
            pos,
            eCreditFunded,
            cashFunded,
            unsettledWinnings,
            totalRunCred,
            expenseTotal,
            onlineBalance,
            actualCashAtHand,
            expectedCashAtHand,
            balance,
        }, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => {
            dispatch({
                type: SENT_SALES_REPORT,
                payload: res.data
            })
        }).catch(err => {
            dispatch({
                type: FAIL_TO_SEND_SALES_REPORT,
                payload: err.response
            })

        })
    }


}

export const showSalesReport = (id) => dispatch => {

    dispatch({ GET_SALES_REPORT })
    const token = localStorage.getItem('uwin_manager_token')

    if (token) {

        Axios.post(`${baseUrl}report/sales/show/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => {
            dispatch({
                type: SALES_REPORT,
                payload: res.data
            })
        }).catch(err => {
            dispatch({
                type: SALES_REPORT_ERR,
                payload: err.response
            })

        })
    }


}
export const showAllSalesReport = () => dispatch => {

    dispatch({ type: GET_SALES_REPORT })
    const token = localStorage.getItem('uwin_manager_token')

    if (token) {

        Axios.get(`${baseUrl}report/sales`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => {
            dispatch({
                type: SALES_REPORTS,
                payload: res.data
            })
        }).catch(err => {
            dispatch({
                type: SALES_REPORT_ERR,
                payload: err.response
            })

        })
    }


}


export const LatestWSKPA = () => dispatch => {
    dispatch({
        type: WSKPA_LOADING_STATE,
        payload: true
    })
    dispatch({
        type: NULL_ERR_FETCHING_WSKPA
    })
    const token = localStorage.getItem('uwin_manager_token')

    Axios.get(`${baseUrl}report/sales/Latest`, {
        headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
            console.log(res)
            dispatch({
                type: FETCHED_SINGLE_WSKPA,
                payload: res.data
            })
            dispatch({
                type: NULL_ERR_FETCHING_WSKPA
            })
            dispatch({
                type: WSKPA_LOADING_STATE,
                payload: false
            })

        }

    ).catch(err => {
        alert(err && err.response && err.response.data && err.response.data.message)
        dispatch({
            type: WSKPA_LOADING_STATE,
            payload: false
        })

        dispatch({
            type: ERR_FETCHING_WSKPA,
            payload: err.response
        })
    })
}