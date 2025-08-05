import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFollowing } from '../redux/userSlice'
function GetFollowingList() {
    const dispatch = useDispatch()
    const { storyData } = useSelector((state) => state.user)
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const result = await axios.get(
                    `${import.meta.env.VITE_SERVER_URL}/api/user/followingList`,
                    {
                        withCredentials: true,
                    },
                )
                dispatch(setFollowing(result.data))
            } catch (error) {
                console.log(error)
            }
        }
        fetchUser()
    }, [dispatch, storyData])
}

export default GetFollowingList
