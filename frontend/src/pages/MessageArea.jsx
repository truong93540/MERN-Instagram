import { IoMdArrowRoundBack } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import dp from '../assets/dp.webp'
import { LuImage } from 'react-icons/lu'
import { IoSend } from 'react-icons/io5'
import { useState, useEffect, useRef } from 'react'
import { serverURL } from '../App'
import axios from 'axios'
import { setMessages } from '../redux/messageSlice'
import SenderMessage from '../components/SenderMessage'
import ReceiverMessage from '../components/ReceiverMessage'

const MessageArea = () => {
    const { selectedUser, messages } = useSelector((state) => state.message)
    const { userData } = useSelector((state) => state.user)
    const navigate = useNavigate()
    const [input, setInput] = useState('')
    const [frontendImage, setFrontendImage] = useState(null)
    const [backendImage, setBackendImage] = useState(null)
    const imageInput = useRef()
    const dispatch = useDispatch()

    const handleImage = (e) => {
        const file = e.target.files[0]
        setBackendImage(file)
        setFrontendImage(URL.createObjectURL(file))
    }

    const handleSendMessage = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append('message', input)
            if (backendImage) {
                formData.append('image', backendImage)
            }

            const result = await axios.post(
                `${serverURL}/api/message/send/${selectedUser._id}`,
                formData,
                { withCredentials: true },
            )
            dispatch(setMessages([...messages, result.data]))
            setInput('')
            setBackendImage(null)
            setFrontendImage(null)
        } catch (error) {
            console.log(error)
        }
    }

    const getAllMessages = async () => {
        try {
            const result = await axios.get(`${serverURL}/api/message/getAll/${selectedUser._id}`, {
                withCredentials: true,
            })
            dispatch(setMessages(result.data))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllMessages()
    }, [])

    return (
        <div className="w-full h-[100vh] bg-black relative">
            <div className="flex items-center gap-[15px] px-[20px] py-[10px] top-0 bg-black z-100 fixed w-full">
                <div className="h-[80px] flex items-center gap-[20px] px-[20px]">
                    <IoMdArrowRoundBack
                        className="text-white w-[25px] h-[25px] cursor-pointer"
                        onClick={() => navigate(`/`)}
                    />
                </div>
                <div
                    className="w-[40px] h-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden"
                    onClick={() => navigate(`/profile/${selectedUser.userName}`)}>
                    <img
                        src={selectedUser.profileImage || dp}
                        alt=""
                        className="w-full object-cover"
                    />
                </div>
                <div className="text-white text-[18px] font-semibold">
                    <div>{selectedUser.userName}</div>
                    <div className="text-[14px] text-gray-200">{selectedUser.name}</div>
                </div>
            </div>
            <div className="w-full h-[88%] pt-[100px] px-[40px] flex flex-col gap-[50px] overflow-auto bg-black no-scrollbar">
                {messages &&
                    messages.map((mess, index) =>
                        mess.sender == userData._id ? (
                            <SenderMessage message={mess} key={index} />
                        ) : (
                            <ReceiverMessage message={mess} key={index} />
                        ),
                    )}
            </div>
            <div className="w-full h-[80px] fixed bottom-0 flex justify-center items-center bg-black z-100">
                <form
                    action=""
                    className="w-[90%] max-w-[800px] h-[80%] rounded-full bg-[#131616] flex items-center gap-[10px] px-[20px] relative"
                    onSubmit={handleSendMessage}>
                    {frontendImage && (
                        <div className="w-[100px] rounded-2xl h-[100px] absolute top-[-120px] right-[10px] overflow-hidden">
                            <img src={frontendImage} alt="" className="h-full object-cover" />
                        </div>
                    )}
                    <input
                        type="file"
                        name=""
                        id=""
                        accept="image/*"
                        ref={imageInput}
                        hidden
                        onChange={handleImage}
                    />
                    <input
                        type="text"
                        placeholder="Message"
                        className="w-full h-full px-[20px] text-[18px] text-white outline-0"
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                    />
                    <div onClick={() => imageInput.current.click()} className="cursor-pointer">
                        <LuImage className="w-[28px] h-[28px] text-white" />
                    </div>
                    {(input || frontendImage) && (
                        <button className="w-[60px] h-[40px] rounded-full bg-gradient-to-br from-[#9500ff] to-[#ff0095] flex items-center justify-center cursor-pointer">
                            <IoSend className="w-[25px] h-[25px] text-white" />
                        </button>
                    )}
                </form>
            </div>
        </div>
    )
}

export default MessageArea
