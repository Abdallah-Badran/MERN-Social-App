import UserIcon from '../../components/icons/userIcon'
import React, { useState, useEffect } from 'react'
import auth from '../../auth/auth'
import CameraIcon from '../icons/camera'
import postAPI from '../../api/post'

const NewPost = (props) => {
    const [values, setValues] = useState({
        text: '',
        photo: '',
        error: '',
        user: {},
    })
    const jwt = auth.getToken()

    useEffect(() => {
        setValues({ ...values, user: auth.getToken().user })
    }, [])

    const clickPost = () => {
        let postData = new FormData()
        postData.append('text', values.text)
        postData.append('photo', values.photo)
        postAPI.create(jwt.user._id, jwt.token, postData).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setValues({ ...values, text: '', photo: '' })
                props.addUpdate(data)
            }
        })
    }

    // update post data whnever there is a change
    const handleChange = (event) => {
        const name = event.target.name
        const value = name === 'photo'
            ? event.target.files[0]
            : event.target.value
        setValues({ ...values, [name]: value })
    }

    // activate the post button whenver there is a text to post
    const isActive = () => {
        if (values.text !== '') {
            return { backgroundColor: 'rgb(74, 74, 221)', color: 'white' }
        }
        else {
            return null
        }
    }

    return (
        <div className="post">
            <div className="post-header">
                <div className="user-post-img">
                    {
                        values.user.photo?.contentType ?
                            <img src={`https://mern--social-app.herokuapp.com/api/users/photo/${values.user._id}`} alt=''></img> :
                            <UserIcon />
                    }
                </div>
                <label>{values.user.name}</label>
            </div>
            <div className='inputs'>
                <textarea
                    name='text'
                    placeholder="What is in your mind?"
                    onChange={handleChange}
                    value={values.text} />
                <input name='photo' id="file" type="file" accept='image/*' onChange={handleChange}></input>
                <div className='camera-imgName'>
                    <label htmlFor="file"><CameraIcon /></label>
                    <small>{values.photo ? values.photo.name : ''}</small>
                </div>
            </div>
            {values.error && <span>{values.error}</span>}
            <div className='post-footer'>
                <button disabled={values.text === ''} style={isActive()} onClick={clickPost} >POST</button>
            </div>
        </div>
    )
}

export default NewPost