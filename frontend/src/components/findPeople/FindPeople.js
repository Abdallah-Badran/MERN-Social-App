import { useSelector, useDispatch } from "react-redux"
import allUsersActions from '../../redux/actions/allUsers'
import { Link } from 'react-router-dom'

const FindPeople = () => {
    const { allUsers } = useSelector((state) => { return state.allUsers })
    const { user } = useSelector((state) => { return state.user })
    const dispatch = useDispatch()

    const clickFollow = (f) => {
        return () => {
            dispatch(allUsersActions.follow(f))
        }
    }

    return (
        <div id="fp-wrap" className="card midpage-wrapper align-ver">
            <h2 className="card-heading  home-heading">Who to follow</h2>
            <div className="find-people-wrap">

                {
                    allUsers.map((item, i) => {
                        return (
                            !(item.followers.some((follower) => { return follower._id === user._id })) &&
                            (item._id !== user._id) &&
                            <div className="profile_first_row align-hor" key={i}>
                                <Link className="profile-details align-hor" to={`/user/${item._id}`}>
                                    <div className='img-wrapper'>
                                        <img src={item.profilePicture.url} alt="" />
                                    </div>
                                    <div className="user-info">
                                        <span>{item.name}</span>
                                    </div>
                                </Link>
                                <div className="profile-options align-hor">
                                    <button className="main-button" onClick={clickFollow(item._id)}>Follow</button>
                                </div>
                            </div>

                        )
                    })
                }
            </div>
        </div>
    )
}

export default FindPeople