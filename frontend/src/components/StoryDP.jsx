import { useNavigate } from 'react-router-dom'
import dp from '../assets/dp.webp'
import { FiPlusCircle } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { serverURL } from '../App'
import { useEffect, useState } from 'react'
import { setStoryList } from '../redux/storySlice'

const StoryDP = ({ userName, ProfileImage, story }) => {
    const navigate = useNavigate()
    const { userData } = useSelector((state) => state.user)
    const { storyList } = useSelector((state) => state.story)
    const [viewed, setViewed] = useState(false)
    const dispatch = useDispatch()

    const handleViewer = async () => {
        try {
            const result = await axios.get(`${serverURL}/api/story/view/${story._id}`, {
                withCredentials: true,
            })
            const updateStoryList = storyList.map((story) => {
                if (story._id == result.data._id) {
                    return result.data
                } else {
                    return story
                }
            })
            dispatch(setStoryList(updateStoryList))
        } catch (error) {
            console.log(error)
        }
    }

    const handleClick = () => {
        if (!story && userName == 'Your Story') {
            navigate('/upload')
        } else if (story && userName == 'Your Story') {
            handleViewer()
            navigate(`/story/${userData.userName}`)
        } else {
            handleViewer()
            navigate(`/story/${userName}`)
        }
    }

    useEffect(() => {
        if (story?.viewers?.some((viewer) => viewer?._id == userData?._id)) {
            setViewed(true)
        } else {
            setViewed(false)
        }
    }, [story, userData, setStoryList])

    return (
        <div className="flex flex-col w-[80px]">
            <div
                className={`w-[80px] h-[80px] ${
                    !story
                        ? null
                        : viewed
                        ? 'bg-gray-400'
                        : 'bg-gradient-to-l from-blue-500 to-blue-950'
                }  rounded-full justify-center items-center flex relative`}
                onClick={handleClick}>
                <div className="w-[70px] h-[70px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
                    <img src={ProfileImage || dp} alt="" className="w-full object-cover" />
                    {userData.story.length == 0 && userName == 'Your Story' && (
                        <div>
                            <FiPlusCircle className="text-white bg-black absolute bottom-[8px]  right-[10px] rounded-full w-[22px] h-[22px]" />
                        </div>
                    )}
                </div>
            </div>
            <div className="text-[14px] text-center truncate w-full text-white">{userName}</div>
        </div>
    )
}

export default StoryDP
