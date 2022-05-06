const initialState = {
    userLoading: null,
    userError: null,
    userMsg: null,
    isAuthenticated: null,
    token: localStorage.getItem('jwt'),
    user: null,
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "USER_REQISTER_REQ":
        case "USER_login_REQ":
        case "USER_LOADING":
        case "USER_UPDATE_REQ":
            return { ...state, userLoading: true }
        case "USER_REGISTER_SUCCESS":
            return { ...state, userLoading: false, userMsg: action.payload }
        case "USER_REGISTER_FAIL":
        case "USER_LOGIN_FAIL":
        case "USER_UPDATE_FAIL":
        case "USER_CLEAR_MSG":
            return { ...state, userMsg: null }
        case "USER_CLEAR_ERROR":
            return { ...state, userError: null }
        case "USER_LOGIN_SUCCESS":
            localStorage.setItem('jwt', action.payload.token)
            return {
                ...state,
                userLoading: false,
                isAuthenticated: true,
                token: action.payload.token,
                user: action.payload.user,
                userMsg: action.payload.msg
            }
        case "USER_LOADED":
            return {
                ...state,
                userLoading: false,
                isAuthenticated: true,
                user: action.payload
            }
        case "USER_LOADING_FAIL":
        case "SIGNOUT":
            localStorage.removeItem('jwt');
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                userLoading: false
            }
        case "USER_UPDATE_SUCCESS":
            return {
                ...state,
                userLoading: false,
                user: action.payload.message,
                userMsg: action.payload.msg
            }
        default:
            return state;
    }
}

export default userReducer