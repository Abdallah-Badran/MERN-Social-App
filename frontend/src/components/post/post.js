import { Link } from "react-router-dom"
import CommentIcon from "../icons/comment"
import FavoriteIcon from '../icons/favouriteIcon'
import Comments from '../../components/comments/comments'
import DeleteIcon from "../icons/delete"
import { useDispatch, useSelector } from "react-redux"
import postActions from '../../redux/actions/postActions'
import { useEffect, useState } from "react"


const Post = ({ post }) => {
    const { user } = useSelector((state) => { return state.user })
    const [isPostLiked, setIsPostLiked] = useState()
    const dispatch = useDispatch()
    // return true if the post is liked by the signed-in user

    const checkLike = (likes) => {
        const match = likes?.some((liker) => { return liker._id === user?._id })/*likes.indexOf(user._id) !== -1*/
        return match
    }

    // like post if unliked, unlike if liked in frontend first 
    const clickLike = () => {
        const callApi = isPostLiked ? postActions.unlike : postActions.like
        dispatch(callApi(post._id))
    }

    // handle the favourite icon color according to if the post is liked
    const isLiked = () => {
        if (isPostLiked) return { color: 'red' }
        else return { color: 'rgb(230, 175, 175)' }
    }

    useEffect(() => {
        setIsPostLiked(checkLike(post?.likes))
    }, [post, checkLike])

    // delete post by it's id 
    const deletePost = () => {
        dispatch(postActions.deletePost(post?._id))
    }


    return (
        <div className="post-wrapper">
            <div className="post-header align-hor">
                <div className="profile-details align-hor">
                    <div className="img-wrapper">
                        <img src={post?.postedBy?.profilePicture?.url} alt="profile" />
                    </div>
                    <div className="user-info">
                        <h4><Link to={`/user/${post?.postedBy?._id}`}>{post?.postedBy?.name}</Link></h4>
                        <small>{new Date(post?.createdAt).toDateString()}</small>
                    </div>
                </div>
                <div className="profile-options">
                    {
                        // only poster can have the delete option for his post 
                        post?.postedBy?._id === user._id &&
                        <button className="icon" onClick={deletePost}><DeleteIcon /></button>
                    }
                </div>
            </div>
            <div className="user-post-content">
                <p>{post?.text}</p>
                {
                    post?.photo &&
                    <div className="image-wrapper">
                        <img src={post.photo.url} alt="" />
                    </div>
                }
                <div className="post-actions align-hor">
                    <div className="like-wrapper">
                        <button className="icon" style={isLiked()} onClick={clickLike}><FavoriteIcon /></button>
                        <span>{post?.likes?.length}</span>
                    </div>
                    <div className="comment-wrapper">
                        <button className="icon"><CommentIcon /></button>
                        <span>{post?.comments?.length}</span>
                    </div>
                </div>
            </div>
            <Comments post={post} />
        </div>
    )
}

export default Post