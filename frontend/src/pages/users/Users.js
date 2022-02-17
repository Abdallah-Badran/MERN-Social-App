import UsersListItem from '../../components/usersListItem/usersListItem'
import { useState, useEffect } from 'react'
import userAPI from '../../api/user'
import { Link } from 'react-router-dom'

const Users = () => {
    // get all registered users 
    const [users, setUsers] = useState([])
    useEffect(() => {
        userAPI.list().then((data) => {
            if (data && data.error) {
                console.log(data.error)
            } else {
                setUsers(data)
            }
        })

    }, [])
    return (
        <div className="users-list">
            <div className="users-heading"><h2>All Users</h2></div>
            {
                users.map((user) => {
                    return (
                        <Link to={`/user/${user._id}`} key={user._id}>
                            <UsersListItem user={user} ></UsersListItem>
                        </Link>
                    )
                })
            }
        </div>
    )
}

export default Users