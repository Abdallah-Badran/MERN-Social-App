const authAPI = {
    signin: async (user) => {
        try {
            let response = await fetch('https://mern--social-app.herokuapp.com/auth/signin/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user)
            })
            return await response.json()
        } catch (err) {
            console.log(err)
        }
    },

    signout: async () => {
        try {
            let response = await fetch('https://mern--social-app.herokuapp.com/auth/signout/')
            return await response.json()
        } catch (err) {
            console.log(err)
        }
    }
}

export default authAPI