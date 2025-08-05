import express from 'express'
import isAuth from '../middlewares/isAuth.js'
import {
    editProfile,
    follow,
    followingList,
    getAllNotifications,
    getCurrentUser,
    getProfile,
    markAsRead,
    search,
    suggestedUsers,
} from '../controllers/user.controllers.js'
import { upload } from '../middlewares/multer.js'

const userRoutes = express.Router()

userRoutes.get('/current', isAuth, getCurrentUser)
userRoutes.get('/suggested', isAuth, suggestedUsers)
userRoutes.get('/getProfile/:userName', isAuth, getProfile)
userRoutes.get('/follow/:targetUserId', isAuth, follow)
userRoutes.get('/followingList', isAuth, followingList)
userRoutes.get('/search', isAuth, search)
userRoutes.get('/getAllNotifications', isAuth, getAllNotifications)
userRoutes.post('/markAsRead', isAuth, markAsRead)
userRoutes.post('/editProfile', isAuth, upload.single('profileImage'), editProfile)

export default userRoutes
