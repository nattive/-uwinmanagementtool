import {
    SENDING_SALES_REPORT,
    SENT_SALES_REPORT,
    FAIL_TO_SEND_SALES_REPORT,
    GET_SALES_REPORT,
    SALES_REPORT,
    SALES_REPORTS,
    SALES_REPORT_ERR,
    SEND_SALES_REPORT
} from "../actions/types";

const initialState = {
    isSendingSR: false,
    isGettingSR: false,
    SalesReport: {},
    SalesReports: {},
    successMessageSR: null,
    errorMessageSR: null,
}

/**
 * WSKPA
 */

export default function(state = initialState, action) {
    switch (action.type) {
        case SENDING_SALES_REPORT:
            return {
                ...state,
                isSendingSR: true
            }
        case SEND_SALES_REPORT:
            return {
                ...state,
                successMessageSR: null,
                errorMessageSR: null,
            }

        case SENT_SALES_REPORT:
            return {
                ...state,
                successMessageSR: action.payload,
                isSendingSR: false

            }
        case GET_SALES_REPORT:
            return {
                ...state,
                isGettingSR: true,
                errorMessageSR: null

            }
        case SALES_REPORT:
            return {
                ...state,
                SalesReport: action.payload,
                isGettingSR: false

            }
        case SALES_REPORTS:
            return {
                ...state,
                SalesReports: action.payload,
                isGettingSR: false

            }
        case SALES_REPORT_ERR:
            return {
                ...state,
                isGettingSR: false,
                errorMessageSR: action.payload

            }
        case FAIL_TO_SEND_SALES_REPORT:
            return {
                ...state,
                errorMessageSR: action.payload,
                isSendingSR: false

            }

        default:
            return {
                ...state
            }
            break;
    }
}