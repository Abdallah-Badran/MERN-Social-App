const auth = {
    getToken: () => {
        if (sessionStorage.getItem('jwt'))
            return JSON.parse(sessionStorage.getItem('jwt'))
        else
            return false
    },
    setToken(jwt) {
        sessionStorage.setItem('jwt', JSON.stringify(jwt))
        return true
    },
    clearToken: () => {
        sessionStorage.removeItem('jwt')
    }
}

export default auth