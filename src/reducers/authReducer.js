import {
    LOGIN,
    AUTH_IS_LOADING,
    HAS_REGISTER,
    ERR_REGISTER,
    NULL_ERR_REGISTER,
    AUTH_STOPPED_LOADING,
    ERR_LOGIN,
    TOKEN,
    GEN_PASSWORD,
    STORE_USER,
    NULL_ERR_LOGIN,
    LOGIN_STATUS,
    REDIRECT
} from "../actions/types";

const initialState = {
    manager: {},
    authIsLoading: false,
    genPassword: '',
    loginError: {},
    user: {},
    registerError: {},
    registerStatus: null,
    redirectTo: null,
    token: '',
    isLogin: 'wait'
}

export default function(state = initialState, action) {
    switch (action.type) {
        /**
         * Borrowed
         */

        case REDIRECT:
            return {
                ...state,
                redirectTo: action.payload
            }

        case LOGIN_STATUS:
            return {
                ...state,
                isLogin: action.payload
            }

        case LOGIN:
            return {
                ...state,
                manager: action.payload
            }

        case AUTH_IS_LOADING:
            return {
                ...state,
                authIsLoading: true
            }
            break;
        case NULL_ERR_LOGIN:
            return {
                ...state,
                loginError: {},
            }
            break;

        case AUTH_STOPPED_LOADING:
            // window.location.href = '/login'
            return {
                ...state,
                authIsLoading: false
            }
            break;
        case ERR_LOGIN:
            return {
                ...state,
                loginError: action.payload
            }
            break;
        case TOKEN:

            return {
                ...state,
                token: action.payload
            }
            break;
        case HAS_REGISTER:

            return {
                ...state,
                registerStatus: action.payload
            }
            break;
        case ERR_REGISTER:

            return {
                ...state,
                registerError: action.payload
            }
            break;
        case NULL_ERR_REGISTER:

            return {
                ...state,
                registerError: {}
            }
            break;
        case GEN_PASSWORD:

            return {
                ...state,
                genPassword: action.payload
            }
            break;
        case STORE_USER:

            return {
                ...state,
                manager: action.payload
            }
            break;

        default:
            return {
                ...state
            }
            break;
    }
}