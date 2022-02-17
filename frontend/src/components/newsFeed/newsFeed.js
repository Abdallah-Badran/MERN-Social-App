import NewPost from '../../components/newPost/newPost'
import { useState, useEffect } from 'react'
import auth from '../../auth/auth'
import postAPI from '../../api/post'
import PostList from '../../components/postList/postList'

const Newsfeed = () => {
    let [posts, setPosts] = useState([])
    const jwt = auth.getToken()

    useEffect(() => {
        postAPI.listNewsFeed({ userId: jwt.user._id }, { t: jwt.token }).then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                setPosts(data)
            }
        })
    }, [posts])

    const addPost = (post) => {
        let updatedPosts = [...posts]
        updatedPosts.unshift(post)
        setPosts(updatedPosts)
        window.location.reload()
    }

    const removePost = (post) => {
        const updatedPosts = [...posts]
        const index = updatedPosts.indexOf(post)
        updatedPosts.splice(index, 1)
        setPosts(updatedPosts)
    }

    return (
        <div className='newsfeed-wrapper'>
            <NewPost addUpdate={addPost}></NewPost>
            <PostList removeUpdate={removePost} posts={posts} ></PostList>
        </div>
    )
}

export default Newsfeed