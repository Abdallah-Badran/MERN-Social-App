import { useEffect, useState } from "react"
import FollowGrid from '../../components/followGrid/followGrid'
import PostList from '../../components/postList/postList.js'
import { useSelector } from "react-redux"

const ProfileTabs = ({ profile }) => {
    // set tab state accroding to the clicked tab
    const [tab, setTab] = useState('0')
    const changeTab = (e) => {
        setTab(e.target.id)
    }
    const { posts } = useSelector((state) => { return state.post })


    const [profilePosts, setProfilePosts] = useState([])
    useEffect(() => {
        setProfilePosts(
            posts?.filter((post) => {
                return post?.postedBy?._id === profile?._id
            })
        )
    }, [posts, profile])
    console.log(profilePosts)

    // highlite the clicked tab with specific style 
    const isActive = (num) => {
        if (tab === num) {
            return { 'color': 'blue', 'borderBottom': 'solid 2px blue' }
        }
        else {
            return null
        }
    }

    return (
        <div className="profile-tabs-wrapper">
            <div className="tabs">
                <button style={isActive('0')} id="0" onClick={changeTab}>Posts</button>
                <button style={isActive('1')} id="1" onClick={changeTab}>Following</button>
                <button style={isActive('2')} id="2" onClick={changeTab}>Followers</button>
            </div>
            <div className="tab-content">
                {tab === '0' && <PostList posts={profilePosts} />}
                {tab === '1' && <FollowGrid people={profile.following} />}
                {tab === '2' && <FollowGrid people={profile.followers} />}
            </div>
        </div>
    )
}

export default ProfileTabs