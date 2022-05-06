import { useDispatch, useSelector } from "react-redux"
import EditIcon from '../../components/icons/Edit.js'
import DeleteIcon from '../../components/icons/delete'
import { Link, useParams } from "react-router-dom"
import { Fragment, useEffect, useState } from "react"
import allUsersActions from "../../redux/actions/allUsers.js"
import Loader from '../../components/loading/Loader'
import ProfileTabs from '../../components/profileTabs/profileTabs'


const Profile = () => {
    const { allUsers, followLoading } = useSelector((state) => { return state.allUsers })
    const { user } = useSelector((state) => { return state.user })
    const { userId } = useParams()
    const [profile, setProfile] = useState({})
    const [isFollwoing, setIsFollowing] = useState({})
    const dispatch = useDispatch()

    // check if the current user is a follower for the fetched one
    const checkFollow = () => {
        return profile?.followers?.some((follower) => { return follower._id === user._id })
    }

    useEffect(() => {
        setProfile(allUsers.find((user) => { return user._id === userId }))
        setIsFollowing(checkFollow)

    }, [checkFollow, allUsers, userId])

    const handleFollow = () => {
        dispatch(allUsersActions.follow(userId))
    }

    const handleUnfollow = () => {
        dispatch(allUsersActions.unfollow(userId))
    }

    return (
        <div className="profile-wrapper">
            <div className="card midpage-wrapper align-ver">
                <h2 className="card-heading">Profile</h2>
                <div className="profile_first_row align-hor">
                    <div className="profile-details align-hor">
                        <div className="img-wrapper">
                            <img src={profile?.profilePicture?.url} alt="profile" />
                        </div>
                        <div className="user-info">
                            <h3>{profile?.name}</h3>
                            <small>{profile?.email}</small>
                        </div>
                    </div>
                    {
                        userId === user?._id ?
                            <div className="profile-options align-hor">
                                <button className="icon">
                                    <Link to={`/user/edit/${user?._id}`}><EditIcon /></Link>
                                </button>
                                <button className="icon"><DeleteIcon /></button>
                            </div> :
                            <Fragment>
                                {
                                    !followLoading ?
                                        <div>
                                            {
                                                isFollwoing ?
                                                    <button
                                                        className="main-button"
                                                        onClick={handleUnfollow}
                                                        id="Unfollow-btn"
                                                    >
                                                        Unfollow
                                                    </button> :
                                                    <button
                                                        className="main-button"
                                                        onClick={handleFollow}
                                                    >
                                                        Follow
                                                    </button>
                                            }
                                        </div> :
                                        <Loader />
                                }
                            </Fragment>
                    }
                </div>
                <div className="profile_second_row">
                    <h5>{profile?.about}</h5>
                    <small>Joined: {new Date(profile?.createdAt).toDateString()}</small>
                </div>
                <ProfileTabs profile={profile} />
            </div>
        </div>

    )
}

export default Profile