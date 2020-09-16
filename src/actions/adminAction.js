import {
    GET_ALL_WSKA_REPORT,
    GETTING_ALL_WSKA_REPORT,
    ERR_ALL_WSKA_REPORT,
    ALL_WSKA_REPORT,
    GET_ALL_SFCR_REPORT,
    GETTING_ALL_SFCR_REPORT,
    ERR_ALL_SFCR_REPORT,
    ALL_SFCR_REPORT,
    GET_ALL_SALES_REPORT,
    GETTING_ALL_SALES_REPORT,
    ERR_ALL_SALES_REPORT,
    ALL_SALES_REPORT,
    APPROVING_REPORT,
    ERR_APPROVING_REPORT,
    REPORT_APPROVED,
    APPROVE_REPORT,
    ADMIN_FETCHING_ROLES,
    FETCH_ROLES,
    ADMIN_FETCHED_ROLES,
    ADMIN_ERR_FETCHING_ROLES,
    ADMIN_FETCHING_USERS,
    ADMIN_FETCHED_USERS,
    ADMIN_FETCHED_USER,
    ADMIN_ERR_FETCHING_USERS,
    NULL_ALL_ERRORS,
    ASSIGN_ROLE,
    ASSIGNING_ROLE,
    ROLE_ASSIGNED,
    ERR_ASSIGNING_ROLE,
    APP_IS_LOADING,
    IS_DELETING,
    DELETED,
    SALES_REPORTS,
    GETTING_ALL_CHECKLIST,
    GET_ALL_CHECKLIST,
    ERR_GETTING_ALL_CHECKLIST,
    ALL_CHECKLIST,
} from './types'
import { baseUrl } from '../Misc/baseUrl'
import Axios from 'axios'
import swal from "@sweetalert/with-react";

export const getAllRoles = () => dispatch => {
    dispatch({
        type: ADMIN_FETCHING_ROLES
    })
    dispatch({
        type: FETCH_ROLES
    })

    const token = localStorage.getItem('uwin_manager_token')

    Axios.get(`${baseUrl}supervisor/roles/list`, {
        headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
            console.log(res)
            dispatch({
                type: ADMIN_FETCHED_ROLES,
                payload: res.data
            })

        }

    ).catch(err => {
        dispatch({
            type: ADMIN_ERR_FETCHING_ROLES,
            payload: err.response
        })
    })
}




export const assignRole = (data) => dispatch => {

    dispatch({
        type: ASSIGN_ROLE
    })

    dispatch({
        type: APP_IS_LOADING,
        payload: true
    })

    dispatch({
        type: ASSIGNING_ROLE

    })

    const { user_id, position } = data

    const token = localStorage.getItem('uwin_manager_token')

    Axios.post(`${baseUrl}supervisor/roles/assign`, {
        user_id: data.user_id,
        position: data.position
    }, {
        headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
            console.log(res)
            dispatch({
                type: ROLE_ASSIGNED,
                payload: res.data
            })
            dispatch({
                type: APP_IS_LOADING,
                payload: false
            })

        }

    ).catch(err => {
        swal({
            title: "An Error occurred",
            text: err.response && err.response.data && err.response.data.message || 'An error occurred',
            icon: "error",
            buttons: true,
            dangerMode: true,
        })
        dispatch({
            type: ERR_ASSIGNING_ROLE,
            payload: err.response
        })
        dispatch({
            type: APP_IS_LOADING,
            payload: false
        })

    })
}

export const getAllWskpa = () => dispatch => {
    dispatch({
        type: GETTING_ALL_WSKA_REPORT
    })
    dispatch({
        type: GET_ALL_WSKA_REPORT
    })

    const token = localStorage.getItem('uwin_manager_token')

    Axios.get(`${baseUrl}supervisor/report/wskpa`, {
        headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
            console.log(res)
            dispatch({
                type: ALL_WSKA_REPORT,
                payload: res.data
            })

        }

    ).catch(err => {
        dispatch({
            type: ERR_ALL_WSKA_REPORT,
            payload: err.response
        })
    })
}


export const getAllWskpaById = (id) => dispatch => {
    dispatch({
        type: GETTING_ALL_WSKA_REPORT
    })
    dispatch({
        type: GET_ALL_WSKA_REPORT
    })

    const token = localStorage.getItem('uwin_manager_token')

    Axios.get(`${baseUrl}supervisor/report/wskpa/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
            console.log(res)
            dispatch({
                type: ALL_WSKA_REPORT,
                payload: res.data
            })

        }

    ).catch(err => {
        dispatch({
            type: ERR_ALL_WSKA_REPORT,
            payload: err.response
        })
    })
}



export const getAllSfcr = () => dispatch => {
    dispatch({
        type: GETTING_ALL_SFCR_REPORT
    })
    dispatch({
        type: GET_ALL_SFCR_REPORT
    })

    const token = localStorage.getItem('uwin_manager_token')

    Axios.get(`${baseUrl}supervisor/report/sfcr`, {
        headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
            console.log(res)
            dispatch({
                type: ALL_SFCR_REPORT,
                payload: res.data
            })

        }

    ).catch(err => {
        dispatch({
            type: ERR_ALL_SFCR_REPORT,
            payload: err.response
        })
    })
}

export const getAllSales = () => dispatch => {
    dispatch({
        type: GETTING_ALL_SALES_REPORT
    })
    dispatch({
        type: GET_ALL_SALES_REPORT
    })

    const token = localStorage.getItem('uwin_manager_token')

    Axios.get(`${baseUrl}supervisor/report/sales`, {
        headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
            console.log(res)
            dispatch({
                type: ALL_SALES_REPORT,
                payload: res.data
            })

        }

    ).catch(err => {
        dispatch({
            type: ERR_ALL_SALES_REPORT,
            payload: err.response
        })
    })
}

export const getAllChecklists = () => dispatch => {

    dispatch({
        type: GETTING_ALL_CHECKLIST
    })
    dispatch({
        type: GET_ALL_CHECKLIST
    })

    const token = localStorage.getItem('uwin_manager_token')

    Axios.get(`${baseUrl}supervisor/report/checklist`, {
        headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
            console.log(res)
            dispatch({
                type: ALL_CHECKLIST,
                payload: res.data
            })

        }

    ).catch(err => {
        dispatch({
            type: ERR_GETTING_ALL_CHECKLIST,
            payload: err.response
        })
    })
}

export const getChecklistById = (id) => dispatch => {

    dispatch({
        type: GETTING_ALL_CHECKLIST
    })
    dispatch({
        type: GET_ALL_CHECKLIST
    })

    const token = localStorage.getItem('uwin_manager_token')

    Axios.get(`${baseUrl}supervisor/report/checklist/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
            console.log(res)
            dispatch({
                type: ALL_CHECKLIST,
                payload: res.data
            })

        }

    ).catch(err => {
        dispatch({
            type: ERR_GETTING_ALL_CHECKLIST,
            payload: err.response
        })
    })
}

