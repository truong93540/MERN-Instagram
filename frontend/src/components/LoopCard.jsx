import { useEffect, useRef, useState } from 'react'
import { IoSend, IoVolumeHighOutline, IoVolumeMuteOutline } from 'react-icons/io5'
import { FaRegHeart } from 'react-icons/fa'
import { FaHeart } from 'react-icons/fa6'
import { MdOutlineComment } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import dp from '../assets/dp.webp'
import FollowButton from './FollowButton'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setLoopData } from '../redux/loopSlice'

const LoopCard = ({ loop }) => {
    const videoRef = useRef()
    const clickTimeoutRef = useRef(null)
    const commentRef = useRef()
    const [isPlaying, setIsPlaying] = useState(true)
    const [isMute, setIsMute] = useState(false)
    const [progress, setProgress] = useState(0)
    const [showHeart, setShowHeart] = useState(false)
    const [showComment, setShowComment] = useState(false)
    const [message, setMessage] = useState('')
    const navigate = useNavigate()
    const { userData } = useSelector((state) => state.user)
    const { loopData } = useSelector((state) => state.loop)
    const { socket } = useSelector((state) => state.socket)
    const dispatch = useDispatch()

    const handleClick = () => {
        if (showComment == true) {
            setShowComment(false)
            return
        }
        // Nếu đã có timeout nghĩa là đang chờ để xác nhận click, huỷ bỏ
        if (clickTimeoutRef.current) {
            clearTimeout(clickTimeoutRef.current)
            clickTimeoutRef.current = null
            return
        }

        // Đợi 250ms để chắc chắn không phải double click
        clickTimeoutRef.current = setTimeout(() => {
            if (isPlaying) {
                videoRef.current.pause()
                setIsPlaying(false)
            } else {
                videoRef.current.play()
                setIsPlaying(true)
            }
            clickTimeoutRef.current = null
        }, 250)
    }

    const handleTimeUpdate = () => {
        const video = videoRef.current
        if (video) {
            const percent = (video.currentTime / video.duration) * 100
            setProgress(percent)
        }
    }

    const handleLike = async () => {
        try {
            const result = await axios.get(
                `${import.meta.env.VITE_SERVER_URL}/api/loop/like/${loop._id}`,
                {
                    withCredentials: true,
                },
            )
            const updateLoop = result.data

            const updateLoops = loopData.map((p) => (p._id == loop._id ? updateLoop : p))
            dispatch(setLoopData(updateLoops))
        } catch (error) {
            console.log(error)
        }
    }

    const handleLikeOnDoubleClick = async () => {
        setShowHeart(true)
        setTimeout(() => setShowHeart(false), 1000)
        {
            !loop.likes?.includes(userData._id) ? handleLike() : null
        }
    }

    const handleComment = async () => {
        try {
            const result = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/api/loop/comment/${loop._id}`,
                { message },
                {
                    withCredentials: true,
                },
            )
            const updateLoop = result.data

            const updateLoops = loopData.map((p) => (p._id == loop._id ? updateLoop : p))
            dispatch(setLoopData(updateLoops))
            setMessage('')
        } catch (error) {
            console.log(error)
            setMessage('')
        }
    }

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                const video = videoRef.current
                if (entry.isIntersecting) {
                    video.play()
                    setIsPlaying(true)
                } else {
                    video?.pause()
                    setIsPlaying(false)
                }
            },
            { threshold: 0.6 },
        )

        if (videoRef.current) {
            observer.observe(videoRef.current)
        }

        return () => {
            if (videoRef.current) {
                observer.unobserve(videoRef.current)
            }
        }
    }, [])

    useEffect(() => {
        socket?.on('likedLoop', (updatedData) => {
            const updatedLoops = loopData.map((p) =>
                p._id == updatedData.loopId ? { ...p, likes: updatedData.likes } : p,
            )
            dispatch(setLoopData(updatedLoops))
        })
        socket?.on('commentedLoop', (updatedData) => {
            const updatedLoops = loopData.map((p) =>
                p._id == updatedData.loopId ? { ...p, comments: updatedData.comments } : p,
            )
            dispatch(setLoopData(updatedLoops))
        })

        return () => {
            socket?.off('likedPost')
            socket?.off('commentedLoop')
        }
    }, [socket, loopData, dispatch])

    return (
        <div className="w-full lg:w-[480px] h-[100vh] flex items-center justify-center border-l-2 border-r-2 border-gray-800 relative overflow-y-hidden">
            {showHeart && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 heart-animation z-50">
                    <FaHeart className="w-[100px] cursor-pointer h-[100px] text-white" />
                </div>
            )}

            <div
                className={`absolute z-[200] bottom-0 w-full h-[500px] p-[10px] rounded-t-4xl bg-[#0e1718] left-0 transition-all duration-300 ease-in-out shadow-2xl shadow-black ${
                    showComment ? 'translate-y-0' : 'translate-y-[100%]'
                }`}
                ref={commentRef}>
                <h1 className="text-white text-[20px] text-center font-semibold">Comments</h1>
                <div className="w-full h-[350px] overflow-y-auto flex flex-col gap-5 no-scrollbar">
                    {loop.comments.length == 0 && (
                        <div className="text-center text-white text-5 font-semibold mt-[50px] ">
                            No Comment Yet
                        </div>
                    )}
                    {loop.comments.map((com, index) => (
                        <div
                            className="w-full flex flex-col gap-[5px] border-b-[1px] border-gray-800 justify-center pb-[10px] text-white mt-[10px]"
                            key={index}>
                            <div className="flex justify-start items-center gap-[10px] md:gap-[20px]">
                                <div
                                    className="w-[40px] h-[40px] md:w-[40px] md:h-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden"
                                    onClick={() => navigate(`/profile/${com.author?.userName}`)}>
                                    <img
                                        src={com?.author?.profileImage || dp}
                                        alt=""
                                        className="w-full object-cover"
                                    />
                                </div>
                                <div className="w-[150px] font-semibold truncate">
                                    {com?.author?.userName}
                                </div>
                            </div>
                            <div className="pl-[60px]">{com.message}</div>
                        </div>
                    ))}
                </div>
                <div className="w-full fixed left-0 bottom-0 h-[80px] flex items-center justify-between px-[14px] py-[20px] text-white">
                    <div
                        className="w-[40px] h-[40px] md:w-[40px] md:h-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden"
                        onClick={() => navigate(`/profile/${loop.author?.userName}`)}>
                        <img
                            src={userData.profileImage || dp}
                            alt=""
                            className="w-full object-cover"
                        />
                    </div>
                    <div className="flex items-center flex-grow">
                        <input
                            type="text"
                            className="px-[10px] border-b-2 border-b-gray-500 w-full outline-none h-[40px] ml-2 text-white"
                            placeholder="Write comment..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        {message && (
                            <button
                                className="absolute right-[20px] cursor-pointer"
                                onClick={handleComment}>
                                <IoSend className="w-[25px] h-[25px]" />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <video
                src={loop?.media}
                ref={videoRef}
                autoPlay
                loop
                className=""
                onClick={handleClick}
                muted={isMute}
                onTimeUpdate={handleTimeUpdate}
                onDoubleClick={handleLikeOnDoubleClick}></video>
            <div
                className="absolute top-[20px] right-[20px] z-[100] cursor-pointer"
                onClick={() => {
                    setIsMute((prev) => !prev)
                    console.log('isMute', isMute)
                }}>
                {!isMute ? (
                    <IoVolumeHighOutline className="w-[20px] h-[20px] text-white font-semibold" />
                ) : (
                    <IoVolumeMuteOutline className="w-[20px] h-[20px] text-white font-semibold" />
                )}
            </div>
            <div className="absolute bottom-0 w-full h-[5px] bg-gray-900">
                <div
                    className={`h-full bg-white transition-all duration-200 ease-linear`}
                    style={{ width: `${progress}%` }}></div>
            </div>
            <div className="w-full absolute h-[100px] bottom-[10px] p-[10px] flex flex-col gap-[10px]">
                <div className="flex items-center gap-[10px] md:gap-[20px]">
                    <div
                        className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden"
                        onClick={() => navigate(`/profile/${loop.author?.userName}`)}>
                        <img
                            src={loop?.author?.profileImage || dp}
                            alt=""
                            className="w-full object-cover"
                        />
                    </div>
                    <div className="w-[150px] font-semibold truncate text-white">
                        {loop?.author?.userName}
                    </div>
                    {userData._id != loop.author._id && (
                        <FollowButton
                            targetUserId={loop.author?._id}
                            tailwind={
                                'px-[10px] py-[5px] text-white border-2 border-white text-[14px] rounded-2xl cursor-pointer'
                            }
                        />
                    )}
                </div>
                <div className="text-white">{loop.caption}</div>
                <div className="absolute right-0 flex flex-col gap-[20px] text-white bottom-[180px] justify-center px-[10px]">
                    <div className="flex flex-col items-center cursor-pointer">
                        <div onClick={handleLike}>
                            {!loop.likes.includes(userData._id) && (
                                <FaRegHeart className="w-[25px] cursor-pointer h-[25px]" />
                            )}
                            {loop.likes.includes(userData._id) && (
                                <FaHeart className="w-[25px] cursor-pointer h-[25px] text-red-600" />
                            )}
                        </div>
                        <div>{loop.likes.length}</div>
                    </div>
                    <div className="flex flex-col items-center cursor-pointer">
                        <div onClick={() => setShowComment(true)}>
                            <MdOutlineComment className="w-[25px] cursor-pointer h-[25px] " />
                        </div>
                        <div>{loop.comments.length}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoopCard
