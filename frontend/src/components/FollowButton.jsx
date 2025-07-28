import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { serverURL } from '../App'
import { toggleFollow } from '../redux/userSlice'
import axios from 'axios'

const FollowButton = ({ targetUserId, tailwind, onFollowChange }) => {
    const { following } = useSelector((state) => state.user)
    const isFollowing = following.includes(targetUserId)
    const dispatch = useDispatch()

    const handleFollow = async () => {
        try {
            await axios.get(`${serverURL}/api/user/follow/${targetUserId}`, {
                withCredentials: true,
            })
            if (onFollowChange) {
                onFollowChange()
            }
            dispatch(toggleFollow(targetUserId))
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
