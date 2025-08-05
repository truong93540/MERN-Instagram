import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFollowing, setUserData } from '../redux/userSlice'
import { setCurrentUserStory } from '../redux/storySlice'

function GetCurrentUser() {
    const dispatch = useDispatch()
    const { storyData } = useSelector((state) => state.user)
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const result = await axios.get(
                    `${import.meta.env.VITE_SERVER_URL}/api/user/current`,
                    {
                        withCredentials: true,
                    },
                )
                dispatch(setUserData(result.data))
                dispatch(setFollowing(result.data.following))
                dispatch(setCurrentUserStory(result.data.story))
            } catch (error) {
                console.log(error)
            }
        }
        fetchUser()
    }, [dispatch, storyData])
}

export default GetCurrentUser
