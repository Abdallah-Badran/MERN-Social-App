import User from '../models/User.js'
import lodash from 'lodash'
import getErrorMessage from '../dbErrorHandler.js'
import formidable from 'formidable'
import fs from 'fs'

const userCtrl = {
    create: async (req, res) => {
        const user = new User(req.body)
        try {
            await user.save()
            return res.status(200).json({
                message: "Successfully signed up!"
            })
        } catch (err) {
            return res.status(400).json({
                error: getErrorMessage(err)
            })
        }
    },

    list: async (req, res) => {
        try {
            let users = await User.find().select('name email updatedAt createdAt')
            res.json(users)
        } catch (err) {
            return res.status(400).json({
                error: getErrorMessage(err)
            })
        }
    },

    userByID: async (req, res, next, id) => {
        try {
            const user = await User.findById(id).populate('following', '_id name photo').populate('followers', '_id name photo.contentType')
            if (!user)
                return res.status('400').json({ error: "User not found" })
            req.profile = user
            next()
        } catch (err) {
            return res.status('400').json({ error: "Could not retrieve user" })
        }
    },

    read: (req, res) => {
        req.profile.hashedPassword = undefined
        return res.json(req.profile)
    },

    update: async (req, res) => {
        let form = new formidable.IncomingForm()
        form.keepExtensions = true // to use "files.photo.mimetype" soon
        form.parse(req, async (err, fields, files) => {
            if (err) {
                return res.status(400).json({
                    error: "Photo could not be uploaded"
                })
            }
            let user = req.profile
            // lodash updates user with the new fields 
            user = lodash.extend(user, fields)
            if (files.photo) {
                // read image from the created temp files 
                user.photo.data = fs.readFileSync(files.photo.filepath)
                user.photo.contentType = files.photo.mimetype
            }
            try {
                await user.save()
                const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
                return res.json({
                    token,
                    user: {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        photo: user.photo?.contentType
                    }
                })
            } catch (err) {
                return res.status(400).json({
                    error: getErrorMessage(err)
                })
            }
        })
    },
    remove: async (req, res) => {
        try {
            const user = req.profile
            const deletedUser = await user.remove()
            // remove hashedPassword before sending to frontend 
            deletedUser.hashedPassword = undefined
            res.json(deletedUser)
        } catch (err) {
            return res.status(400).json({
                error: getErrorMessage(err)
            })
        }
    },

    photo: (req, res) => {
        if (req.profile.photo.data) {
            res.set("Content-Type", req.profile.photo.contentType)
            return res.send(req.profile.photo.data)
        }
        else {
            return res.json({ msg: false })
        }
    },

    addFollowing: async (req, res, next) => {
        try {
            await User.findByIdAndUpdate(req.body.userId, { $push: { following: req.body.followId } })
            next()
        } catch (err) {
            return res.status(400).json({
                error: getErrorMessage(err)
            })
        }
    },

    addFollower: async (req, res) => {
        try {
            let result = await User.findByIdAndUpdate(req.body.followId, { $push: { followers: req.body.userId } }, { new: true })
                .populate('following', '_id name')
                .populate('followers', '_id name')

            result.hashedPassword = undefined
            return res.json(result)
        } catch (err) {
            return res.status(400).json({
                error: getErrorMessage(err)
            })
        }
    },

    removeFollowing: async (req, res, next) => {
        try {
            await User.findByIdAndUpdate(req.body.userId, { $pull: { following: req.body.unfollowId } })
            next()
        } catch (err) {
            return res.status(400).json({
                error: getErrorMessage(err)
            })
        }
    },
    removeFollower: async (req, res) => {
        try {
            let result = await User.findByIdAndUpdate(req.body.unfollowId, { $pull: { followers: req.body.userId } }, { new: true })
                .populate('following', '_id name')
                .populate('followers', '_id name')

            result.hashedPassword = undefined
            return res.json(result)
        } catch (err) {
            return res.status(400).json({
                error: getErrorMessage(err)
            })
        }
    },

    findPeople: async (req, res) => {
        let following = req.profile.following
        following.push(req.profile._id)
        try {
            let users = await User.find({ _id: { $nin: following } })
                .select('name photo')
            res.json(users)
        } catch (err) {
            return res.status(400).json({
                error: getErrorMessage(err)
            })
        }
    }
}


export default userCtrl