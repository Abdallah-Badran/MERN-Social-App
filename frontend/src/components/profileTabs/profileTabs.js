import { useState } from "react"
import FollowGrid from '../../components/followGrid/followGrid'
import PostList from '../../components/postList/postList'

const ProfileTabs = (props) => {
    // set tab state accroding to the clicked tab
    const [tab, setTab] = useState('0')
    const changeTab = (e) => {
        setTab(e.target.id)
    }

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
        <div>
            <div className="tabs">
                <button style={isActive('0')} id="0" onClick={changeTab}>Posts</button>
                <button style={isActive('1')} id="1" onClick={changeTab}>Following</button>
                <button style={isActive('2')} id="2" onClick={changeTab}>Followers</button>
            </div>
            <div className="tab-content">
                {tab === '0' && <PostList removeUpdate={props.removePostUpdate} posts={props.posts} />}
                {tab === '1' && <FollowGrid people={props.user.following} />}
                {tab === '2' && <FollowGrid people={props.user.followers} />}
            </div>
        </div>
    )
}

export default ProfileTabs