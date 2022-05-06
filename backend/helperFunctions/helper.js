import User from "../models/User.js"
import getErrMsg from '../dbErrorHandler.js'

const helper = {
    getUser: async (req, res, next, id) => {
        try {
            const user = await User.findById(id)
            if (!user)
                return res.json({ error: ["User not found"] })  // 400
            req.user = user
            next()
        } catch (err) {
            return res.json({ error: ["Could not retrieve user"] })  // 400
        }
    },
    saveUser: async (req, res, user) => {
        try {
            user = await user.save()
            res.json({
                msg: ["User updated successfully"],
                message: {
                    _id: req.user._id,
                    name: req.user.name,
                    email: req.user.email,
                    about: req.user.about,
                    profileURL: req.user.profilePicture.url,
                }
            }) //200

        } catch (err) {
            console.log(err.message)
            return res.json({ //400
                error: getErrMsg(err)
            })
        }
    }
}

export default helper