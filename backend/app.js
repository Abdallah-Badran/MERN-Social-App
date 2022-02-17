import express from 'express'
import cors from 'cors'
import userRouter from './routes/userRoutes.js'
import authRouter from './routes/authRoutes.js'
import postRoutes from './routes/postRoutes.js'

// create an instance of express
const app = express()
// a middleware to accept requests from frontend (cross origin sharing)
app.use(cors())
// a middleware to parse incoming JSON 
app.use(express.json())

// routes 
app.use('/api/users', userRouter)
app.use('/auth', authRouter)
app.use('/api/posts', postRoutes)

export default app 