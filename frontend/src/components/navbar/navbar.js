import auth from '../../auth/auth'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import HomeIcon from '../icons/homeIcon'

// highlite the chosen section  
const isActive = (location, path) => {
    if (location.pathname === path)
        return { color: '#ff4081' }
    else
        return { color: '#ffffff' }
}

const Navbar = () => {
    // get the current URL
    const location = useLocation()

    const redirectTo = useNavigate()
    return (
        <nav >
            {/*view title, home and users sections for signed in and not signed users*/}
            <div className='title-home'>
                <h1 className='title'>Social App</h1>
                <Link to="/">
                    <button
                        className='home-btn'
                        style={isActive(location, "/")}>
                        <HomeIcon />
                    </button>
                </Link>
            </div>
            <div>
                <Link to="/users">
                    <button
                        className='btn'
                        style={isActive(location, "/users")}>
                        Users
                    </button>
                </Link>
                {
                    // view sign up or sign in for not previously signed-in users 
                    !auth.getToken() && (<span>
                        <Link to="/signup">
                            <button
                                className='btn'
                                style={isActive(location, "/signup")}>
                                Sign up
                            </button>
                        </Link>
                        <Link to="/signin">
                            <button
                                className='btn'
                                style={isActive(location, "/signin")}>
                                Sign In
                            </button>
                        </Link>
                    </span>)
                }
                {
                    // view profile and sign out for previously signed-in users
                    // on sign out, remove token and redirect to home 
                    auth.getToken() && (<span>
                        <Link to={"/user/" + auth.getToken().user._id}>
                            <button
                                className='btn'
                                style={isActive(location, "/user/" + auth.getToken().user._id)}>
                                My Profile
                            </button>
                        </Link>
                        <button
                            className='btn'
                            color="inherit"
                            onClick={() => {
                                auth.clearToken()
                                redirectTo('/')
                                window.location.reload()
                            }}>
                            Sign out
                        </button>
                    </span>)
                }
            </div>
        </nav>
    )
}

export default Navbar