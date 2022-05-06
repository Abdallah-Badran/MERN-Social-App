const initialState = {
    allUsersLoading: null,
    allUsers: [],
    allUsersError: [],
    followLoading: null,
    followError: []
}

const allUsersReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ALL_USERS_LOADING":
            return {
                ...state,
                allUsersLoading: true
            }
        case "ALL_USERS_LOADED":
            return {
                ...state,
                allUsersLoading: false,
                allUsers: action.payload
            }
        case "ALL_USERS_FAIL":
            return {
                ...state,
                allUsersLoading: false,
                allUsersError: action.payload
            }
        case "FOLLOW_REQ_LOADING":
            return { ...state, followLoading: true }
        case "FOLLOW_SUCCESS":
            return { ...state, followLoading: false, allUsers: action.payload }
        case "FOLLOW_FAIL":
            return { ...state, followLoading: true, followError: action.payload }
        default:
            return state
    }
}

export default allUsersReducer