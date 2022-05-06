import { Link } from 'react-router-dom'

const FollowGrid = ({ people }) => {
    return (
        <div className="follow-container">
            {
                people.map((person) => {
                    return (
                        < div className="person-wrapper" key={person._id} >
                            <Link to={"/user/" + person._id}>
                                <div className='img-wrapper align-ver'>
                                    <img src={person?.profilePicture?.url} alt="" />
                                    <h5> {person.name}</h5>
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
