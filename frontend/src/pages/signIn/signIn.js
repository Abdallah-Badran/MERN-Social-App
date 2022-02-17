import React, { useState } from 'react'
import auth from '../../auth/auth'
import { useNavigate } from 'react-router-dom'
import authAPI from '../../api/auth'

const Signin = () => {
    // set focus state to cuurent focused input or to '' when input is unfocused
    const [focus, setFocus] = useState('')
    const handleFocus = (e) => {
        setFocus(e.target.name)
    }
    const defaultFocus = () => {
        setFocus('')
    }

    // set user data whenever changed 
    const [userData, setUserData] = useState({
        email: '',
        password: '',
    })
    const handleChange = (e) => {
        const name = e.target.name
        setUserData({ ...userData, [name]: e.target.value })
    }

    /* send data to bakcend and get response, set token and
    redirect to home on successful login, view error if any */
    const [error, setError] = useState('')
    const redirectTo = useNavigate()
    const clickSubmit = (e) => {
        e.preventDefault()
        const user = {
            email: userData.email,
            password: userData.password
        }
        authAPI.signin(user).then((data) => {
            if (data.error) {
                setError(data.error)
            } else {
                if (auth.setToken(data)) {
                    redirectTo('/')
                }
            }
        })
    }

    return (
        <div>
            <form onSubmit={clickSubmit}>
                <h2>Sign In</h2>
                <div className="input-label">
                    <label style={focus === 'email' ? { color: 'rgb(21, 33, 143)' } : { display: 'none' }}>Email</label>
                    <input
                        type='email'
                        onFocus={handleFocus}
                        onBlur={defaultFocus}
                        placeholder={focus === 'email' ? "" : "Email"}
                        name="email"
                        onChange={handleChange}
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
                    >
                    </input>
                </div>
                {
                    error && (<span>{error}</span>)
                }
                <button type="submit">SUBMIT</button>
            </form>
        </div>
    )
}

export default Signin