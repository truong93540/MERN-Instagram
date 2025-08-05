import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPostData } from '../redux/postSlice'

function GetAllPost() {
    const dispatch = useDispatch()
    const { userData } = useSelector((state) => state.user)
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const result = await axios.get(
                    `${import.meta.env.VITE_SERVER_URL}/api/post/getAll`,
                    {
                        withCredentials: true,
                    },
                )
                dispatch(setPostData(result.data))
            } catch (error) {
                console.log(error)
            }
        }
        fetchPost()
    }, [dispatch, userData])
}

export default GetAllPost
