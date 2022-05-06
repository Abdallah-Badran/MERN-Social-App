import app from "./app.js"
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cloudinary from 'cloudinary'

dotenv.config()
mongoose.connect(process.env.DB_URI).then(() => {
    // connect to cloudinary
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET
    })
    // run server
    app.listen(process.env.PORT, () => {
        console.log("DB and Server are running")
    })
}).catch((err) => { console.log(err.message) })