import Post from '../models/Post.js'
import getErrorMessage from '../dbErrorHandler.js'
import formidable from 'formidable'
import fs from 'fs'

const postController = {

    create: (req, res, next) => {
        let form = new formidable.IncomingForm()
        form.keepExtensions = true
        form.parse(req, async (err, fields, files) => {
            if (err) {
                return res.status(400).json({
                    error: "Image could not be uploaded"
                })
            }
            let post = new Post(fields)
            post.postedBy = req.profile
            if (files.photo) {
                post.photo.data = fs.readFileSync(files.photo.filepath)
                post.photo.contentType = files.photo.mimetype
            }
            try {
                let result = await post.save()
                res.json(result)
            } catch (err) {
                return res.status(400).json({
                    error: getErrorMessage(err)
                })
            }
        })
    },

    postByID: async (req, res, next, id) => {
        try {
            // find post and attach it to the req object for next middleware
            const post = await Post.findById(id).populate('postedBy', '_id name')
            if (!post)
                return res.status('400').json({
                    error: "Post not found"
                })
            req.post = post
            next()
        } catch (err) {
            return res.status('400').json({
                error: "Could not retrieve user post"
            })
        }
    },

    listByUser: async (req, res) => {
        try {
            let posts = await Post.find({ postedBy: req.profile._id })
                .populate('comments.postedBy', '_id name photo')
                .populate('postedBy', '_id name photo')
                .sort('-created')

            res.json(posts)
        } catch (err) {
            return res.status(400).json({
                error: getErrorMessage(err)
            })
        }
    },

    listNewsFeed: async (req, res) => {
        req.profile.following.push(req.profile._id)
        try {
            let posts = await Post.find({ postedBy: { $in: req.profile.following } })
                .populate('comments.postedBy', '_id name photo')
                .populate('postedBy', '_id name photo')
                .sort('-created')
            res.json(posts)
        } catch (err) {
            return res.status(400).json({
                error: getErrorMessage(err)
            })
        }
    },

    remove: async (req, res) => {
        const post = req.post
        try {
            const deletedPost = await post.remove()
            res.json(deletedPost)
        } catch (err) {
            return res.status(400).json({
                error: getErrorMessage(err)
            })
        }
    },

    photo: (req, res, next) => {
        res.set("Content-Type", req.post.photo.contentType)
        return res.send(req.post.photo.data)
    },

    like: async (req, res) => {
        try {
            let result = await Post.findByIdAndUpdate(req.body.postId, { $push: { likes: req.body.userId } }, { new: true })
            res.json(result)
        } catch (err) {
            return res.status(400).json({
                error: getErrorMessage(err)
            })
        }
    },

    unlike: async (req, res) => {
        try {
            let result = await Post.findByIdAndUpdate(req.body.postId, { $pull: { likes: req.body.userId } }, { new: true })
            res.json(result)
        } catch (err) {
            return res.status(400).json({
                error: getErrorMessage(err)
            })
        }
    },

    comment: async (req, res) => {
        let comment = req.body.comment
        comment.postedBy = req.body.userId
        try {
            let result = await Post.findByIdAndUpdate(req.body.postId, { $push: { comments: comment } }, { new: true })
                .populate('comments.postedBy', '_id name photo')
                .populate('postedBy', '_id name photo')
            res.json(result)
        } catch (err) {
            return res.status(400).json({
                error: getErrorMessage(err)
            })
        }
    },
    uncomment: async (req, res) => {
        const commentId = req.body.commentId
        try {
            let result = await Post.findByIdAndUpdate(req.body.postId, { $pull: { comments: { _id: commentId } } }, { new: true })
                .populate('comments.postedBy', '_id name photo')
                .populate('postedBy', '_id name photo')
            res.json(result)
        } catch (err) {
            return res.status(400).json({
                error: getErrorMessage(err)
            })
        }
    },

    isPoster: (req, res, next) => {
        let isPoster = req.post && req.auth && req.post.postedBy._id == req.auth._id
        if (!isPoster) {
            return res.status('403').json({
                error: "User is not authorized"
            })
        }
        next()
    }

}
export default postController