import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import authRouter from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'
import postRouter from './routes/post.routes.js'
import loopRouter from './routes/loop.routes.js'
import storyRouter from './routes/story.routes.js'
import messageRouter from './routes/message.routes.js'
import { app, server } from './socket.js'

dotenv.config()

const port = process.env.PORT || 5000

app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true,
    }),
)
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRouter)
app.use('/api/user', userRoutes)
app.use('/api/post', postRouter)
app.use('/api/loop', loopRouter)
app.use('/api/story', storyRouter)
app.use('/api/message', messageRouter)

server.listen(port, () => {
    connectDB()
    console.log(`Server is running on port ${port}`)
})
