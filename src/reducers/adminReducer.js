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
    ADMIN_FETCHING_USERS,
    ADMIN_FETCHED_USERS,
    ADMIN_FETCHED_USER,
    ADMIN_ERR_FETCHING_USERS,
    ADMIN_FETCHING_ROLES,
    FETCH_ROLES,
    ADMIN_FETCHED_ROLES,
    ADMIN_ERR_FETCHING_ROLES,
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
    isApprovingReport: false,
    errorApprovingReport: null,
    successApprovingReport: null,
    adminIsFetchingUsers: null,
    adminFetchedUsers: null,
    adminFetchedUser: null,
    errorAdminFetchingUser: null,
    FetchingRoles: null,
    fetchedRoles: null,
    errorFetchingRole: null,

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

        case APPROVING_REPORT:
            return {
                ...state,
                isApprovingReport: true,
            }
        case ERR_APPROVING_REPORT:
            return {
                ...state,
                errorApprovingReport: action.payload
            }
        case REPORT_APPROVED:
            return {
                ...state,
                successApprovingReport: action.payload
            }
        case APPROVE_REPORT:
            return {
                ...state,
                errorApprovingReport: null
            }
        case ADMIN_FETCHING_USERS:
            return {
                ...state,
                adminIsFetchingUsers: action.payload
            }
        case ADMIN_FETCHED_USERS:
            return {
                ...state,
                adminFetchedUsers: action.payload
            }
        case ADMIN_FETCHED_USER:
            return {
                ...state,
                adminFetchedUser: action.payload
            }
        case ADMIN_ERR_FETCHING_USERS:
            return {
                ...state,
                errorAdminFetchingUser: action.payload
            }

        case ADMIN_FETCHED_ROLES:
            return {
                ...state,
                fetchedRoles: action.payload
            }

        case ADMIN_FETCHING_ROLES:
            return {
                ...state,
                FetchingRoles: action.payload
            }
        case FETCH_ROLES:
            return {
                ...state,
                FetchingRoles: null,
                fetchedRoles: null,
                errorFetchingRole: null,
            }
        case ADMIN_ERR_FETCHING_ROLES:
            return {
                ...state,
                errorFetchingRole: action.payload
            }

        default:
            return {
                ...state
            }
    }
}