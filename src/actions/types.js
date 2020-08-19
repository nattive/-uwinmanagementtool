/**
 * Login user
 */

export const LOGIN = 'LOGIN'
export const AUTH_IS_LOADING = 'AUTH_IS_LOADING'
export const AUTH_STOPPED_LOADING = 'AUTH_STOPPED_LOADING'
export const ERR_LOGIN = 'ERR_LOGIN'
export const NULL_ERR_LOGIN = 'NULL_ERR_LOGIN'

/*
 * Login user
 */

export const TOKEN = 'TOKEN'
export const STORE_USER = 'STORE_USER'

/**
 * Register 
 */

export const HAS_REGISTER = 'HAS_REGISTER'
export const ERR_REGISTER = 'ERR_REGISTER'
export const NULL_ERR_REGISTER = 'NULL_ERR_REGISTER'

/**
 * Password Generator 
 */

export const GEN_PASSWORD = 'GEN_PASSWORD'

/**
 * Checklist  
 */

export const CHECKING_CHECKLIST = 'CHECKING_CHECKLIST'
export const ERR_CHECKLIST_EXIST_STATUS = 'ERR_CHECKLIST_EXIST_STATUS'
export const CHECKLIST_EXIST_STATUS = 'CHECKLIST_EXIST_STATUS'
export const NEXT_CHECKLIST = 'NEXT_CHECKLIST'

export const OPEN_DIALOG = 'OPEN_DIALOG'
export const CLOSE_ALL = 'CLOSE_ALL'
export const OPEN_DIALOG_MORNING = 'OPEN_DIALOG_MORNING'
export const OPEN_DIALOG_AFTERNOON = 'OPEN_DIALOG_AFTERNOON'
export const OPEN_DIALOG_EVENING = 'OPEN_DIALOG_EVENING'

export const START_STORING_CHECKLIST = 'START_STORING_CHECKLIST'
export const HAS_STORED_CHECKLIST = 'HAS_STORED_CHECKLIST'
export const STOP_STORING_CHECKLIST = 'STOP_STORING_CHECKLIST'
export const ERR_STORING_CHECKLIST = 'ERR_STORING_CHECKLIST'

/**
 * App Globals
 */

export const APP_IS_LOADING = 'APP_IS_LOADING'
export const REDIRECT = 'REDIRECT'
export const OPEN_NOTIFICATION = 'OPEN_NOTIFICATION'
export const OPEN_TOP_NOTIFICATION = 'OPEN_TOP_NOTIFICATION'

/**
 *  WSKPA report
 */

export const WSKPA_LOADING_STATE = 'WSKPA_LOADING_STATE'
export const FETCHED_WSKPA = 'FETCHED_WSKPA'
export const FETCHED_SINGLE_WSKPA = 'FETCHED_SINGLE_WSKPA'
export const SUCCESS_FETCHING_WSKPA = 'SUCCESS_FETCHING_WSKPA'
export const ERR_FETCHING_WSKPA = 'ERR_FETCHING_WSKPA'
export const NULL_ERR_FETCHING_WSKPA = 'NULL_ERR_FETCHING_WSKPA'
export const WSKPA_PERCENTAGE = 'WSKPA_PERCENTAGE'

/**
 *  SFCR report
 */

export const SFCR_LOADING_STATE = 'SFCR_LOADING_STATE'
export const FETCHED_SFCR_REPORT = 'FETCHED_SFCR_REPORT'
export const FETCHED_SFCR_REPORTS = 'FETCHED_SFCR_REPORTS'
export const SFCR_SUCCESS_MESSAGE = 'SFCR_SUCCESS_MESSAGE'
export const SFCR_ERROR_MESSAGE = 'SFCR_ERROR_MESSAGE'
export const NULL_SFCR_MESSAGE = 'NULL_SFCR_MESSAGE'


/**
 * Modal Alert
 */
export const OPEN_SUCCESS_MODAL = 'OPEN_SUCCESS_MODAL'
export const LOGIN_STATUS = 'LOGIN_STATUS'

export const NULL_ALL_ERRORS = 'NULL_ALL_ERRORS'


/**
 * Chat 
 */

export const INIT_CHAT = 'INIT_CHAT'
export const OPEN_CHAT = 'OPEN_CHAT'
export const FETCHING_CHATS = 'FETCHING_CHATS'
export const FETCHED_CHATS = 'FETCHED_CHATS'
export const NULL_CHAT_ERR = 'NULL_CHAT_ERR'
export const FETCHED_CHAT = 'FETCHED_CHAT'
export const CHAT_ERROR = 'CHAT_ERROR'
export const CHAT_SUCCESS = 'CHAT_SUCCESS'
export const ACTIVE_CHAT = 'ACTIVE_CHAT'
export const INIT_CHAT_PUSHER = 'INIT_CHAT_PUSHER'
export const NEW_MESSAGE = 'NEW_MESSAGE'
export const MY_SENT_MESSAGE = 'MY_SENT_MESSAGE'

export const GET_PRIVATE_CHAT = 'GET_PRIVATE_CHAT'
export const GETTING_PRIVATE_CHAT = 'GETTING_PRIVATE_CHAT'
export const ERROR_PRIVATE_CHAT = 'ERROR_PRIVATE_CHAT'
export const PRIVATE_CHATS = 'PRIVATE_CHATS'

