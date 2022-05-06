import axios from 'axios'

const userActions = {
    register: (user) => {
        return async (dispatch) => {
            dispatch({ type: "USER_REQISTER_REQ" })
            const res = await axios.post('/api/users', user)
            if (res.data.message) {
                dispatch({ type: "USER_REGISTER_SUCCESS", payload: res.data.message })
            }
            if (res.data.error) {
                dispatch({ type: "USER_REGISTER_FAIL", payload: res.data.error })
            }
        }
    },
    clearMsg: () => {
        return (dispatch) => {
            dispatch({ type: "USER_CLEAR_MSG" })
        }
    },
    clearError: () => {
        return (dispatch) => {
            dispatch({ type: "USER_CLEAR_ERROR" })
        }
    },
    login: (user) => {
        return async (dispatch) => {
            dispatch({ type: "USER_login_REQ" })
            const res = await axios.post('/auth/signin', user)
            if (res.data.message) {
                dispatch({ type: "USER_LOGIN_SUCCESS", payload: res.data.message })
            }
            if (res.data.error) {
                dispatch({ type: "USER_LOGIN_FAIL", payload: res.data.error })
            }
        }
    },
    loadUser: () => {
        return (async (dispatch, getState) => {
            dispatch({ type: "USER_LOADING" })

            const config = { headers: { 'authorization': getState().user.token } }
            const res = await axios.get('/api/users/load', config)
            if (res.data.message) {
                dispatch({ type: "USER_LOADED", payload: res.data.message })
            }
            if (res.data.error) {
                dispatch({ type: "USER_LOADING_FAIL" })
            }
        })
    },
    update: (user, userId) => {
        return (async (dispatch, getState) => {
            dispatch({ type: "USER_UPDATE_REQ" })
            const config = {
                headers: {
                    'Authorization': getState().user.token,
                    "Content-Type": "multipart/form-data"
                }
            }
            const res = await axios.put(`/api/users/${userId}`, user, config)
            if (res.data.message) {
                dispatch({ type: "USER_UPDATE_SUCCESS", payload: res.data })
            }
            if (res.data.error) {
                dispatch({ type: "USER_UPDATE_FAIL", payload: res.data.error })
            }
        })
    }, signOut: () => {
        return (async (dispatch) => {
            dispatch({ type: "SIGNOUT" })
        })
    }
}

export default userActions