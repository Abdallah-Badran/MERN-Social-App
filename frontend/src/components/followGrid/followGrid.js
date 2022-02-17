import UserIcon from '../../components/icons/userIcon'
import { Link } from 'react-router-dom'

const FollowGrid = (props) => {
    return (
        <div className="follow-container">
            {
                props.people.map((person) => {
                    return (
                        < div className="person-wrapper" key={person._id} >
                            <Link to={"/user/" + person._id}>
                                <div className='person'>
                                    {
                                        person.photo ?
                                            <img src={'https://mern--social-app.herokuapp.com/api/users/photo/' + person._id} alt="" /> :
                                            <UserIcon />
                                    }
                                    <p> {person.name}</p>
                                </div>
                            </Link>
                        </div >

                    )
                })
            }
        </div >
    )
}

export default FollowGrid
