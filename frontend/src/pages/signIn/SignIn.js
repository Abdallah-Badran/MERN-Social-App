import { Fragment, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import userActions from "../../redux/actions/userActions"
import DialogBox from "../../components/dialogBox/DialogBox"
import { useNavigate } from "react-router-dom"

const SignIn = () => {
    const { userMsg, userError } = useSelector((state) => { return state.user })
    const dispatch = useDispatch()
    const redirectTo = useNavigate()
    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const handleInput = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(userActions.login(user))
    }
    const successSignIn = () => {
        dispatch(userActions.clearMsg())
        redirectTo('/')
    }

    const handleError = () => {
        dispatch(userActions.clearError())
    }
    return (
        <Fragment>
            <form className="card midpage-wrapper align-ver">
                <h2 className="card-heading">Sign In</h2>
                <div className="form-inputs-wrapper">
                    <input
                        className="input"
                        name="email"
                        type="email"
                        placeholder="Email"
                        onChange={handleInput}
                        value={user.email} />

                    <input
                        className="input"
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={handleInput}
                        value={user.password} />
                </div>

                <button
                    className="main-button" onClick={handleSubmit}>Submit</button>
            </form>
            {
                userMsg &&
                <DialogBox
                    msg={userMsg}
                    success={true}
                    leftBtn=""
                    rightBtn="OK"
                    rightBtnCb={successSignIn} />
            }
            {
                userError &&
                <DialogBox
                    msg={userError}
                    success={false}
                    leftBtn=""
                    rightBtn="OK"
                    rightBtnCb={handleError}
                />
            }

        </Fragment>
    )
}

export default SignIn