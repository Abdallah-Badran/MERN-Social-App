import { useState, useEffect } from 'react'
import auth from '../../auth/auth.js'
import userAPI from '../../api/user.js'
import { useNavigate, useParams } from 'react-router-dom'
import UserIcon from '../../components/icons/userIcon.js'

const EditProfile = () => {
    // set focus state to cuurent focused input or to '' when input is unfocused
    const [focus, setFocus] = useState('')
    const handleFocus = (e) => {
        setFocus(e.target.name)
    }
    const defaultFocus = () => {
        setFocus('')
    }

    const [values, setValues] = useState({
        name: '',
        password: '',
        email: '',
        about: '',
        photo: '',
        error: ''
    })

    // get user data 
    const jwt = auth.getToken()
    const { userId } = useParams()
    useEffect(() => {
        userAPI.read(userId, jwt.token).then((data) => {
            if (data && data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setValues({ ...values, photo: data.photo, name: data.name, email: data.email, about: data.about })
            }
        })
    }, [userId])

    // send data to backend, redirect to user prfile on successful update 
    const redirectTo = useNavigate()
    const clickSubmit = (e) => {
        e.preventDefault()
        let userData = new FormData()
        values.name && userData.append('name', values.name)
        values.email && userData.append('email', values.email)
        values.password && userData.append('password', values.password)
        values.about && userData.append('about', values.about)
        values.photo && userData.append('photo', values.photo)

        userAPI.update(userId, jwt.token, userData).then((data) => {
            if (data && data.error) {
                setValues({ ...values, error: data.error })
            } else {
                redirectTo('/user/' + userId)
            }
        })
    }

    // change user data states whenever change
    const handleChange = (e) => {
        const name = e.target.name
        const value = name === 'photo' ? e.target.files[0] : e.target.value
        setValues({ ...values, [name]: value })
    }

    return (
        <div>
            <form onSubmit={clickSubmit}>
                <h2 className='edit-title'>Edit Profile</h2>
                <div className='user-image'>
                    {
                        values.photo?.contentType ?
                            <img src={`/api/users/photo/${userId}?${new Date().getTime()}`} alt="" /> :
                            <UserIcon />
                    }
                </div>
                <div className='file-input'>
                    <input name='photo' type='file' id="input-image" onChange={handleChange}></input>
                    <label htmlFor="input-image">Choose an image</label>
                    {values.photo && <small>{values.photo.name}</small>}
                </div>
                <div className="input-label">
                    <label style={focus === 'name' ? { color: 'rgb(21, 33, 143)' } : { display: 'none' }}>Name</label>
                    <input
                        onFocus={handleFocus}
                        onBlur={defaultFocus}
                        placeholder={focus === 'name' ? "" : "Name"}
                        name="name"
                        onChange={handleChange}
                        value={values.name}
                    >
                    </input>
                </div>
                <div className="input-label">
                    <label style={focus === 'email' ? { color: 'rgb(21, 33, 143)' } : { display: 'none' }}>Email</label>
                    <input
                        type='email'
                        onFocus={handleFocus}
                        onBlur={defaultFocus}
                        placeholder={focus === 'email' ? "" : "Email"}
                        name="email"
                        onChange={handleChange}
                        value={values.email}
                    >
                    </input>
                </div>
                <div className="input-label">
                    <label style={focus === 'about' ? { color: 'rgb(21, 33, 143)' } : { display: 'none' }}>About</label>
                    <input
                        onFocus={handleFocus}
                        onBlur={defaultFocus}
                        placeholder={focus === 'about' ? "" : "About"}
                        name="about"
                        onChange={handleChange}
                        value={values.about}
                    >
                    </input>
                </div>
                <div className="input-label">
                    <label style={focus === 'password' ? { color: 'rgb(21, 33, 143)' } : { display: 'none' }}>Password</label>
                    <input
                        type='password'
                        onFocus={handleFocus}
                        onBlur={defaultFocus}
                        placeholder={focus === 'password' ? "" : "Password"}
                        name="password"
                        onChange={handleChange}
                        value={values.password}
                    >
                    </input>
                </div>
                {
                    values.error && (<span>{values.error}</span>)
                }
                <button type="submit">SUBMIT</button>
            </form>
        </div>
    )
}

export default EditProfile