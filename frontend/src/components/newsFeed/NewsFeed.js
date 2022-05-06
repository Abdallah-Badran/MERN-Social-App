import NewPost from "../newPost/NewPost"
import PostList from "../postList/postList"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"

const NewsFeed = () => {
    const { user } = useSelector((state) => { return state.user })
    const { posts } = useSelector((state) => { return state.post })
    const { allUsers } = useSelector((state) => { return state.allUsers })
    const [newsFeedPosts, setNewsFeedPosts] = useState([])
    const [userWithFollowings, setUserWithFollowings] = useState({})

    useEffect(() => {
        /*setUserWithFollowings(allUsers?.find((u) => { return u._id === user?._id }))*/
        setNewsFeedPosts(
            posts?.filter((post) => {
                return (
                    (userWithFollowings?.following?.some((following) => { return following?._id === post?.postedBy?._id })) ||
                    (post?.postedBy?._id === userWithFollowings?._id))
            })
        )
    }, [userWithFollowings, posts/*, allUsers, user*/])

    useEffect(() => {
        setUserWithFollowings(allUsers?.find((u) => { return u._id === user?._id }))
    }, [allUsers, user])


    return (
        <div className="card align-ver midpage-wrapper">
            <h2 className="card-heading home-heading">NewsFeed</h2>
            <NewPost />
            <PostList posts={newsFeedPosts} />
        </div>
    )
}

export default NewsFeed