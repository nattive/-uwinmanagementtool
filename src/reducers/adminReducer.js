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
    ASSIGN_ROLE,
    ASSIGNING_ROLE,
    ROLE_ASSIGNED,
    ERR_ASSIGNING_ROLE,
    IS_DELETING,
    DELETED,
    GET_ALL_CHECKLIST,
    GETTING_ALL_CHECKLIST,
    ERR_GETTING_ALL_CHECKLIST,
    ALL_CHECKLIST,
} from "../actions/types";

const initialState = {
    isDeleting: false,
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
    adminFetchedUsers: [],
    adminFetchedUser: [],
    errorAdminFetchingUser: null,
    FetchingRoles: null,
    fetchedRoles: null,
    errorFetchingRole: null,
    errAssigningRole: null,
    isAssigningRole: false,
    roleIsAssigned: null,
    gettingAllChecklists: false,
    allChecklists: [],
    errorGettingChecklist: null
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
                SalesReports: action.payload
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

        case ASSIGN_ROLE:
            return {
                ...state,
                errAssigningRole: null,
                isAssigningRole: false,
                roleIsAssigned: null
            }

        case ASSIGNING_ROLE:
            return {
                ...state,
                isAssigningRole: true
            }
        case ROLE_ASSIGNED:
            return {
                ...state,
                isAssigningRole: false,
                roleIsAssigned: action.payload,
            }
        case ERR_ASSIGNING_ROLE:
            return {
                ...state,
                errAssigningRole: action.payload
            }
        case IS_DELETING:
            return {
                ...state,
                isDeleting: true
            }
        case DELETED:
            return {
                ...state,
                isDeleting: false
            }
        case GET_ALL_CHECKLIST:
            return {
                ...state,
                gettingAllChecklists: false,
                errorGettingChecklist: null
            }
        case GETTING_ALL_CHECKLIST:
            return {
                ...state,
                gettingAllChecklists: true
            }
        case ERR_GETTING_ALL_CHECKLIST:
            return {
                ...state,
                errorGettingChecklist: action.payload,
                gettingAllChecklists: false
            }
        case ALL_CHECKLIST:
            return {
                ...state,
                gettingAllChecklists: false,
                allChecklists: action.payload,
            }

        default:
            return {
                ...state
            }
    }
}