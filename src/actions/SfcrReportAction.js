import {
    SFCR_LOADING_STATE,
    FETCHED_SFCR_REPORTS,
    FETCHED_SFCR_REPORT,
    SFCR_SUCCESS_MESSAGE,
    SFCR_ERROR_MESSAGE,
    NULL_SFCR_MESSAGE
} from './types'
import { baseUrl } from '../Misc/baseUrl';
import Axios from 'axios';

export const storeSFCR = ({ data }) => dispatch => {

    console.log(data);

    dispatch({
        type: NULL_SFCR_MESSAGE
    })
    const token = localStorage.getItem('uwin_manager_token')

    if (token) {
        dispatch({
            type: SFCR_LOADING_STATE,
            payload: true
        })

        const {
            hasReceive,
            date_finished,
            date_supplied,
            usage_duration,
            volume,
            pricePerLitre,
            petrol_station,
        } = data

        Axios.post(`${baseUrl}report/sfcr/store`, {
            hasReceive,
            date_finished,
            date_supplied,
            usage_duration,
            pricePerLitre,
            volume,
            petrol_station,
        }, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => {
            dispatch({
                type: SFCR_LOADING_STATE,
                payload: false
            })
            dispatch({
                type: SFCR_SUCCESS_MESSAGE,
                payload: res.data
            })
        }).catch(err => {
            dispatch({
                type: SFCR_LOADING_STATE,
                payload: false
            })
            dispatch({
                type: SFCR_ERROR_MESSAGE,
                payload: err.response.statusText
            })

        })
    }


}


export const getAllSFCR = () => dispatch => {
    dispatch({
        type: SFCR_LOADING_STATE,
        payload: true
    })
    dispatch({
        type: NULL_SFCR_MESSAGE
    })
    const token = localStorage.getItem('uwin_manager_token')

    Axios.get(`${baseUrl}report/sfcr`, {
        headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
            console.log(res)
            dispatch({
                type: FETCHED_SFCR_REPORTS,
                payload: res.data
            })
            dispatch({
                type: NULL_SFCR_MESSAGE
            })
            dispatch({
                type: SFCR_LOADING_STATE,
                payload: false
            })

        }

    ).catch(err => {
        dispatch({
            type: SFCR_LOADING_STATE,
            payload: false
        })

        dispatch({
            type: SFCR_ERROR_MESSAGE,
            payload: err.response
        })
    })
}