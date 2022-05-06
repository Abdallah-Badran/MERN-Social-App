import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema({
    text: {
        type: String,
        required: 'Text is required'
    },
    photo: {
        publicId: {
            type: String,
        },
        url: {
            type: String,
        },
    },
    likes: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
    comments: [{
        text: String,
        createdAt: { type: Date, default: Date.now },
        postedBy: { type: mongoose.Schema.ObjectId, ref: 'User' }
    }],
    postedBy: { type: mongoose.Schema.ObjectId, ref: 'User' }
}, { timestamps: true })


export default mongoose.model('Post', PostSchema)