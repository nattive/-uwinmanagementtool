import {
    FETCHING_USERS,
    FETCHED_USERS,
    ERR_FETCHING_USERS,
    FETCHED_USER,
    UPDATE_PROFILE,
    UPDATING_PROFILE,
    HAS_UPDATED_PROFILE,
    ERR_UPDATING_PROFILE,
} from "../actions/types";

const initialState = {
    allManagers: {},
    FetchedManager: {},
    fetchingManagers: false,
    fetchError: null,
    isUpdatingProfile: null,
    updated: null,
    errorUpdatingProfile: null

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
        case UPDATING_PROFILE:
            return {
                ...state,
                isUpdatingProfile: true,
                updated: null
            }
        case HAS_UPDATED_PROFILE:
            return {
                ...state,
                isUpdatingProfile: false,
                updated: 'Profile Updated successfully'
            }

        case ERR_UPDATING_PROFILE:
            return {
                ...state,
                isUpdatingProfile: false,
                errorUpdatingProfile: action.payload
            }

        default:
            return {
                ...state
            }
    }
}