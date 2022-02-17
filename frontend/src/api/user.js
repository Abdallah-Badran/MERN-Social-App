const userAPI = {

    create: async (user) => {
        try {
            const response = await fetch('https://mern--social-app.herokuapp.com/api/users/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            })
            return await response.json()
        } catch (err) {
            console.log(err)
        }
    },
    list: async () => {
        try {
            const response = await fetch('https://mern--social-app.herokuapp.com/api/users/')
            return await response.json()
        } catch (err) {
            console.log(err)
        }
    },

    read: async (userId, token) => {
        try {
            const response = await fetch('https://mern--social-app.herokuapp.com/api/users/' + userId, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            const data = await response.json()
            return data
        } catch (err) {
            console.log(err)
        }
    },
    update: async (userId, token, user) => {
        try {
            let response = await fetch('https://mern--social-app.herokuapp.com/api/users/' + userId, {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                body: user
            })
            return await response.json()
        } catch (err) {
            console.log(err)
        }
    },
    remove: async (userId, token) => {
        try {
            let response = await fetch('https://mern--social-app.herokuapp.com/api/users/' + userId, {
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

    follow: async (userId, token, followId) => {
        try {
            let response = await fetch('https://mern--social-app.herokuapp.com/api/users/follow/', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({ userId, followId })
            })
            return await response.json()
        } catch (err) {
            console.log(err)
        }
    },

    unfollow: async (userId, token, unfollowId) => {
        try {
            let response = await fetch('https://mern--social-app.herokuapp.com/api/users/unfollow/', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({ userId, unfollowId })
            })
            return await response.json()
        } catch (err) {
            console.log(err)
        }
    },

    findPeople: async (params, credentials) => {
        try {
            let response = await fetch('https://mern--social-app.herokuapp.com/api/users/findpeople/' + params.userId, {
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
    }

}
export default userAPI