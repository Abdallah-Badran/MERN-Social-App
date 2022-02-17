import User from '../models/User.js'
import jwt from 'jsonwebtoken'

const authController = {
    signin: async (req, res) => {
        try {
            const user = await User.findOne({ "email": req.body.email })
            if (!user)
                return res.status('401').json({ error: "User not found" })

            if (!user.authenticate(req.body.password)) {
                return res.status('401').send({ error: "Email and password don't match." })
            }

            // create token with the user id as the payload 
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)

            return res.json({
                token,
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    photo: user.photo
                }
            })

        } catch (err) {
            return res.status('401').json({ error: "Could not sign in" })
        }
    },

    /* The signout function clears the response cookie containing the signed JWT. This is an optional endpoint and not
     really necessary for auth purposes if cookies are not used at all in the frontend.*/
    signout: (req, res) => {
        return res.status('200').json({
            message: "signed out"
        })
    },

    requireSignin: (req, res, next) => {
        // remove the "Bearer"
        const token = req.headers.authorization.split(" ")[1]
        if (!token) {
            return res.status(401).json({ "error": "No authorization token was found" })
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
            if (err) {
                return res.status(400).json({ "error": "Authorization failed" })
            }
            req.auth = payload
        })
        next()
    },

    // make sure the requesting user is only updating or deleting his own user information.
    hasAuthorization: (req, res, next) => {
        const isAuthorized = req.profile && req.auth && req.profile.id === req.auth._id
        if (!isAuthorized) {
            return res.status('403').json({
                error: "User is not authorized"
            })
        }
        next()
    }

}
export default authController