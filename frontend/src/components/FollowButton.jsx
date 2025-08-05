import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleFollow } from '../redux/userSlice'
import axios from 'axios'

const FollowButton = ({ targetUser, tailwind, onFollowChange }) => {
    const { following } = useSelector((state) => state.user)
    const isFollowing = following.some((userFollowing) => userFollowing._id == targetUser._id)
    const dispatch = useDispatch()

    const handleFollow = async () => {
        try {
            await axios.get(
                `${import.meta.env.VITE_SERVER_URL}/api/user/follow/${targetUser._id}`,
                {
                    withCredentials: true,
                },
            )
            if (onFollowChange) {
                onFollowChange()
            }
            dispatch(toggleFollow(targetUser))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <button className={tailwind} onClick={handleFollow}>
            {isFollowing ? 'Following' : 'Follow'}
        </button>
    )
}

export default FollowButton
