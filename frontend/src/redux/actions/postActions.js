import axios from 'axios'

const postActions = {
    create: (post) => {
        return async (dispatch, getState) => {
            dispatch({ type: "POST_CREATE_REQ" })

            const config = {
                headers: {
                    'Authorization': getState().user.token,
                    "Content-Type": "multipart/form-data"
                }
            }
            const res = await axios.post(`/api/posts/new/${getState().user.user._id}`, post, config)
            if (res.data.message) {
                dispatch({ type: "POST_CREATE_SUCCESS", payload: res.data.message })
            }
            if (res.data.error) {
                dispatch({ type: "POST_CREATE_FAIL" })
            }
        }
    },
    loadPosts: () => {
        return async (dispatch, getState) => {
            dispatch({ type: "POSTS_LOAD_REQ" })

            const config = {
                headers: {
                    'Authorization': getState().user.token,
                }
            }
            const res = await axios.get(`/api/posts`, config)
            if (res.data.message) {
                dispatch({ type: "POSTS_LOAD_SUCCESS", payload: res.data.message })
            }
            if (res.data.error) {
                dispatch({ type: "POSTS_LOAD_FAIL", payload: res.data.message })
            }
        }
    },
    deletePost: (postId) => {
        return async (dispatch, getState) => {
            dispatch({ type: "POST_DELETE_REQ" })

            const config = {
                headers: {
                    'Authorization': getState().user.token,
                }
            }
            const res = await axios.delete(`/api/posts/${postId}`, config)
            if (res.data.message) {
                dispatch({ type: "POST_DELETE_SUCCESS", payload: res.data.message })
            }
            if (res.data.error) {
                dispatch({ type: "POST_DELETE_FAIL", payload: res.data.message })
            }
        }
    },
    like: (postId) => {
        return async (dispatch, getState) => {
            dispatch({ type: "LIKE_REQ" })

            const config = {
                headers: {
                    'Authorization': getState().user.token,
                }
            }
            const body = { userId: getState().user.user._id, postId: postId }
            const res = await axios.put(`/api/posts/like`, body, config)
            if (res.data.message) {
                dispatch({ type: "LIKE_SUCCESS", payload: res.data.message })
            }
            if (res.data.error) {
                dispatch({ type: "LIKE_FAIL", payload: res.data.message })
            }
        }
    },
    unlike: (postId) => {
        return async (dispatch, getState) => {
            dispatch({ type: "LIKE_REQ" })

            const config = {
                headers: {
                    'Authorization': getState().user.token,
                }
            }
            const body = { userId: getState().user.user._id, postId: postId }
            const res = await axios.put(`/api/posts/unlike`, body, config)
            if (res.data.message) {
                dispatch({ type: "LIKE_SUCCESS", payload: res.data.message })
            }
            if (res.data.error) {
                dispatch({ type: "LIKE_FAIL", payload: res.data.message })
            }
        }
    },
    comment: (postId, comment) => {
        return async (dispatch, getState) => {
            dispatch({ type: "COMMENT_REQ" })

            const config = {
                headers: {
                    'Authorization': getState().user.token,
                }
            }
            const body = { userId: getState().user.user._id, postId: postId, comment: comment }
            const res = await axios.put(`/api/posts/comment`, body, config)
            if (res.data.message) {
                dispatch({ type: "COMMENT_SUCCESS", payload: res.data.message })
            }
            if (res.data.error) {
                dispatch({ type: "COMMENT_FAIL", payload: res.data.message })
            }
        }
    },
    uncomment: (postId, commentId) => {
        return async (dispatch, getState) => {
            dispatch({ type: "UNCOMMENT_REQ" })

            const config = {
                headers: {
                    'Authorization': getState().user.token,
                }
            }
            const body = { userId: getState().user.user._id, postId: postId, comment: commentId }
            const res = await axios.put(`/api/posts/uncomment`, body, config)
            if (res.data.message) {
                dispatch({ type: "UNCOMMENT_SUCCESS", payload: res.data.message })
            }
            if (res.data.error) {
                dispatch({ type: "UNCOMMENT_FAIL", payload: res.data.message })
            }
        }
    }
}

export default postActions