import { useState, Fragment } from "react"
import { useDispatch, useSelector } from 'react-redux'
import DialogBox from "../../components/dialogBox/DialogBox"
import userActions from "../../redux/actions/userActions"
import { useNavigate, useParams } from "react-router-dom"

const EditProfile = () => {
    const { userMsg, userError, user } = useSelector((state) => { return state.user })
    const { userId } = useParams()
    const redirectTo = useNavigate()
    const dispatch = useDispatch()
    const [userData, setUserData] = useState({
        name: user.name,
        about: user.about,
        email: user.email,
        password: '',
        profilePicture: ''
    })

    const handleInput = (e) => {
        const name = e.target.name
        if (name === 'profilePicture') {
            setUserData({ ...userData, [name]: e.target.files[0] })
        }
        else {
            setUserData({ ...userData, [name]: e.target.value })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('name', userData.name)
        formData.append('email', userData.email)
        formData.append('password', userData.password)
        formData.append('about', userData.about)
        userData.profilePicture && formData.append('profilePicture', userData.profilePicture)
        dispatch(userActions.update(formData, userId))
    }
    const successProfile = () => {
        dispatch(userActions.clearMsg())
        redirectTo(`/user/${user._id}`)
    }
    const successCancel = () => {
        dispatch(userActions.clearMsg())
    }

    const handleError = () => {
        dispatch(userActions.clearError())
    }

    return (
        <Fragment>
            <form className="card midpage-wrapper align-ver">
                <h2 className="edit-profile-heading">Edit Profile</h2>
                <div className="profile-picture">
                    <div className="img-wrapper">
                        <img src={user.profileURL} alt="profile" />
                    </div>
                    <input
                        id="logo"
                        type='file'
                        name="profilePicture"
                        onChange={handleInput}
                        accept="image/*" />
                    <label htmlFor="logo" className="label-btn main-button">Change Profile Picture</label>
                    <small>{userData.profilePicture.name}</small>
                </div>
                <div className="form-inputs-wrapper">
                    <input
                        className="input"
                        name="name"
                        placeholder="Name"
                        onChange={handleInput}
                        value={userData.name} />
                    <input
                        className="input"
                        name="about"
                        placeholder="About"
                        onChange={handleInput}
                        value={userData.about} />

                    <input
                        className="input"
                        name="email"
                        type="email"
                        placeholder="Email"
                        onChange={handleInput}
                        value={userData.email} />

                    <input
                        className="input"
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={handleInput}
                        value={user.password} />
                </div>
                <button className="main-button" onClick={handleSubmit}>Submit</button>
            </form>
            {
                userMsg &&
                <DialogBox
                    msg={userMsg}
                    success={true}
                    leftBtn="Cancel"
                    rightBtn="My Profile"
                    leftBtnCb={successCancel}
                    rightBtnCb={successProfile} />
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

export default EditProfile