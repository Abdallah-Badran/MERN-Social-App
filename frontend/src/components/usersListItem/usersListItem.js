import UserIcon from '../icons/userIcon'

import RightArrow from '../icons/rightArrow'

const UsersListItem = ({ user }) => {
    return (
        <div className="user-item">
            <div className='left'>
                <UserIcon></UserIcon>
                <p>{user.name}</p>
            </div>
            <div className='right'>
                <RightArrow></RightArrow>
            </div>
        </div>
    )
}

export default UsersListItem