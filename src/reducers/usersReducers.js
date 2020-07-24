import {
    FETCHING_USERS,
    FETCHED_USERS,
    ERR_FETCHING_USERS,
    FETCHED_USER,
} from "../actions/types";

const initialState = {
    allManagers: {},
    FetchedManager: {},
    fetchingManagers: false,
    fetchError: null
}
export default function(state = initialState, action) {
    switch (action.type) {
        case FETCHING_USERS:
            return {
                ...state,
                fetchingManagers: action.payload
            }
        case FETCHED_USERS:
            return {
                ...state,
                allManagers: action.payload
            }
        case FETCHED_USER:
            return {
                ...state,
                FetchedManager: action.payload
            }

        case ERR_FETCHING_USERS:
            return {
                ...state,
                fetchError: action.payload
            }

        default:
            return {
                ...state
            }
    }
}