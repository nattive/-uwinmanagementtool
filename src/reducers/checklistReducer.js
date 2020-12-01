import {
    CHECKLIST_EXIST_STATUS,
    OPEN_DIALOG,
    NEXT_CHECKLIST,
    OPEN_DIALOG_MORNING,
    OPEN_DIALOG_AFTERNOON,
    OPEN_DIALOG_EVENING,
    ERR_CHECKLIST_EXIST_STATUS,
    CLOSE_ALL,
    OPEN_NOW,
    CLOSE_NOW,
} from "../actions/types";

const initialState = {
    isExist: null,
    open: false,
    nextChecklist: {},
    day: '',
    openMorning: false,
    openAfternoon: false,
    openEvening: false,
    err: null,
    openNow: {}
}
export default function(state = initialState, action) {
    switch (action.type) {
        case CLOSE_ALL:
            return {
                ...state,
                openMorning: false,
                openAfternoon: false,
                isExist: null,
                openEvening: false,
            }
        case ERR_CHECKLIST_EXIST_STATUS:
            return {
                ...state,
                err: action.payload,
            }

        case OPEN_DIALOG_MORNING:
            return {
                ...state,
                openMorning: true
            }

        case OPEN_DIALOG_AFTERNOON:
            return {
                ...state,
                openAfternoon: true
            }
        case OPEN_DIALOG_EVENING:
            return {
                ...state,
                openEvening: true
            }
        case CHECKLIST_EXIST_STATUS:
            return {
                ...state,
                isExist: action.payload
            }

        case OPEN_DIALOG:
            return {
                ...state,
                open: action.payload
            }
        case NEXT_CHECKLIST:
            return {
                ...state,
                nextChecklist: action.payload
            }
        case OPEN_NOW:
            return {
                ...state,
                openNow: action.payload
            }
        case CLOSE_NOW:
            return {
                ...state,
                openNow: {}
            }

        default:
            return {
                ...state
            }
            break;
    }
}