import {
    WSKPA_LOADING_STATE,
    FETCHED_WSKPA,
    ERR_FETCHING_WSKPA,
    NULL_ERR_FETCHING_WSKPA,
    SUCCESS_FETCHING_WSKPA,
    WSKPA_PERCENTAGE,
    FETCHED_SINGLE_WSKPA,
    OPEN_SUCCESS_MODAL,
    GET_LATEST_REPORT,
    GETTING_LATEST_REPORT,
    ERR_GETTING_LATEST_REPORT,
    LATEST_REPORT,
} from './types'
import axios from 'axios'
import { baseUrl } from '../Misc/baseUrl'
import store from '../Misc/store';

export const storeWSKPA = ({ data }) => dispatch => {

    console.log(data);

    dispatch({
        type: NULL_ERR_FETCHING_WSKPA
    })
    const token = localStorage.getItem('uwin_manager_token')

    if (token) {
        dispatch({
            type: WSKPA_LOADING_STATE,
            payload: true
        })

        const {
            full_name,
            work_attendance,
            punctuality,
            accountability,
            cr_rs,
            revenue_per_day,
            appearance,
            general_equipment_maintenance,
        } = data
        axios.post(`${baseUrl}report/wskpa/store`, {
            full_name,
            work_attendance,
            punctuality,
            accountability,
            cr_rs,
            revenue_per_day,
            appearance,
            general_equipment_maintenance,
            workPercentage: store.getState().reports.workPercentage
        }, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => {
                console.log(res);
                alert(res.data.data)
                dispatch({
                    type: WSKPA_LOADING_STATE,
                    payload: false
                })
                dispatch({
                    type: SUCCESS_FETCHING_WSKPA,
                    payload: res.data.data
                })
                dispatch({
                    type: OPEN_SUCCESS_MODAL,
                    payload: res.data.data
                })

            }

        ).catch(err => {
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


}


export const getWSKPA = () => dispatch => {
    dispatch({
        type: WSKPA_LOADING_STATE,
        payload: true
    })
    dispatch({
        type: NULL_ERR_FETCHING_WSKPA
    })
    const token = localStorage.getItem('uwin_manager_token')

    axios.get(`${baseUrl}report/wskpa`, {
        headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
            console.log(res)
            dispatch({
                type: FETCHED_WSKPA,
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


export const LatestWSKPA = () => dispatch => {
    dispatch({
        type: WSKPA_LOADING_STATE,
        payload: true
    })
    dispatch({
        type: NULL_ERR_FETCHING_WSKPA
    })
    const token = localStorage.getItem('uwin_manager_token')

    axios.get(`${baseUrl}report/wskpa/Latest`, {
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





export const getLatestReport = () => dispatch => {
    dispatch({ type: GET_LATEST_REPORT })
    dispatch({ type: GETTING_LATEST_REPORT })
    const token = localStorage.getItem('uwin_manager_token')

    axios.get(`${baseUrl}report/all/Latest`, {
        headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
            console.log(res)
            dispatch({
                type: LATEST_REPORT,
                payload: res.data
            })

        }

    ).catch(err => {
        dispatch({
            type: ERR_GETTING_LATEST_REPORT,
            payload: err.response
        })
    })
}



export const getAppraisalPercent = () => (
    work_attendance,
    punctuality,
    accountability,
    cr_rs,
    revenue_per_day,
    appearance,
    general_equipment_maintenance
) => dispatch => {

    var sum = Number(work_attendance) + Number(punctuality) + Number(accountability) + Number(cr_rs) + Number(revenue_per_day) + Number(appearance) + Number(general_equipment_maintenance)

    let percentage = Math.floor((sum / 70) * 100)
        // console.log(percentage);
    dispatch({
        type: WSKPA_PERCENTAGE,
        payload: percentage
    })
}