import { combineReducers } from 'redux'
import authReducer from './authReducer'
import checklistReducer from './checklistReducer'
import loadingReducer from './loadingReducer'
import reportReducers from './reportReducers'
import chatReducer from './chatReducer'
import usersReducers from './usersReducers'
import salesReportReducer from './salesReportReducer'
import adminReducer from './adminReducer'


export default combineReducers({
    auth: authReducer,
    checklist: checklistReducer,
    loadingState: loadingReducer,
    reports: reportReducers,
    chat: chatReducer,
    managers: usersReducers,
    admin: adminReducer,
    salesReport: salesReportReducer
})