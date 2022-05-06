import axios from "axios"

const allUsersActions = {
    loadUsers: () => {
        return (async (dispatch) => {
            dispatch({ type: "ALL_USERS_LOADING" })

            const res = await axios.get('/api/users/list')
            if (res.data.message) {
                dispatch({ type: "ALL_USERS_LOADED", payload: res.data.message })
            }
            if (res.data.error) {
                dispatch({ type: "ALL_USERS_FAIL" })
            }
        })
    },
    follow: (userId) => {
        return (async (dispatch, getState) => {
            dispatch({ type: "FOLLOW_REQ_LOADING" })

            const config = { headers: { 'authorization': getState().user.token } }
            const res = await axios.put(`/api/users/follow`, { followId: userId }, config)
            if (res.data.message) {
                dispatch({ type: "FOLLOW_SUCCESS", payload: res.data.message })
            }
            if (res.data.error) {
                dispatch({ type: "FOLLOW_FAIL" })
            }
        })
    },

    unfollow: (userId) => {
        return (async (dispatch, getState) => {
            dispatch({ type: "FOLLOW_REQ_LOADING" })

            const config = { headers: { 'authorization': getState().user.token } }
            const res = await axios.put(`/api/users/unfollow`, { unfollowId: userId }, config)
            if (res.data.message) {
                dispatch({ type: "FOLLOW_SUCCESS", payload: res.data.message })
            }
            if (res.data.error) {
                dispatch({ type: "FOLLOW_FAIL" })
            }
        })
    }
}

export default allUsersActions