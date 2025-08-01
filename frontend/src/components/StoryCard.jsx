import { useNavigate } from 'react-router-dom'
import dp from '../assets/dp.webp'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { useEffect, useState } from 'react'
import VideoPlayer from './VideoPlayer'
import { useSelector } from 'react-redux'
import { FaEye } from 'react-icons/fa'

const StoryCard = ({ storyData }) => {
    const navigate = useNavigate()
    const [progress, setProgress] = useState(0)
    const { userData } = useSelector((state) => state.user)
    const [showViewers, setShowViewers] = useState(false)

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval)
                    navigate('/')
                    return 100
                }
                return prev + 1
            })
        }, 1500)
        return () => clearInterval(interval)
    }, [navigate])

    return (
        <div className="w-full max-w-[500px] h-[100vh] border-x-2 border-gray-800 pt-[10px] relative flex flex-col justify-center">
            <div className="flex items-center gap-[10px] absolute top-[30px] px-[10px] z-10">
                <IoMdArrowRoundBack
                    className="text-white w-[25px] h-[25px] cursor-pointer"
                    onClick={() => navigate(`/`)}
                />
                <div
                    className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden"
                    onClick={() => navigate(`/profile/${storyData.author?.userName}`)}>
                    <img
                        src={storyData?.author?.profileImage || dp}
                        alt=""
                        className="w-full object-cover"
                    />
                </div>
                <div className="w-[150px] font-semibold truncate text-white">
                    {storyData?.author?.userName}
                </div>
            </div>
            {!showViewers && (
                <>
                    <div className="w-full h-[90vh] flex items-center justify-center mx-auto">
                        {storyData?.mediaType == 'image' && (
                            <div className="w-full flex items-center justify-center">
                                <img
                                    src={storyData.media}
                                    alt=""
                                    className="w-[80%] rounded-2xl object-cover"
                                />
                            </div>
                        )}
                        {storyData?.mediaType == 'video' && (
                            <div className="w-[80%] flex flex-col items-center justify-center">
                                <VideoPlayer media={storyData.media} />
                            </div>
                        )}
                    </div>
                    <div className="absolute top-[10px] w-full h-[5px] bg-gray-900">
                        <div
                            className={`h-full bg-white transition-all duration-200 ease-linear`}
                            style={{ width: `${progress}%` }}></div>
                    </div>
                    <div className="absolute top-[10px] w-full h-[5px] bg-gray-900">
                        <div
                            className={`h-full bg-white transition-all duration-200 ease-linear`}
                            style={{ width: `${progress}%` }}></div>
                    </div>
                    {storyData?.author.userName == userData.userName && (
                        <div
                            className="w-[50%] h-[70px] absolute bottom-0 text-white flex items-center p-2 left-0 cursor-pointer"
                            onClick={() => setShowViewers(true)}>
                            <div className="text-white flex items-center gap-[5px]">
                                <FaEye />
                                {storyData?.viewers.length}
                                <div className="flex relative">
                                    {storyData?.viewers?.slice(0, 3).map((viewer, index) => (
                                        <div
                                            className={`w-[30px] h-[30px] border-2 border-black rounded-full cursor-pointer overflow-hidden ${
                                                index > 0 ? `absolute` : ''
                                            } `}
                                            key={index}
                                            style={index > 0 ? { left: `${index * 6}px` } : {}}>
                                            <img
                                                src={viewer.profileImage || dp}
                                                alt=""
                                                className="w-full object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
            {showViewers && (
                <>
                    <div
                        className="w-full h-[30%] flex items-center justify-center mx-auto mt-[100px] overflow-hidden py-[30px] cursor-pointer"
                        onClick={() => setShowViewers(false)}>
                        {storyData?.mediaType == 'image' && (
                            <div className="w-full flex items-center justify-center">
                                <img
                                    src={storyData.media}
                                    alt=""
                                    className="h-full rounded-2xl object-cover"
                                />
                            </div>
                        )}
                        {storyData?.mediaType == 'video' && (
                            <div className="h-full flex flex-col items-center justify-center">
                                <VideoPlayer media={storyData.media} />
                            </div>
                        )}
                    </div>

                    <div className="w-full h-[70%] border-t-2 border-t-gray-800 p-[20px]">
                        <div className="text-white flex items-center gap-[10px]">
                            <FaEye />
                            <span>{storyData?.viewers.length}</span>
                            <span>Viewers</span>
                        </div>
                        <div className="w-full max-h-full flex flex-col gap-[10px] overflow-auto pt-[10px]">
                            {storyData?.viewers.map((viewer, index) => (
                                <div className="w-full flex items-center gap-[20px]" key={index}>
                                    <div
                                        className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden"
                                        onClick={() => navigate(`/profile/${viewer?.userName}`)}>
                                        <img
                                            src={viewer?.profileImage || dp}
                                            alt=""
                                            className="w-full object-cover"
                                        />
                                    </div>
                                    <div className="w-[120px] font-semibold truncate text-white">
                                        {viewer?.userName}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default StoryCard
