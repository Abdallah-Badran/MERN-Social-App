import flowerImg from '../../images/flower.png'
import { useState, useEffect } from 'react'
import auth from '../../auth/auth'
import FindPeople from '../../components/findPeople/findPeople'
import Newsfeed from '../../components/newsFeed/newsFeed'

const Home = () => {
    // change state of default page accroding to token existence
    const [defaultPage, setDefaultPage] = useState(false)
    useEffect(() => {
        setDefaultPage(auth.getToken())
    }, [])

    return (
        <div className='home-wrapper'>
            {
                // view default page if user is signed-in, else view newsfeed
                !defaultPage ?
                    <div className='default-home'>
                        <h3>Welcome to the Social App</h3>
                        <div className='home-img'>
                            <img src={flowerImg} alt="flower" />
                        </div>
                    </div> :
                    <div className='feed-findPeople'>
                        <div><Newsfeed /></div>
                        <div><FindPeople /></div>
                    </div>
            }
        </div>
    )
}

export default Home