import { useEffect, useState } from 'react'
import Post from '../../components/post/post'

const PostList = ({ posts }) => {

    return (
        <div style={{ marginTop: '24px' }}>
            {
                posts?.map((item, i) => {
                    return <Post post={item} key={i} />
                })
            }
        </div>
    )
}

export default PostList