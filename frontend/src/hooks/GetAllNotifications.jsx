import axios from 'axios'

import { useDispatch, useSelector } from 'react-redux'
import { serverURL } from '../App'
import { setNotificationData } from '../redux/userSlice'
import { useEffect } from 'react'

function GetAllNotifications() {
    const dispatch = useDispatch()
    const { userData } = useSelector((state) => state.user)

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const result = await axios.get(`${serverURL}/api/user/getAllNotifications`, {
                    withCredentials: true,
                })
                dispatch(setNotificationData(result.data))
            } catch (error) {
                console.log(error)
            }
        }
        fetchNotifications()
    }, [dispatch, userData])
}

export default GetAllNotifications
