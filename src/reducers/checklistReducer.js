import {
    CHECKLIST_EXIST_STATUS,
    OPEN_DIALOG,
    NEXT_CHECKLIST,
    OPEN_DIALOG_MORNING,
    OPEN_DIALOG_AFTERNOON,
    OPEN_DIALOG_EVENING,
    CLOSE_ALL,
} from "../actions/types";

const initialState = {
    isExist: null,
    open: false,
    nextChecklist: {},
    day: '',
    openMorning: false,
    openAfternoon: false,
    openEvening: false,
}
export default function(state = initialState, action) {
    switch (action.type) {
        case CLOSE_ALL:
            return {
                ...state,
                openMorning: false,
                openAfternoon: false,
                openEvening: false,
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

        default:
            return {
                ...state
            }
            break;
    }
}