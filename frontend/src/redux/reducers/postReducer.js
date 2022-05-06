const initialState = {
    postsLoading: null,
    newPostLoading: null,
    deletePostLoading: null,
    posts: null,
    postsError: null,
    newPostError: null,
    deletePostError: null,

    likeLoading: null,
    likeError: null,

    commentLoading: null,
    commentError: null,

    unCommentLoading: null,
    unCommentError: null
}

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        /*POST*/
        case "POST_CREATE_REQ":
            return { ...state, newPostLoading: true }
        case "POST_DELETE_REQ":
            return { ...state, deletePostLoading: true }
        case "POSTS_LOAD_REQ":
            return { ...state, postsLoading: true }
        case "POST_CREATE_SUCCESS":
            return {
                ...state,
                newPostLoading: false,
                posts: action.payload
            }
        case "POST_DELETE_SUCCESS":
            return {
                ...state,
                deletePostLoading: false,
                posts: action.payload
            }
        case "POSTS_LOAD_SUCCESS":
            return {
                ...state,
                postsLoading: false,
                posts: action.payload
            }
        case "POST_CREATE_FAIL":
            return {
                ...state,
                newPostLoading: false,
                newPostError: action.payload
            }
        case "POSTS_LOAD_FAIL":
            return {
                ...state,
                postsLoading: false,
                postsError: action.payload
            }
        case "POST_DELETE_FAIL":
            return {
                ...state,
                deletePostLoading: false,
                deletePostError: action.payload
            }
        /*Like*/
        case "LIKE_REQ":
            return { ...state, likeLoading: true }

        case "LIKE_SUCCESS":
            return {
                ...state,
                likeLoading: false,
                posts: action.payload
            }
        case "LIKE_FAIL":
            return {
                ...state,
                likeLoading: false,
                likeError: action.payload
            }
        /*Comment*/
        case "COMMENT_REQ":
            return { ...state, commentLoading: true }

        case "COMMENT_SUCCESS":
            return {
                ...state,
                commentLoading: false,
                posts: action.payload
            }
        case "COMMENT_FAIL":
            return {
                ...state,
                commentLoading: false,
                commentError: action.payload
            }
        /*Uncomment */
        case "UNCOMMENT_REQ":
            return { ...state, commentLoading: true }

        case "UNCOMMENT_SUCCESS":
            return {
                ...state,
                unCommentLoading: false,
                posts: action.payload
            }
        case "UNCOMMENT_FAIL":
            return {
                ...state,
                unCommentLoading: false,
                unCommentError: action.payload
            }
        default:
            return state
    }
}

export default postReducer