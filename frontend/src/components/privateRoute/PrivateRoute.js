import { Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import SignIn from '../../pages/signIn/SignIn'
import { Fragment } from "react"

const PrivateRoute = () => {
    const { isAuthenticated } = useSelector((state) => { return state.user })
    return (
        <Fragment>
            {
                isAuthenticated ?
                    <Outlet /> :
                    <SignIn />
            }
        </Fragment>
    )
}

export default PrivateRoute