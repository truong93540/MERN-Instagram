import { useRef, useState } from 'react'
import { FiPlusSquare } from 'react-icons/fi'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import VideoPlayer from '../components/VideoPlayer'
import { serverURL } from '../App'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setPostData } from '../redux/postSlice'
import { setStoryData } from '../redux/storySlice'
import { setLoopData } from '../redux/loopSlice'
import { ClipLoader } from 'react-spinners'

const Upload = () => {
    const navigate = useNavigate()
    const [uploadType, setUploadType] = useState('post')
    const [frontendMedia, setFrontendMedia] = useState(null)
    const [backendMedia, setBackendMedia] = useState(null)
    const mediaInput = useRef()
    const [mediaType, setMediaType] = useState('')
    const [caption, setCaption] = useState('')
    const dispatch = useDispatch()
    const { postData } = useSelector((state) => state.post)
    const { storyData } = useSelector((state) => state.story)
    const { loopData } = useSelector((state) => state.loop)
    const [loading, setLoading] = useState(false)

    const handleMedia = (e) => {
        const file = e.target.files[0]
        if (file.type.includes('image')) {
            setMediaType('image')
        } else {
            setMediaType('video')
        }
        setBackendMedia(file)
        setFrontendMedia(URL.createObjectURL(file))
    }

    const uploadPost = async () => {
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('caption', caption)
            formData.append('mediaType', mediaType)
            formData.append('media', backendMedia)
            const result = await axios.post(`${serverURL}/api/post/upload`, formData, {
                withCredentials: true,
            })
            dispatch(setPostData([...postData, result.data]))
            setLoading(false)
            navigate('/')
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const uploadStory = async () => {
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('media', backendMedia)
            const result = await axios.post(`${serverURL}/api/story/upload`, formData, {
                withCredentials: true,
            })
            dispatch(setStoryData([...storyData, result.data]))
            setLoading(false)
            navigate('/')
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const uploadLoop = async () => {
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('caption', caption)
            formData.append('media', backendMedia)
            const result = await axios.post(`${serverURL}/api/loop/upload`, formData, {
                withCredentials: true,
            })
            dispatch(setLoopData([...loopData, result.data]))
            setLoading(false)
            navigate('/')
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const handleUpload = () => {
        if (uploadType == 'post') {
            uploadPost()
        } else if (uploadType == 'story') {
            uploadStory()
        } else {
            uploadLoop()
        }
    }

    return (
        <div className="w-full h-[100vh] bg-black flex flex-col items-center">
            <div className="w-full h-[80px] flex items-center gap-[20px] px-[20px]">
                <IoMdArrowRoundBack
                    className="text-white w-[25px] h-[25px] cursor-pointer"
                    onClick={() => navigate(`/`)}
                />
                <h1 className="text-white text-[20px] font-semibold ">Upload Media</h1>
            </div>
            <div className="w-[80%] max-w-[600px] h-[80px] bg-white rounded-full flex justify-around items-center gap-[10px]">
                <div
                    className={`w-[28%] h-[80%] flex justify-center items-center text-[19px] font-semibold hover:shadow-2xl hover:bg-black hover:shadow-black hover:text-white cursor-pointer rounded-full ${
                        uploadType == 'post' ? 'bg-black shadow-black text-white shadow-2xl' : ''
                    }`}
                    onClick={() => setUploadType('post')}>
                    Post
                </div>
                <div
                    className={`w-[28%] h-[80%] flex justify-center items-center text-[19px] font-semibold hover:shadow-2xl hover:bg-black hover:shadow-black hover:text-white cursor-pointer rounded-full ${
                        uploadType == 'story' ? 'bg-black shadow-black text-white shadow-2xl' : ''
                    }`}
                    onClick={() => setUploadType('story')}>
                    Story
                </div>
                <div
                    className={`w-[28%] h-[80%] flex justify-center items-center text-[19px] font-semibold hover:shadow-2xl hover:bg-black hover:shadow-black hover:text-white cursor-pointer rounded-full ${
                        uploadType == 'loop' ? 'bg-black shadow-black text-white shadow-2xl' : ''
                    }`}
                    onClick={() => setUploadType('loop')}>
                    Loop
                </div>
            </div>
            {!frontendMedia && (
                <div
                    className="w-[80%] max-w-[500px] h-[250px] bg-[#0e1316] border-gray-800 border-2 flex flex-col items-center justify-center gap-[8px] mt-[15vh] rounded-2xl cursor-pointer hover:bg-[#353a3d]"
                    onClick={() => mediaInput.current.click()}>
                    <input type="file" hidden ref={mediaInput} onChange={handleMedia} />
                    <FiPlusSquare className="text-white w-[32px] h-[32px]" />
                    <div className="text-white text-[19px] font-semibold">Upload {uploadType}</div>
                </div>
            )}
            {frontendMedia && (
                <div className="w-[80%] max-w-[500px] h-[250px] flex flex-col items-center justify-center mt-[15vh]">
                    {mediaType == 'image' && (
                        <div className="w-[80%] max-w-[500px] h-[250px] flex flex-col items-center justify-center mt-[5vh]">
                            <img src={frontendMedia} alt="" className="h-[60%] rounded-2xl" />
                            {uploadType != 'story' && (
                                <input
                                    type="text"
                                    name=""
                                    id=""
                                    className="w-full border-b-gray-400 border-b-2 outline-none px-[10px] py-[5px] text-white mt-[20px]"
                                    placeholder="Write caption"
                                    onChange={(e) => setCaption(e.target.value)}
                                    value={caption}
                                />
                            )}
                        </div>
                    )}
                    {mediaType == 'video' && (
                        <div className="w-[80%] max-w-[500px] h-[250px] flex flex-col items-center justify-center mt-[5vh]">
                            <VideoPlayer media={frontendMedia} />
                            {uploadType != 'story' && (
                                <input
                                    type="text"
                                    name=""
                                    id=""
                                    className="w-full border-b-gray-400 border-b-2 outline-none px-[10px] py-[5px] text-white mt-[20px]"
                                    placeholder="Write caption"
                                    onChange={(e) => setCaption(e.target.value)}
                                    value={caption}
                                />
                            )}
                        </div>
                    )}
                </div>
            )}
            {frontendMedia && (
                <button
                    className=" w-[60%] max-w-[400px] py-[5px] h-[50px] bg-white mt-[50px] cursor-pointer rounded-2xl"
                    onClick={handleUpload}>
                    {loading ? <ClipLoader /> : `Upload ${mediaType}`}
                </button>
            )}
        </div>
    )
}

export default Upload
