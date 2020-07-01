import { CHECKLIST_EXIST_STATUS, OPEN_DIALOG } from "../actions/types";

const initialState = {
    isExist: null,
    open: false,
    day: ''
}
export default function(state = initialState, action) {
    switch (action.type) {
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
        default:
            return {
                ...state
            }
            break;
    }
}