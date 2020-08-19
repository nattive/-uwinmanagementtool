import {
    SENDING_SALES_REPORT,
    SENT_SALES_REPORT,
    FAIL_TO_SEND_SALES_REPORT,
    SEND_SALES_REPORT,
    GET_SALES_REPORT,
    SALES_REPORT,
    SALES_REPORTS,
    SALES_REPORT_ERR,
} from './types'
import { baseUrl } from '../Misc/baseUrl';
import Axios from 'axios';
// 
// store
// show
// update
// destroy

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
export const showAllSalesReport = (id) => dispatch => {

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