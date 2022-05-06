import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import postActions from '../../redux/actions/postActions'


const Comments = ({ post }) => {
    const { user } = useSelector((state) => { return state.user })
    const dispatch = useDispatch()
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
            dispatch(postActions.comment(post._id, { text: values.text }))
            setValues({
                text: "",
                inputHieght: '35px'
            })
        }
    }

    // delete comment and update current comments 
    const deleteComment = (commentId) => {
        return () => {
            dispatch(postActions.uncomment(post._id, commentId))
        }
    }

    return (
        <div className='comments-wrapper'>
            <div className="align-hor">
                <div className='img-wrapper'>
                    <img src={user.profileURL} alt="" />
                </div>
                <div className='comment-input'>
                    <textarea
                        className='input'
                        value={values.text}
                        onKeyDown={addComment}
                        style={{ height: values.inputHieght }}
                        onChange={handleChange}
                        placeholder='Write Something...' />
                </div>
            </div>
            <div className='comments'>
                {
                    post?.comments?.map((item, i) => {
                        return (
                            <div className='comment--wrapper align-hor' key={i}>
                                <div className='img-wrapper'>
                                    <img src={item.postedBy.profilePicture.url} alt="" />
                                </div>
                                <div className='comment-content'>
                                    <Link to={`/user/${item.postedBy._id}`}>
                                        <span >{item.postedBy.name}</span>
                                    </Link>
                                    <span className='comment-text'>{item.text}</span>
                                    <div className='date-delete'>{(new Date(item.createdAt)).toDateString()}
                                        {
                                            user._id === item.postedBy._id &&
                                            <button onClick={deleteComment(item._id)} > | delete</button>
                                        }
                                    </div>
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
