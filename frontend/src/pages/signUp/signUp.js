import SignupDialog from '../../components/signupDialog/signupDialog'
import { useState } from 'react'
import userAPI from '../../api/user'

const Signup = () => {
    // set focus state to cuurent focused input or to '' when input is unfocused
    const [focus, setFocus] = useState('')
    const handleFocus = (e) => {
        setFocus(e.target.name)
    }
    const defaultFocus = () => {
        setFocus('')
    }

    // set state of user data whenever changes in the view
    const [userData, setUserData] = useState({
        name: '',
        password: '',
        email: '',
    })
    const handleChange = (e) => {
        const name = e.target.name
        setUserData({ ...userData, [name]: e.target.value })
    }

    /* send data to backend and get response, set error state in unsuccessful user creation 
    or set state of open to open a pop up on successful user creation*/
    const [error, setError] = useState([])
    const [open, setOpen] = useState(false)
    const clickSubmit = (e) => {
        e.preventDefault()
        const user = {
            name: userData.name,
            email: userData.email,
            password: userData.password
        }
        userAPI.create(user).then((data) => {
            if (data.error) {
                setError(data.error)
            } else {
                setOpen(true)
            }
        })
    }
    return (
        <div>
            <form onSubmit={clickSubmit}>
                <h2>Sign Up</h2>
                <div className="input-label">
                    <label style={focus === 'name' ? { color: 'rgb(21, 33, 143)' } : { display: 'none' }}>Name</label>
                    <input
                        onFocus={handleFocus}
                        onBlur={defaultFocus}
                        placeholder={focus === 'name' ? "" : "Name"}
                        name="name"
                        onChange={handleChange}
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
                    error && (error.map((err) => { return <span>{err}</span> }))
                }
                <button type="submit">SUBMIT</button>
            </form>
            {open && <SignupDialog />}
        </div>
    )
}

export default Signup
