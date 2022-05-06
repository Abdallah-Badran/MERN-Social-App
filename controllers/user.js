import User from "../models/User.js"
import getErrorMessage from '../dbErrorHandler.js'
import lodash from 'lodash'
import helper from "../helperFunctions/helper.js"
import formidable from 'formidable'
import cloudinary from 'cloudinary'


const userCtrl = {
    create: async (req, res) => {
        const user = new User(req.body)
        try {
            await user.save()
            return res.json({  //status : 200
                message: ["Successfully signed up"]
            })
        } catch (err) {
            return res.json({  //status : 400
                error: getErrorMessage(err)
            })
        }
    },
    userByID: (req, res, next) => {
        helper.getUser(req, res, next, req.authUserId)
    },
    read: (req, res) => {
        return res.json({
            message: {
                _id: req.user._id,
                name: req.user.name,
                email: req.user.email,
                about: req.user.about,
                profileURL: req.user.profilePicture.url,
            }
        })
    },
    getId: (req, res, next, userId) => {
        helper.getUser(req, res, next, userId)
    },

    update: async (req, res) => {
        const form = new formidable.IncomingForm()
        form.keepExtensions = true
        form.parse(req, async (err, fields, files) => {
            if (err) {
                res.json({ // 400
                    error: ["Image could not be uploaded"]
                })
            }
            let user = req.user
            user = lodash.extend(user, fields)
            if (!files.profilePicture) {
                helper.saveUser(req, res, user)
            } else {
                cloudinary.v2.uploader.upload(files.profilePicture.filepath, { folder: "SocialApp" }, async (err, cloudRes) => {
                    if (err) {
                        console.log(err.message)
                    }
                    user.profilePicture.publicId && cloudinary.v2.uploader.destroy(user.profilePicture.publicId, (err, upRes) => {
                        if (err) {
                            console.log(err.message)
                        }
                    })
                    user.profilePicture = { publicId: cloudRes.public_id, url: cloudRes.secure_url }
                    helper.saveUser(req, res, user)
                })
            }
        })
    },
    list: async (req, res) => {
        try {
            let users = await User.find()
                .populate('following', '_id name createdAt profilePicture.url')
                .populate('followers', '_id name createdAt profilePicture.url')
                .select('_id name createdAt profilePicture.url')
            res.json({
                message: users
            })
        } catch (err) {
            return res.json({ //400
                error: getErrorMessage(err)
            })
        }
    },
    addFollowing: async (req, res, next) => {
        try {
            await User.findByIdAndUpdate(req.authUserId, { $push: { following: req.body.followId } })
            next()
        } catch (err) {
            return res.json({ // 400
                error: getErrorMessage(err)
            })
        }
    },

    addFollower: async (req, res, next) => {
        try {
            await User.findByIdAndUpdate(req.body.followId, { $push: { followers: req.authUserId } })
            next()
        } catch (err) {
            return res.json({  // 400
                error: getErrorMessage(err)
            })
        }
    },
    removeFollowing: async (req, res, next) => {
        try {
            await User.findByIdAndUpdate(req.authUserId, { $pull: { following: req.body.unfollowId } })
            next()
        } catch (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
    },
    removeFollower: async (req, res, next) => {
        try {
            await User.findByIdAndUpdate(req.body.unfollowId, { $pull: { followers: req.authUserId } })
            next()
        } catch (err) {
            return res.status(400).json({
                error: errorHandler.getErrorMessage(err)
            })
        }
    }
}

export default userCtrl