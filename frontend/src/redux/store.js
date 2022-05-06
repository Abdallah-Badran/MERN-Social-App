import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import allUsersReducer from './reducers/allUsersReducer'
import userReducer from './reducers/userReducer'
import postReducer from './reducers/postReducer'

const combinedReducers = combineReducers({
    user: userReducer,
    allUsers: allUsersReducer,
    post: postReducer
})
const store = createStore(combinedReducers, applyMiddleware(thunk))

store.subscribe(() => { console.log(store.getState()) })

export default store