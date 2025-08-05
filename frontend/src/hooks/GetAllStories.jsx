import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setStoryList } from '../redux/storySlice'

function GetAllStories() {
    const dispatch = useDispatch()
    const { storyData } = useSelector((state) => state.user)
    useEffect(() => {
        const fetchStories = async () => {
            try {
                const result = await axios.get(
                    `${import.meta.env.VITE_SERVER_URL}/api/story/getAll`,
                    {
                        withCredentials: true,
                    },
                )
                dispatch(setStoryList(result.data))
            } catch (error) {
                console.log(error)
            }
        }
        fetchStories()
    }, [dispatch, storyData])
}

export default GetAllStories
