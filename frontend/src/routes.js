import { Route, Routes } from "react-router-dom"
import PrivateRoute from './components/privateRoute/PrivateRoute'
import EditProfile from './pages/editProfile/EditProfile'
import Profile from './pages/profile/Profile'
import SignIn from './pages/signIn/SignIn'
import Home from './pages/home/Home'
import SignUp from './pages/signUp/SignUp'
import { useSelector } from "react-redux"
import Loader from "./components/loading/Loader"
import Users from "./pages/users/Users"
import { Fragment } from "react"
import FindPeople from "./components/findPeople/FindPeople"

const AppRoutes = () => {
    const { userLoading } = useSelector((state) => { return state.user })
    const { allUsersLoading } = useSelector((state) => { return state.allUsers })
    return (
        userLoading ?
            <Loader /> :
            <Routes>
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<SignIn />} />
                {
                    allUsersLoading ?
                        <Route element={<Loader />} /> :
                        <Fragment>
                            <Route path="/user/:userId" element={<Profile />} />
                            <Route path="/users" element={<Users />} />
                        </Fragment>
                }
                <Route element={<PrivateRoute />} >
                    <Route path='/' element={<Home />} />
                    <Route path="/user/edit/:userId" element={<EditProfile />} />
                    <Route path="/find" element={<FindPeople />} />
                </Route>
            </Routes>
    )
}

export default AppRoutes