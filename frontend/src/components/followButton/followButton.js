import userAPI from "../../api/user"

const FollowProfileButton = (props) => {
    const followClick = () => {
        props.onButtonClick(userAPI.follow)
    }
    const unfollowClick = () => {
        props.onButtonClick(userAPI.unfollow)
    }
    return (
        <div className='follow-buttons'>
            {
                // if signed-in is following fetched user, view unfollow btn else view follow btn
                props.isFollowing
                    ? (<button className='unfollow-btn' onClick={unfollowClick}>Unfollow</button>)
                    : (<button className='follow-btn' onClick={followClick}>Follow</button>)
            }
        </div>
    )
}

export default FollowProfileButton