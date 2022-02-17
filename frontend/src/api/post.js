const postAPI = {

    create: async (userId, token, post) => {
        try {
            let response = await fetch('https://mern--social-app.herokuapp.com/api/posts/new/' + userId, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: post
            })
            return await response.json()
        } catch (err) {
            console.log(err)
        }
    },

    listByUser: async (userId, token) => {
        try {
            let response = await fetch('https://mern--social-app.herokuapp.com/api/posts/by/' + userId, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            return await response.json()
        } catch (err) {
            console.log(err)
        }
    },

    listNewsFeed: async (params, credentials) => {
        try {
            let response = await fetch('https://mern--social-app.herokuapp.com/api/posts/feed/' + params.userId, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + credentials.t
                }
            })
            return await response.json()
        } catch (err) {
            console.log(err)
        }
    },

    remove: async (postId, token) => {
        try {
            let response = await fetch('https://mern--social-app.herokuapp.com/api/posts/' + postId, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            return await response.json()
        } catch (err) {
            console.log(err)
        }
    },

    like: async (userId, token, postId) => {
        try {
            let response = await fetch('https://mern--social-app.herokuapp.com/api/posts/like/', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({ userId, postId })
            })
            return await response.json()
        } catch (err) {
            console.log(err)
        }
    },


    unlike: async (params, credentials, postId) => {
        try {
            let response = await fetch('https://mern--social-app.herokuapp.com/api/posts/unlike/', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + credentials.t
                },
                body: JSON.stringify({ userId: params.userId, postId: postId })
            })
            return await response.json()
        } catch (err) {
            console.log(err)
        }
    },

    comment: async (userId, token, postId, comment) => {
        try {
            let response = await fetch('https://mern--social-app.herokuapp.com/api/posts/comment/', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({ userId, postId, comment })
            })
            return await response.json()
        } catch (err) {
            console.log(err)
        }
    },


    uncomment: async (userId, token, postId, commentId) => {
        try {
            let response = await fetch('https://mern--social-app.herokuapp.com/api/posts/uncomment/', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({ userId, postId, commentId })
            })
            return await response.json()
        } catch (err) {
            console.log(err)
        }
    }

}

export default postAPI
