import { Fragment } from 'react'
import { useSelector } from 'react-redux'
import RightArrow from '../../components/icons/rightArrow'
import { Link } from 'react-router-dom'

const Users = () => {
    const { allUsers } = useSelector((state) => { return state.allUsers })
    return (
        <Fragment>
            <div className='card midpage-wrapper align-ver'>
                <h2 className="card-heading">All Users</h2>
                {
                    allUsers.map((user, index) => {
                        return <div key={index} className="profile_first_row align-hor">
                            <div className="profile-details align-hor">
                                <div className="img-wrapper">
                                    <img src={user.profilePicture.url} alt="profile" />
                                </div>
                                <div className="user-info">
                                    <h3>{user.name}</h3>
                                </div>
                            </div>
                            <div className="profile-options">
                                <Link to={`/user/${user._id}`}>
                                    <button className="icon"><RightArrow /></button>
                                </Link>
                            </div>
                        </div>
                    })
                }
            </div>

        </Fragment>
    )
}

export default Users