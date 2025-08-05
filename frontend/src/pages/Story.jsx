import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setStoryData } from '../redux/storySlice'
import { useEffect } from 'react'
import axios from 'axios'
import StoryCard from '../components/StoryCard'

const Story = () => {
    const { userName } = useParams()
    const dispatch = useDispatch()
    const { storyData } = useSelector((state) => state.story)

    const handleStory = async () => {
        dispatch(setStoryData(null))
        try {
            const result = await axios.get(
                `${import.meta.env.VITE_SERVER_URL}/api/story/getByUserName/${userName}`,
                {
                    withCredentials: true,
                },
            )
            dispatch(setStoryData(result.data[0]))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (userName) {
            handleStory()
        }
    }, [userName])

    return (
        <div className="w-full h-[100vh] bg-black flex justify-center items-center">
            <StoryCard storyData={storyData} />
        </div>
    )
}

export default Story
