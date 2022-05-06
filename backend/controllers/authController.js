import User from '../models/User.js'
import jwt from 'jsonwebtoken'

const authController = {
    signin: async (req, res) => {
        try {
            const user = await User.findOne({ "email": req.body.email })
            if (!user)
                return res.json({ error: ["User not found"] }) //401

            if (!user.authenticate(req.body.password)) {
                return res.send({ error: ["Email and password don't match."] }) //401
            }
            // create token with the user id as the payload 
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)

            return res.json({
                message: {
                    msg: ["User logged in successfully"],
                    token,
                    user: {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        about: user.about,
                        profileURL: user.profilePicture.url
                    }
                }
            })

        } catch (err) {
            return res.json({ error: ["Could not sign in"] }) //401
        }
    },

    /* The signout function clears the response cookie containing the signed JWT. This is an optional endpoint and not
     really necessary for auth purposes if cookies are not used at all in the frontend.*/
    signout: (req, res) => {
        return res.status('200').json({
            message: "signed out"
        })
    },

    authenticate: (req, res, next) => {
        try {
            const token = req.headers.authorization
            jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
                if (err) {
                    return res.json({ "error": ["Authentication failed"] })  //400
                }
                else {
                    req.authUserId = payload._id  // payload : { _id: user._id }
                    next()
                }

            })
        } catch (error) {
            return res.json({ "error": ["Authentication failed"] })
        }
    },

    // make sure the requesting user is only updating or deleting his own user information.
    authorize: (req, res, next) => {
        const isAuthorized = req.user.id === req.authUserId
        if (!isAuthorized) {
            return res.json({  // 403
                error: ["User is not authorized"]
            })
        }
        next()
    }

}
export default authController