export const getAllSfcrById = (id) => dispatch => {
    dispatch({
        type: GETTING_ALL_SFCR_REPORT
    })
    dispatch({
        type: GET_ALL_SFCR_REPORT
    })

    const token = localStorage.getItem('uwin_manager_token')

    Axios.get(`${baseUrl}supervisor/report/sfcr/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
            console.log(res)
            dispatch({
                type: ALL_SFCR_REPORT,
                payload: res.data
            })

        }

    ).catch(err => {
        dispatch({
            type: ERR_ALL_SFCR_REPORT,
            payload: err.response
        })
    })
}

export const getAllSalesById = (id) => dispatch => {
    dispatch({
        type: GETTING_ALL_SALES_REPORT
    })
    dispatch({
        type: GET_ALL_SALES_REPORT
    })

    const token = localStorage.getItem('uwin_manager_token')

    Axios.get(`${baseUrl}supervisor/report/sales/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
            console.log(res)
            dispatch({
                type: SALES_REPORTS,
                payload: res.data
            })

        }

    ).catch(err => {
        dispatch({
            type: ERR_ALL_SALES_REPORT,
            payload: err.response
        })
    })
}

export const approveReport = (data) => dispatch => {

    dispatch({
        type: APPROVE_REPORT
    })

    dispatch({
        type: APPROVING_REPORT

    })

    const token = localStorage.getItem('uwin_manager_token')

    Axios.post(`${baseUrl}supervisor/report/approve`, {
        report: data.report,
        report_id: data.report_id,
    }, {
        headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
            console.log(res)
            dispatch({
                type: REPORT_APPROVED,
                payload: res.data
            })
        }

    ).catch(err => {
        dispatch({
            type: ERR_APPROVING_REPORT,
            payload: err.response
        })
    })
}


export const managerUser = (data) => dispatch => {

    dispatch({
        type: APP_IS_LOADING,
        payload: true
    })

    const token = localStorage.getItem('uwin_manager_token')

    Axios.post(`${baseUrl}users/update/${data.id}`, {
        isActive: data.isActive,
    }, {
        headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
            console.log(res)
            dispatch({
                type: APP_IS_LOADING,
                payload: false
            })
            alert('user activated')
        }

    ).catch(err => {
        dispatch({
            type: APP_IS_LOADING,
            payload: false
        })
    })
}


export const deleteUser = (id) => dispatch => {

    dispatch({ type: IS_DELETING })

    const token = localStorage.getItem('uwin_manager_token')

    swal({
            title: "Are you sure?",
            text: "Once deleted, this user account will be deleted, and can't be recovered",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                dispatch({
                    type: APP_IS_LOADING,
                    payload: true
                })
                Axios.delete(`${baseUrl}supervisor/permission/user/delete/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                }).then(res => {
                        console.log(res)
                        dispatch({
                            type: DELETED,
                            payload: false
                        })
                        swal("Poof! User has been deleted!", {
                            icon: "success",
                        });
                    }

                ).catch(err => {
                    dispatch({
                        type: APP_IS_LOADING,
                        payload: false
                    })

                    swal({
                        title: "An Error occurred",
                        text: err.response && err.response.data && err.response.data.message || 'An error occurred',
                        icon: "error",
                        buttons: true,
                        dangerMode: true,
                    })
                })

            } else {
                swal("You choose to abort the action");
                dispatch({
                    type: DELETED,
                    payload: false
                })
            }
        });

}


export const admin_GetUsers = () => dispatch => {

    dispatch({
        type: NULL_ALL_ERRORS
    })
    dispatch({
        type: ADMIN_FETCHING_USERS,
        payload: true
    })

    const token = localStorage.getItem('uwin_manager_token')

    Axios.get(`${baseUrl}supervisor/user/all`, {
        headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
            console.log(res)
            dispatch({
                type: ADMIN_FETCHED_USERS,
                payload: res.data
            })
            dispatch({
                type: ADMIN_FETCHING_USERS,
                payload: false
            })

        }

    ).catch(err => {
        console.log(err.response)
        dispatch({
            type: ADMIN_ERR_FETCHING_USERS,
            payload: err.response ? err.response.data ||
                err.response.message ||
                err.response.data.error : JSON.stringify(err)
        })
        dispatch({
            type: ADMIN_FETCHING_USERS,
            payload: false
        })
    })
}