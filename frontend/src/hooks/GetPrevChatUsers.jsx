import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPrevChatUser } from '../redux/messageSlice'

function GetPrevChatUsers() {
    const dispatch = useDispatch()
    const { messages } = useSelector((state) => state.message)
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const result = await axios.get(
                    `${import.meta.env.VITE_SERVER_URL}/api/message/prevChats`,
                    {
                        withCredentials: true,
                    },
                )
                dispatch(setPrevChatUser(result.data))
            } catch (error) {
                console.log(error)
            }
        }
        fetchUser()
    }, [dispatch, messages])
}

export default GetPrevChatUsers
