import UserIcon from "../icons/userIcon"
import { Link } from "react-router-dom"
import CommentIcon from "../icons/comment"
import FavoriteIcon from '../icons/favouriteIcon'
import postAPI from "../../api/post"
import auth from '../../auth/auth'
import { useState } from 'react'
import Comments from '../../components/comments/comments'
import Delete from "../icons/delete"

const Post = (props) => {
    // return true if the post is liked by the signed-in user
    const jwt = auth.getToken()
    const checkLike = (likes) => {
        let match = likes.indexOf(jwt.user._id) !== -1
        return match
    }
    const [values, setValues] = useState({
        like: checkLike(props.post.likes),
        likes: props.post.likes.length,
        comments: props.post.comments,
    })

    // like post if unliked, unlike if liked  
    const clickLike = () => {
        let callApi = values.like ? postAPI.unlike : postAPI.like
        callApi(jwt.user._id, jwt.token, props.post._id).then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                setValues({ ...values, like: !values.like, likes: data.likes.length })
            }
        })
    }

    // handle the favourite icon color according to if the post is liked
    const isLiked = () => {
        if (values.like) return { color: 'red' }
        else return { color: 'rgb(230, 175, 175)' }
    }

    const updateComments = (comments) => {
        setValues({ ...values, comments: comments })
    }

    // delete post by it's id 
    const deletePost = () => {
        postAPI.remove(props.post._id, jwt.token).then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                props.onRemove(props.post)
            }
        })
    }

    return (
        <div className="post-wrapper">
            <div className="user-post-header">
                <div className="post-image-name">
                    <div className="user-post-image">
                        {
                            // set poster photo if exists, else view user icon 
                            props.post.postedBy.photo ?
                                <img src={'https://mern--social-app.herokuapp.com/api/users/photo/' + props.post.postedBy._id} alt="" /> :
                                <UserIcon />
                        }
                    </div>
                    <div className="user-name-date">
                        <span className="user-post-name">
                            <Link to={"/user/" + props.post.postedBy._id}>{props.post.postedBy.name}</Link>
                        </span>
                        <small>{new Date(props.post.created).toDateString()}</small>
                    </div>
                </div>
                <div className="delete-icon">
                    {
                        // only poster can have the delete option for his post 
                        props.post.postedBy._id === auth.getToken().user._id &&
                        <button onClick={deletePost}><Delete /></button>
                    }
                </div>
            </div>
            <div className="user-post-content">
                <p>{props.post.text}</p>
                {
                    props.post.photo &&
                    <div className="image-wrapper">
                        <img src={'https://mern--social-app.herokuapp.com/api/posts/photo/' + props.post._id} alt="" />
                    </div>
                }
                <div className="post-actions">
                    <div className="like-wrapper">
                        <button style={isLiked()} onClick={clickLike}><FavoriteIcon /></button>
                        <span>{values.likes}</span>
                    </div>
                    <div className="comment-wrapper">
                        <button><CommentIcon /></button>
                        <span>{values.comments.length}</span>
                    </div>
                </div>
            </div>
            <Comments postId={props.post._id} comments={values.comments} updateComments={updateComments} />
        </div>
    )
}

export default Post