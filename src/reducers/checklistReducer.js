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
    CHECKING_CHECKLIST
} from "../actions/types";

const initialState = {
    isExist: null,
    open: false,
    nextChecklist: {},
    day: '',
    isChecking: false,
    checklistError: null,
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
                checklistError: action.payload,
                isChecking: false,
                err: action.payload,
            }

        case OPEN_DIALOG_MORNING:
            return {
                ...state,
                isChecking: false,
                openMorning: true
            }

        case OPEN_DIALOG_AFTERNOON:
            return {
                ...state,
                isChecking: false,
                openAfternoon: true
            }
        case OPEN_DIALOG_EVENING:
            return {
                ...state,
                isChecking: false,
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
                isChecking: false,
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
                isChecking: false,
                openNow: action.payload
            }
        case CLOSE_NOW:
            return {
                ...state,
                openNow: {}
            }
        case CHECKING_CHECKLIST:
            return {
                ...state,
                isChecking: true,
                checklistError: null
            }

        default:
            return {
                ...state
            }
            break;
    }
}