import auth from '../../auth/auth'
import UserIcon from '../icons/userIcon'
import { useState } from 'react'
import postAPI from '../../api/post'
import { Link } from 'react-router-dom'


const Comments = (props) => {
    const jwt = auth.getToken()
    // set text input by user and adjust textarea height according to current content
    const [values, setValues] = useState({
        text: "",
        inputHieght: '35px'
    })
    const handleChange = (event) => {
        setValues({ ...values, text: event.target.value, inputHieght: event.target.scrollHeight })
    }

    /* send comment to backend if there is text and user press enter
    on successful comment update comments to include the current one */
    const addComment = (event) => {
        if (event.keyCode === 13 && event.target.value) {
            event.preventDefault()
            postAPI.comment(jwt.user._id, jwt.token, props.postId, { text: values.text }).then((data) => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    setValues({ ...values, text: '' })
                    props.updateComments(data.comments)
                }
            })
        }
    }

    // delete comment and update current comments 
    const deleteComment = (commentId) => {
        return (event) => {
            postAPI.uncomment(jwt.user._id, jwt.token, props.postId, commentId).then((data) => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    props.updateComments(data.comments)
                }
            })
        }
    }

    return (
        <div className='comments-wrapper'>
            <div className="comment-header">
                <div className='comment-img'>
                    {
                        // call users's image, if not exists view user icon 
                        auth.getToken().user.photo?.contentType ?
                            <img src={'https://mern--social-app.herokuapp.com/api/users/photo/' + auth.getToken().user._id} alt="" /> :
                            <UserIcon />
                    }
                </div>
                <div className='comment-input'>
                    <textarea
                        value={values.text}
                        onKeyDown={addComment}
                        style={{ height: values.inputHieght }}
                        onChange={handleChange}
                        placeholder='Write Something...' />
                </div>
            </div>
            <div className='comments'>
                {
                    props.comments.map((item, i) => {
                        return (
                            <div className='comment--wrapper' key={i}>
                                <div className='comment-img'>
                                    {
                                        item.postedBy.photo ?
                                            <img src={'https://mern--social-app.herokuapp.com/api/users/photo/' + item.postedBy._id} alt="" /> :
                                            <UserIcon />
                                    }
                                </div>
                                <div className='comment-content'>
                                    <Link to={"/user/" + item.postedBy._id}>
                                        <span >{item.postedBy.name}</span>
                                    </Link>
                                    <span className='comment-text'>{item.text}</span>
                                    <span className='comment-date'>{(new Date(item.created)).toDateString()} | </span>
                                    {
                                        auth.getToken().user._id === item.postedBy._id &&
                                        <button onClick={deleteComment(item._id)} >delete</button>
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Comments
