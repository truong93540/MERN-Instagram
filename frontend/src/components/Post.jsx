import { useNavigate } from 'react-router-dom'
import dp from '../assets/dp.webp'
import VideoPlayer from './VideoPlayer'
import { FaRegHeart } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { FaBookmark, FaHeart, FaRegBookmark } from 'react-icons/fa6'
import { MdOutlineComment } from 'react-icons/md'
import { useEffect, useState } from 'react'
import { IoSend } from 'react-icons/io5'
import axios from 'axios'
import { setPostData } from '../redux/postSlice'
import { setUserData } from '../redux/userSlice'
import FollowButton from './FollowButton'

const Post = ({ post }) => {
    const navigate = useNavigate()
    const { userData } = useSelector((state) => state.user)
    const { postData } = useSelector((state) => state.post)
    const { socket } = useSelector((state) => state.socket)
    const [showComment, setShowComment] = useState(false)
    const dispatch = useDispatch()
    const [message, setMessage] = useState('')

    const handleLike = async () => {
        try {
            const result = await axios.get(
                `${import.meta.env.VITE_SERVER_URL}/api/post/like/${post._id}`,
                {
                    withCredentials: true,
                },
            )
            const updatePost = result.data

            const updatePosts = postData.map((p) => (p._id == post._id ? updatePost : p))

            dispatch(setPostData(updatePosts))
        } catch (error) {
            console.log(error)
        }
    }

    const handleComment = async () => {
        try {
            const result = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/api/post/comment/${post._id}`,
                { message },
                {
                    withCredentials: true,
                },
            )
            const updatePost = result.data

            const updatePosts = postData.map((p) => (p._id == post._id ? updatePost : p))
            dispatch(setPostData(updatePosts))
            setMessage('')
        } catch (error) {
            console.log(error)
        }
    }

    const handleSaved = async () => {
        try {
            const result = await axios.get(
                `${import.meta.env.VITE_SERVER_URL}/api/post/saved/${post._id}`,
                {
                    withCredentials: true,
                },
            )

            dispatch(setUserData(result.data))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        socket?.on('likedPost', (updatedData) => {
            const updatedPosts = postData.map((p) =>
                p._id == updatedData.postId ? { ...p, likes: updatedData.likes } : p,
            )
            dispatch(setPostData(updatedPosts))
        })
        socket?.on('commentedPost', (updatedData) => {
            const updatedPosts = postData.map((p) =>
                p._id == updatedData.postId ? { ...p, comments: updatedData.comments } : p,
            )
            dispatch(setPostData(updatedPosts))
        })

        return () => {
            socket?.off('likedPost')
            socket?.off('commentedPost')
        }
    }, [socket, postData, dispatch])

    return (
        <div className="w-[90%] flex flex-col gap-1.5 md:gap-2 bg-white items-center shadow-2xl shadow-[#00000058] rounded-2xl pb-5">
            <div className="w-full h-[80px] flex justify-between items-center px-[10px]">
                <div className="flex justify-center items-center gap-[10px] md:gap-[20px]">
                    <div
                        className="w-[40px] h-[40px] md:w-[60px] md:h-[60px] border-2 border-black rounded-full cursor-pointer overflow-hidden"
                        onClick={() => navigate(`/profile/${post.author?.userName}`)}>
                        <img
                            src={post?.author?.profileImage || dp}
                            alt=""
                            className="w-full object-cover"
                        />
                    </div>
                    <div className="w-[150px] font-semibold truncate">{post?.author?.userName}</div>
                </div>
                {userData?._id != post.author?._id && (
                    <FollowButton
                        tailwind={
                            'px-[10px] min-w-[60px] md:min-w-[100px] py-[5px] h-[30px] md:h-[40px] bg-black text-white rounded-2xl text-[14px] md:text-[16px] cursor-pointer'
                        }
                        targetUser={post.author}
                    />
                )}
            </div>
            <div className="w-[90%] flex items-center justify-center">
                {post.mediaType == 'image' && (
                    <div className="w-[90%] flex items-center justify-center">
                        <img src={post.media} alt="" className="w-[80%] rounded-2xl object-cover" />
                    </div>
                )}
                {post.mediaType == 'video' && (
                    <div className="w-[80%] flex flex-col items-center justify-center">
                        <VideoPlayer media={post.media} />
                    </div>
                )}
            </div>
            <div className="w-full h-[40px] flex justify-between items-center px-[20px] mt-[10px]">
                <div className="flex justify-center items-center gap-[10px]">
                    <div
                        className="flex justify-center items-center gap-[5px]"
                        onClick={handleLike}>
                        {!post.likes.includes(userData._id) && (
                            <FaRegHeart className="w-[25px] cursor-pointer h-[25px]" />
                        )}
                        {post.likes.includes(userData._id) && (
                            <FaHeart className="w-[25px] cursor-pointer h-[25px] text-red-600" />
                        )}
                        <span>{post.likes.length}</span>
                    </div>
                    <div
                        className="flex justify-center items-center gap-[5px]"
                        onClick={() => setShowComment((pre) => !pre)}>
                        <MdOutlineComment className="w-[25px] cursor-pointer h-[25px]" />
                        <span>{post.comments.length}</span>
                    </div>
                </div>
                <div onClick={handleSaved}>
                    {!userData.saved.includes(post._id) && (
                        <FaRegBookmark className="w-[25px] cursor-pointer h-[25px]" />
                    )}
                    {userData.saved.includes(post._id) && (
                        <FaBookmark className="w-[25px] cursor-pointer h-[25px]" />
                    )}
                </div>
            </div>
            {post.caption && (
                <div className="w-full px-[20px] gap-[10px] flex justify-start">
                    <h1 className="font-medium">{post.author.userName}:</h1>
                    <div className="line-clamp-3">{post.caption}</div>
                </div>
            )}
            {showComment && (
                <div className="w-full flex flex-col gap-[10px] pb-[20px] ">
                    <div className="w-full h-[80px] flex items-center justify-between px-[20px] relative">
                        <div
                            className="w-[40px] h-[40px] md:w-[60px] md:h-[60px] border-2 border-black rounded-full cursor-pointer overflow-hidden"
                            onClick={() => navigate(`/profile/${post.author?.userName}`)}>
                            <img
                                src={userData.profileImage || dp}
                                alt=""
                                className="w-full object-cover h-full"
                            />
                        </div>
                        <div className="flex items-center flex-grow">
                            <input
                                type="text"
                                className="px-[10px] border-b-2 border-b-gray-500 w-full outline-none h-[40px] ml-2"
                                placeholder="Write comment"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                            <button
                                className="absolute right-[20px] cursor-pointer"
                                onClick={handleComment}>
                                <IoSend className="w-[25px] h-[25px]" />
                            </button>
                        </div>
                    </div>
                    <div className="w-full max-h-[300px] overflow-auto no-scrollbar">
                        <div>
                            {post.comments?.map((comment, index) => (
                                <div
                                    key={index}
                                    className="w-full px-[20px] py-[20px] flex items-center gap-[20px] border-t-2 border-t-gray-200">
                                    <div
                                        className="w-[40px] h-[40px] md:w-[60px] md:h-[60px] border-2 border-black rounded-full cursor-pointer overflow-hidden flex"
                                        onClick={() =>
                                            navigate(`/profile/${post.author?.userName}`)
                                        }
                                        key={index}>
                                        <img
                                            src={comment.author.profileImage || dp}
                                            alt=""
                                            className="w-full object-cover"
                                        />
                                    </div>
                                    <div className="text-black">{comment.message}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Post
