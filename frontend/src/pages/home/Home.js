import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import FindPeople from '../../components/findPeople/FindPeople'
import NewsFeed from '../../components/newsFeed/NewsFeed'
import allUsersActions from '../../redux/actions/allUsers'
import postActions from '../../redux/actions/postActions'


const Home = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(allUsersActions.loadUsers());
        dispatch(postActions.loadPosts())
    }, [dispatch])

    return (
        <div className='home-wrapper'>
            <NewsFeed />
            <FindPeople />
        </div>
    )
}

export default Home