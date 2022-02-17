import { useState, useEffect } from 'react'
import userAPI from '../../api/user'
import auth from '../../auth/auth'
import UserIcon from '../icons/userIcon'
import { Link } from 'react-router-dom'

const FindPeople = () => {
    const jwt = auth.getToken()
    const [values, setValues] = useState({
        users: [],
        open: false,
        followMessage: ''
    })

    useEffect(() => {
        userAPI.findPeople({ userId: jwt.user._id }, { t: jwt.token }).then((data) => {
            if (data && data.error) {
                console.log(data.error)
            } else {
                setValues({ ...values, users: data })
            }
        })
    }, [])

    const clickFollow = (user, index) => {
        userAPI.follow(jwt.user._id, jwt.token, user._id).then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                let toFollow = values.users
                toFollow.splice(index, 1)
                setValues({ ...values, users: toFollow, open: true, followMessage: `Following ${user.name}!` })
            }
        })
    }

    setTimeout(() => {
        if (values.open) {
            setValues({ ...values, open: false })
        }
    }, 6000)

    return (
        <div className='main-wrapper'>
            <h4 >Who to follow</h4>
            <div className='suggested-users-wrapper'>
                {
                    values.users.map((item, i) => {
                        return (
                            <div className='suggested-user-wrapper' key={i}>
                                <Link to={"/user/" + item._id}>
                                    <div className='suggested-user-img'>
                                        {
                                            item.photo ?
                                                <img src={'https://mern--social-app.herokuapp.com/api/users/photo/' + item._id}></img> :
                                                <UserIcon></UserIcon>
                                        }
                                        <span>{item.name}</span>
                                    </div>
                                </Link>
                                <button onClick={() => { clickFollow(item, i) }}>Follow</button>
                            </div>
                        )
                    })
                }
            </div>
            {
                values.open && <p className='follow-message'>{values.followMessage}</p>
            }
        </div>
    )
}

export default FindPeople