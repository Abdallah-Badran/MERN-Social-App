import { Link } from "react-router-dom"
import HomeIcon from "../icons/homeIcon"
import { useDispatch, useSelector } from 'react-redux'
import userActions from '../../redux/actions/userActions'


const Navbar = () => {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => { return state.user })
    const signOut = () => {
        dispatch(userActions.signOut())
    }
    return (
        <nav className="align-hor">
            <h2>Social App</h2>
            <ul className="align-hor">
                <li><Link to='/'><HomeIcon /></Link></li>
                <li><Link to='/signup'>SignUp</Link></li>
                <li><Link to='/login'>SignIn</Link></li>
                <li><Link to={`/user/edit/${user?._id}`}>Profile</Link></li>
                <li><Link to='/users'>Users</Link></li>
                <li><button onClick={signOut}>SignOut</button></li>
            </ul>
        </nav >
    )
}

export default Navbar