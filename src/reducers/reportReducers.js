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
    SFCR_SUCCESS_MESSAGE,
    SFCR_ERROR_MESSAGE,
    NULL_SFCR_MESSAGE
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
    workPercentage: 0
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
        case FETCHED_SFCR_REPORT:
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

        default:
            return {
                ...state
            }
            break;
    }
}