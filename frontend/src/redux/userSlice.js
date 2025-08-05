import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userData: null,
        suggestedUsers: null,
        profileData: null,
        following: [],
        searchData: null,
        notificationData: [],
    },
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload
        },
        setSuggestedUsers: (state, action) => {
            state.suggestedUsers = action.payload
        },
        setProfileData: (state, action) => {
            state.profileData = action.payload
        },
        setFollowing: (state, action) => {
            state.following = action.payload
        },
        setSearchData: (state, action) => {
            state.searchData = action.payload
        },
        setNotificationData: (state, action) => {
            state.notificationData = action.payload
        },
        toggleFollow: (state, action) => {
            const targetUser = action.payload
            if (state.following.some((userFollowing) => userFollowing._id == targetUser._id)) {
                state.following = state.following.filter(
                    (userFollowing) => userFollowing._id != targetUser._id,
                )
            } else {
                state.following.push(targetUser)
            }
        },
    },
})

export const {
    setUserData,
    setSuggestedUsers,
    setProfileData,
    setFollowing,
    toggleFollow,
    setSearchData,
    setNotificationData,
} = userSlice.actions

export default userSlice.reducer
