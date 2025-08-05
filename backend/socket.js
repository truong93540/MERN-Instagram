import http from 'http'
import express from 'express'
import { Server } from 'socket.io'
import dotenv from 'dotenv'

dotenv.config()
const app = express()
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        methods: ['GET', 'POST'],
    },
})

const userSocketMap = {}

export const getSocketId = (receiverId) => {
    return userSocketMap[receiverId]
}

io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId
    if (userId != undefined) {
        userSocketMap[userId] = socket.id
    }

    io.emit('getOnlineUsers', Object.keys(userSocketMap))

    socket.on('disconnect', () => {
        delete userSocketMap[userId]
    })
})

export { app, io, server }