export const UPDATE_ONLINE_STATUS = 'UPDATE_ONLINE_STATUS'
export const UPDATE_ONLINE_STATUS_ERROR = 'UPDATE_ONLINE_STATUS_ERROR'
    //Nulling
export const NULL_CHATS = 'NULL_CHATS'
export const NULL_ACTIVE_CHAT_CHATS = 'NULL_ACTIVE_CHAT_CHATS'

export const GET_ONLINE_MANAGERS = 'GET_ONLINE_MANAGERS'
export const GETTING_ONLINE_MANAGERS = 'GETTING_ONLINE_MANAGERS'
export const ERROR_GETTING_ONLINE_MANAGERS = 'ERROR_GETTING_ONLINE_MANAGERS'
export const ONLINE_MANAGERS = 'ONLINE_MANAGERS'

/**
 * Users
 */

export const FETCHING_USERS = 'FETCHING_USERS'
export const FETCHED_USERS = 'FETCHED_USERS'
export const FETCHED_USER = 'FETCHED_USER'
export const ERR_FETCHING_USERS = 'ERR_FETCHING_USERS'


export const UPDATE_PROFILE = 'UPDATE_PROFILE'
export const UPDATING_PROFILE = 'UPDATING_PROFILE'
export const UPDATED_PROFILE = 'UPDATED_PROFILE'
export const ERR_UPDATING_PROFILE = 'ERR_UPDATING_PROFILE'


//Admin

export const ADMIN_FETCHING_USERS = 'ADMIN_FETCHING_USERS'
export const ADMIN_FETCHED_USERS = 'ADMIN_FETCHED_USERS'
export const ADMIN_FETCHED_USER = 'ADMIN_FETCHED_USER'
export const ADMIN_ERR_FETCHING_USERS = 'ADMIN_ERR_FETCHING_USERS'


/**
 * ROLES AND PERMISSIONS
 */

export const ADMIN_FETCHING_ROLES = 'ADMIN_FETCHING_ROLES'
export const FETCH_ROLES = 'FETCH_ROLES'
export const ADMIN_FETCHED_ROLES = 'ADMIN_FETCHED_ROLES'
export const ADMIN_ERR_FETCHING_ROLES = 'ADMIN_ERR_FETCHING_ROLES'

export const ASSIGN_ROLE = 'ASSIGN_ROLE'
export const ASSIGNING_ROLE = 'ASSIGNING_ROLE'
export const ROLE_ASSIGNED = 'ROLE_ASSIGNED'
export const ERR_ASSIGNING_ROLE = 'ERR_ASSIGNING_ROLE'

/**
 * Sales
 */
export const SEND_SALES_REPORT = 'SEND_SALES_REPORT'

export const GET_SALES_REPORT = 'GET_SALES_REPORT'
export const SALES_REPORT = 'SALES_REPORT'
export const SALES_REPORTS = 'SALES_REPORTS'
export const SALES_REPORT_ERR = 'SALES_REPORT_ERR'

export const SENDING_SALES_REPORT = 'SENDING_SALES_REPORT'
export const SENT_SALES_REPORT = 'SENT_SALES_REPORT'
export const FAIL_TO_SEND_SALES_REPORT = 'FAIL_TO_SEND_SALES_REPORT'

/**
 * Latest Report
 */

export const GET_LATEST_REPORT = 'GET_LATEST_REPORT'
export const GETTING_LATEST_REPORT = 'GETTING_LATEST_REPORT'
export const ERR_GETTING_LATEST_REPORT = 'ERR_GETTING_LATEST_REPORT'
export const LATEST_REPORT = 'LATEST_REPORT'


/***
 * 
 * ADMIN
 * 
 */

export const GET_ALL_WSKA_REPORT = 'GET_ALL_WSKA_REPORT'
export const GETTING_ALL_WSKA_REPORT = 'GETTING_ALL_WSKA_REPORT'
export const ERR_ALL_WSKA_REPORT = 'ERR_ALL_WSKA_REPORT'
export const ALL_WSKA_REPORT = 'ALL_WSKA_REPORT'


export const GET_ALL_SFCR_REPORT = 'GET_ALL_SFCR_REPORT'
export const GETTING_ALL_SFCR_REPORT = 'GETTING_ALL_SFCR_REPORT'
export const ERR_ALL_SFCR_REPORT = 'ERR_ALL_SFCR_REPORT'
export const ALL_SFCR_REPORT = 'ALL_SFCR_REPORT'


export const GET_ALL_SALES_REPORT = 'GET_ALL_SALES_REPORT'
export const GETTING_ALL_SALES_REPORT = 'GETTING_ALL_SALES_REPORT'
export const ERR_ALL_SALES_REPORT = 'ERR_ALL_SALES_REPORT'
export const ALL_SALES_REPORT = 'ALL_SALES_REPORT'


export const APPROVE_REPORT = 'APPROVE_REPORT'
export const APPROVING_REPORT = 'APPROVING_REPORT'
export const ERR_APPROVING_REPORT = 'ERR_APPROVING_REPORT'
export const REPORT_APPROVED = 'REPORT_APPROVED'