import Post from "../models/Post.js"
import getErrorMessage from '../dbErrorHandler.js'
import cloudinary from 'cloudinary'
import formidable from "formidable"

const postCtrl = {
    create: (req, res, next) => {
        const form = new formidable.IncomingForm()
        form.keepExtensions = true
        form.parse(req, async (err, fields, files) => {
            if (err) {
                return res.status(400).json({
                    error: ["Image could not be uploaded"]
                })
            }

            const post = new Post(fields)
            post.postedBy = req.user
            if (!files.photo) {
                try {
                    await post.save()
                    next()
                } catch (err) {
                    return res.json({
                        error: getErrorMessage(err)
                    })
                }
            } else {
                cloudinary.v2.uploader.upload(files.photo.filepath, { folder: "SocialAppPosts" }, async (err, cloudRes) => {
                    if (err) {
                        console.log(err.message)
                    }
                    post.photo = { publicId: cloudRes.public_id, url: cloudRes.secure_url }
                    await post.save()
                    next()
                })
            }
        })
    },
    list: async (req, res) => {
        try {
            const posts = await Post.find()
                .populate('comments.postedBy', '_id name profilePicture.url')
                .populate('likes', '_id name profilePicture.url')
                .populate('postedBy', '_id name profilePicture.url')
                .sort('-createdAt')
            res.json({
                message: posts
            })
        } catch (err) {
            return res.json({ //400
                error: getErrorMessage(err)
            })
        }
    },
    isPoster: (req, res, next) => {
        const isPoster = req.post.postedBy._id == req.authUserId
        if (!isPoster) {
            return res.json({ //403
                error: ["User is not authorized"]
            })
        }
        next()
    },
    postByID: async (req, res, next, id) => {
        try {
            let post = await Post.findById(id)
            if (!post)
                return res.json({  //400
                    error: ["Post not found"]
                })
            req.post = post
            next()
        } catch (err) {
            return res.json({
                error: ["Could not retrieve use post"]
            })
        }
    },
    remove: async (req, res, next) => {
        const post = req.post
        try {
            await post.remove()
            next()
        } catch (err) {
            return res.json({  // 400
                error: getErrorMessage(err)
            })
        }
    },
    comment: async (req, res, next) => {
        const comment = req.body.comment
        comment.postedBy = req.body.userId
        try {
            await Post.findByIdAndUpdate(req.body.postId, { $push: { comments: comment } })
            next()
        } catch (err) {
            return res.json({ //400
                error: getErrorMessage(err)
            })
        }
    },
    uncomment: async (req, res, next) => {
        const comment = req.body.comment
        try {
            await Post.findByIdAndUpdate(req.body.postId, { $pull: { comments: { _id: comment._id } } })
            next()
        } catch (err) {
            return res.json({ //400
                error: getErrorMessage(err)
            })
        }
    },
    like: async (req, res, next) => {
        try {
            await Post.findByIdAndUpdate(req.body.postId, { $push: { likes: req.body.userId } })
            next()
        } catch (err) {
            return res.status(400).json({
                error: getErrorMessage(err)
            })
        }
    },
    unlike: async (req, res, next) => {
        try {
            await Post.findByIdAndUpdate(req.body.postId, { $pull: { likes: req.body.userId } })
            next()
        } catch (err) {
            return res.status(400).json({
                error: getErrorMessage(err)
            })
        }
    }
}

export default postCtrl