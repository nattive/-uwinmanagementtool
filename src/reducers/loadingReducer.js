import { APP_IS_LOADING } from "../actions/types";

const initialState = {
    appIsLoading: false,
}
export default function(state = initialState, action) {
    switch (action.type) {
        case APP_IS_LOADING:
            return {
                ...state,
                appIsLoading: action.payload
            }
        default:
            return {
                ...state
            }
            break;
    }
}