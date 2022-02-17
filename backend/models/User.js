import mongoose from 'mongoose'
import crypto from 'crypto-js'

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],  // ****@****.****
        required: [true, 'Email is required']
    },
    about: {
        type: String,
        trim: true
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    following: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
    followers: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
    hashedPassword: {
        type: String,
        required: [true, "Password is required"]
    }
}, { timestamps: true })

// get plain password from backend controller 
UserSchema.virtual('password').set(function (plainPassword) {
    this.plainPassword = plainPassword
    this.hashedPassword = this.encryptPassword(plainPassword)
})

// insure that password is < 6 before saving a document
UserSchema.path('hashedPassword').validate(function (v) {
    if (this.plainPassword && this.plainPassword.length < 6) {
        this.invalidate('password', 'Password must be 6 characters at least')
    }
}, null)

UserSchema.methods = {
    // if password is empty return it as it is, else encrypt it
    encryptPassword: function (plainPassword) {
        if (!plainPassword) {
            return ''
        }
        return crypto.AES.encrypt(plainPassword, process.env.PASSWORD_SECRET)
    },
    authenticate: function (plainPassword) {
        const bytes = crypto.AES.decrypt(this.hashedPassword, process.env.PASSWORD_SECRET)
        const decryptedPassword = bytes.toString(crypto.enc.Utf8)
        return decryptedPassword === plainPassword
    }
}

export default mongoose.model('User', UserSchema)