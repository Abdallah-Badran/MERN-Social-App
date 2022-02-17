import { useState } from 'react'
import auth from '../../auth/auth.js'
import userAPI from '../../api/user.js'
import { useNavigate } from 'react-router-dom'
import Delete from '../icons/delete.js'


const DeleteUser = (props) => {
    // open state to view or close delete pop up 
    const [open, setOpen] = useState(false)
    const handleClose = () => {
        setOpen(false)
    }
    const clickButton = () => {
        setOpen(true)
    }

    /* if user is authenticated in the backend, remove user,
     clear token and redirect to home*/
    const redirectTo = useNavigate()
    const jwt = auth.getToken()
    const deleteAccount = () => {
        userAPI.remove(props.userId, jwt.token).then((data) => {
            if (data && data.error) {
                console.log(data.error)
            } else {
                auth.clearToken()
                redirectTo('/')
            }
        })
    }

    return (
        <div className="delete">
            <button className='icon' onClick={clickButton}><Delete /></button>
            {open &&
                <div className="popup-background">
                    <div className="popup">
                        <h2>Delete Account</h2>
                        <p>Confirm to delete your accoount</p>
                        <div className='delete-options'>
                            <button className='cancel-btn' onClick={handleClose}>Cancel</button>
                            <button className='confirm-btn' onClick={deleteAccount}>Confirm</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default DeleteUser