import { combineReducers } from 'redux'
import authReducer from './authReducer'
import checklistReducer from './checklistReducer'
import loadingReducer from './loadingReducer'
import reportReducers from './reportReducers'


export default combineReducers({
    auth: authReducer,
    checklist: checklistReducer,
    loadingState: loadingReducer,
    reports: reportReducers
})