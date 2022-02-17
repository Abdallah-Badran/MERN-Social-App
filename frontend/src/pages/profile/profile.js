import userAPI from '../../api/user'
import { Link, useParams, useNavigate } from 'react-router-dom'
import auth from '../../auth/auth'
import UserIcon from '../../components/icons/userIcon'
import Edit from '../../components/icons/Edit'
import { useState, useEffect } from 'react'
import DeleteUser from '../../components/deleteUser/deleteUser'
import FollowProfileButton from '../../components/followButton/followButton'
import ProfileTabs from '../../components/profileTabs/profileTabs'
import postAPI from '../../api/post'


const Profile = () => {

    // return true if the signed-in user is following the fetched user
    const checkFollow = (user) => {
        const match = user.followers.some((follower) => {
            return follower._id === jwt.user._id
        })
        return match
    }

    // accept follow or unfollow callback from the follow btn 
    const clickFollowButton = (callApi) => {
        callApi(jwt.user._id, jwt.token, values.user._id).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setValues({ ...values, user: data, isFollowing: !values.isFollowing })
            }
        })
    }

    // load posts of the fetched user
    const loadPosts = (userId) => {
        postAPI.listByUser(userId, jwt.token).then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                setPosts(data)
            }
        })
    }

    // update posts on post remove 
    const removePost = (post) => {
        const updatedPosts = posts
        const index = updatedPosts.indexOf(post)
        updatedPosts.splice(index, 1)
        setPosts(updatedPosts)
    }

    /* get user data by id and token, if not previously signed redirect to signn in,
    if user previously signed in set user data and load posts of this user */
    const jwt = auth.getToken()
    const { userId } = useParams()
    const redirectTo = useNavigate()
    const [posts, setPosts] = useState([])
    const [values, setValues] = useState({
        user: {},
        isFollowing: false
    })
    useEffect(() => {
        userAPI.read(userId, jwt.token).then((data) => {
            if (data && data.error) {
                redirectTo('/signin')
            } else {
                const following = checkFollow(data)
                setValues({ ...values, user: data, isFollowing: following })
                loadPosts(data._id)
            }
        })
    }, [userId])


    return (
        <div className="profile">
            <h2 className="profile-heading">Profile</h2>
            <div className="profile-middle">
                <div className='user'>
                    {
                        /*add a time value to the photo URL to bypass the browser's default image caching behavior.*/
                        values.user.photo ?
                            <img src={`https://mern--social-app.herokuapp.com/api/users/photo/${values.user._id}?${new Date().getTime()}`} alt="" /> :
                            <UserIcon />
                    }
                    <div className='user-info'>
                        <p className='username'>{values.user.name}</p>
                        <p className='user-email'>{values.user.email}</p>
                    </div>
                </div>
                {
                    // view edit and delete options if the signed-in user is the fetched one, else view follow btn
                    auth.getToken().user && auth.getToken().user._id === values.user._id ?
                        (<div className='user-tools'>
                            <Link to={"/user/edit/" + values.user._id}>
                                <button className='icon'><Edit /></button>
                            </Link>
                            <DeleteUser userId={values.user._id} />
                        </div>) :
                        (<FollowProfileButton isFollowing={values.isFollowing} onButtonClick={clickFollowButton} />)
                }
            </div>
            <div className='profile-footer'>
                {values.user.about && <p>{values.user.about}</p>}
                <small >{"Joined: " + (new Date(values.user.createdAt)).toDateString()}</small>
            </div>
            <ProfileTabs user={values.user} posts={posts} removePostUpdate={removePost}></ProfileTabs>
        </div>
    )
}

export default Profile