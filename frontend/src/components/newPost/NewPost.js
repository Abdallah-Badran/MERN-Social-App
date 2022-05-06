import React, { useState } from 'react'
import CameraIcon from '../icons/camera'
import { useDispatch, useSelector } from 'react-redux'
import postActions from '../../redux/actions/postActions'

const NewPost = () => {
    const { user } = useSelector((state) => { return state.user })
    const dispatch = useDispatch()

    const [postData, setPostData] = useState({
        text: '',
        photo: '',
    })

    const clickPost = () => {
        const post = new FormData()
        post.append('text', postData.text)
        post.append('photo', postData.photo)
        dispatch(postActions.create(post))
        setPostData({ ...postData, text: '', photo: '' })
    }


    // update post data whnever there is a change
    const handleChange = (event) => {
        const name = event.target.name
        const value = name === 'photo'
            ? event.target.files[0]
            : event.target.value
        setPostData({ ...postData, [name]: value })
    }

    return (
        <div className="new-post-wrapper">
            <div className='card '>
                <div className="profile-details align-hor">
                    <div className="img-wrapper">
                        <img src={user?.profileURL} alt="profile" />
                    </div>
                    <div className="user-info">
                        <h3>{user?.name}</h3>
                    </div>
                </div>
                <div className='inputs'>
                    <textarea
                        name='text'
                        className='input'
                        placeholder="What is in your mind?"
                        onChange={handleChange}
                        value={postData.text} />
                    <input name='photo' id="file" type="file" accept='image/*' onChange={handleChange}></input>
                    <div className='camera-imgName'>
                        <label htmlFor="file" className='label-btn'><CameraIcon /></label>
                        <small>{postData.photo && postData.photo.name}</small>
                    </div>
                </div>
                <div className='post-footer'>
                    <button
                        disabled={postData.text === ''}
                        className={'main-button'}
                        style={postData.text === '' ? { 'backgroundColor': 'rgb(223, 215, 215)' } : null}
                        onClick={clickPost} >POST</button>
                </div>
            </div>
        </div>
    )
}

export default NewPost