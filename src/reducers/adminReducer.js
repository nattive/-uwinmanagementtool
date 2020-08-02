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
} from "../actions/types";

const initialState = {
    isGettingAllWska: false,
    errGettingAllWska: null,
    allWska: {},
    isGettingAllSfcr: false,
    errGettingAllSfcr: null,
    allSfcr: {},
    isGettingAllSales: false,
    errGettingAllSales: null,
    allSales: {},

}
export default function(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_WSKA_REPORT:
            return {
                ...state,
                errGettingAllWska: null,
            }
        case GETTING_ALL_WSKA_REPORT:
            return {
                ...state,
                isGettingAllWska: true
            }
        case ERR_ALL_WSKA_REPORT:
            return {
                ...state,
                errGettingAllWska: action.payload
            }
        case ALL_WSKA_REPORT:
            return {
                ...state,
                isGettingAllWska: false,
                allWska: action.payload
            }
        case GET_ALL_SFCR_REPORT:
            return {
                ...state,
                errGettingAllSfcr: null,
            }
        case GETTING_ALL_SFCR_REPORT:
            return {
                ...state,
                isGettingAllSfcr: true,
            }
        case ERR_ALL_SFCR_REPORT:
            return {
                ...state,
                isGettingAllSfcr: false,
                errGettingAllSfcr: action.payload
            }
        case ALL_SFCR_REPORT:
            return {
                ...state,
                isGettingAllSfcr: false,
                allSfcr: action.payload
            }
        case GET_ALL_SALES_REPORT:
            return {
                ...state,
                errGettingAllSales: null,
            }
        case GETTING_ALL_SALES_REPORT:
            return {
                ...state,
                isGettingAllSales: true
            }
        case ERR_ALL_SALES_REPORT:
            return {
                ...state,
                isGettingAllSales: false,
                errGettingAllSales: action.payload
            }
        case ALL_SALES_REPORT:
            return {
                ...state,
                isGettingAllSales: false,
                allSales: action.payload
            }

        default:
            return {
                ...state
            }
    }
}