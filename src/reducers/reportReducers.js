import {
    WSKPA_LOADING_STATE,
    FETCHED_WSKPA,
    ERR_FETCHING_WSKPA,
    NULL_ERR_FETCHING_WSKPA,
    SUCCESS_FETCHING_WSKPA,
    WSKPA_PERCENTAGE,
    FETCHED_SINGLE_WSKPA,
    OPEN_SUCCESS_MODAL,
    SFCR_LOADING_STATE,
    FETCHED_SFCR_REPORT,
    FETCHED_SFCR_REPORTS,
    SFCR_SUCCESS_MESSAGE,
    SFCR_ERROR_MESSAGE,
    NULL_SFCR_MESSAGE,
    GET_LATEST_REPORT,
    GETTING_LATEST_REPORT,
    ERR_GETTING_LATEST_REPORT,
    LATEST_REPORT,
} from "../actions/types";

const initialState = {
    loadingState: null,
    sfcrLoading: false,
    wskpaReports: {},
    sfcrReports: {},
    wskpaReport: {},
    error: null,
    sfcrError: null,
    sfcrSuccess: null,
    workPercentage: 0,
    isGettingLatestReport: false,
    errorLR: null,
    latestReport: {}
}

/**
 * WSKPA
 */

export default function(state = initialState, action) {
    switch (action.type) {
        case WSKPA_LOADING_STATE:
            return {
                ...state,
                loadingState: action.payload
            }
        case OPEN_SUCCESS_MODAL:
            return {
                ...state,
                success: action.payload
            }

        case FETCHED_WSKPA:
            return {
                ...state,
                wskpaReports: action.payload
            }
        case ERR_FETCHING_WSKPA:
            return {
                ...state,
                error: action.payload
            }
        case NULL_ERR_FETCHING_WSKPA:
            return {
                ...state,
                error: null
            }
        case ERR_FETCHING_WSKPA:
            return {
                ...state,
                error: action.payload
            }
        case SUCCESS_FETCHING_WSKPA:
            return {
                ...state,
                success: action.payload
            }
        case WSKPA_PERCENTAGE:
            return {
                ...state,
                workPercentage: action.payload
            }
        case FETCHED_SINGLE_WSKPA:
            return {
                ...state,
                wskpaReport: action.payload
            }
        case SFCR_LOADING_STATE:
            return {
                ...state,
                sfcrLoading: action.payload
            }
        case FETCHED_SFCR_REPORTS:
            return {
                ...state,
                sfcrReports: action.payload
            }
        case SFCR_SUCCESS_MESSAGE:
            return {
                ...state,
                sfcrSuccess: action.payload
            }
        case SFCR_ERROR_MESSAGE:
            return {
                ...state,
                sfcrError: action.payload
            }
        case NULL_SFCR_MESSAGE:
            return {
                ...state,
                sfcrError: null
            }
        case GET_LATEST_REPORT:
            return {
                ...state,
                errorLR: null,
            }
        case GETTING_LATEST_REPORT:
            return {
                ...state,
                isGettingLatestReport: true,
            }
        case ERR_GETTING_LATEST_REPORT:
            return {
                ...state,
                isGettingLatestReport: false,
                errorLR: action.payload,
            }
        case LATEST_REPORT:
            return {
                ...state,
                isGettingLatestReport: false,
                latestReport: action.payload
            }
        default:
            return {
                ...state
            }
    }
}