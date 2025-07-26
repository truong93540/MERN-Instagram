import uploadOnCloudinary from '../config/clouldinary.js'
import User from '../models/user.model.js'

export const getCurrentUser = async (req, res) => {
    try {
        const userId = req.userId
        const user = await User.findById(userId).select('-password')
        if (!user) {
            return res.status(400).json({ message: 'user not found' })
        }
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({ message: `get current user error ${error}` })
    }
}

export const suggestedUsers = async (req, res) => {
    try {
        const users = await User.find({
            _id: { $ne: req.userId },
        }).select('-password')
        return res.status(200).json(users)
    } catch (error) {
        return res.status(500).json({ message: `get suggested user error ${error}` })
    }
}

export const editProfile = async (req, res) => {
    try {
        const { name, userName, bio, profession, gender } = req.body

        const user = await User.findById(req.userId).select('-password')
        if (!user) {
            return res.status(400).json({ message: 'user not found' })
        }

        const sameUserWithUserName = await User.findOne({ userName }).select('-password')
        if (sameUserWithUserName && sameUserWithUserName._id.toString() != req.userId) {
            return res.status(400).json({ message: 'userName already exits' })
        }

        let profileImage
        if (req.file) {
            profileImage = await uploadOnCloudinary(req.file.path)
        }

        user.name = name
        user.userName = userName
        user.bio = bio
        if (profileImage) {
            user.profileImage = profileImage
        }
        user.profession = profession
        user.gender = gender

        await user.save()

        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({ message: `edit profile error ${error}` })
    }
}

export const getProfile = async (req, res) => {
    try {
        const userName = req.params.userName
        const user = await User.findOne({ userName }).select('-password')
        if (!user) {
            return res.status(400).json({ message: 'user not found' })
        }
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({ message: `get profile error ${error}` })
    }
}
