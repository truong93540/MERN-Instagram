import logo from '../assets/logo.png'
import { FaRegHeart } from 'react-icons/fa'
import dp from '../assets/dp.webp'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { serverURL } from '../App'
import { setUserData } from '../redux/userSlice'
import OtherUser from './OtherUser'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Notifications from '../pages/Notifications'

const LeftHome = () => {
    const { userData, suggestedUsers } = useSelector((state) => state.user)
    const { notificationData } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [showNotification, setShowNotification] = useState(false)

    const handleLogout = async () => {
        try {
            await axios.get(`${serverURL}/api/auth/signout`, {
                withCredentials: true,
            })
            dispatch(setUserData(null))
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div
            className={`w-[25%] hidden lg:block h-[100vh] bg-black border-r-2 border-gray-900 lg:min-w-[310px] no-scrollbar ${
                showNotification ? 'overflow-hidden' : 'overflow-auto'
            }`}>
            <div className="w-full h-[100px] flex items-center justify-between p-[20px]">
                <img src={logo} alt="" className="w-[80px]" />
                <div
                    className="relative cursor-pointer"
                    onClick={() => setShowNotification((prev) => !prev)}>
                    <FaRegHeart className="text-white w-[25px] h-[25px]" />
                    {notificationData?.length &&
                        notificationData.some((noti) => noti.isRead == false) && (
                            <div className="w-[10px] h-[10px] bg-blue-600 rounded-full absolute top-0 right-[-5px]"></div>
                        )}
                </div>
            </div>
            {!showNotification && (
                <div>
                    <div className="flex items-center justify-between w-full gap-[10px] px-[10px] border-b-2 border-b-gray-900 py-[10px]">
                        <div className="flex items-center justify-between ">
                            <div
                                className="w-[70px] h-[70px] border-2 border-black rounded-full cursor-pointer overflow-hidden"
                                onClick={() => navigate(`/profile/${userData.userName}`)}>
                                <img
                                    src={userData.profileImage || dp}
                                    alt=""
                                    className="w-full object-cover"
                                />
                            </div>
                            <div className="ml-2">
                                <div className="text-[18px] text-white font-semibold line-clamp-1">
                                    {userData.userName}
                                </div>
                                <div className="text-[15px] text-gray-300 font-semibold line-clamp-1">
                                    {userData.name}
                                </div>
                            </div>
                        </div>
                        <div
                            className="text-blue-500 font-semibold cursor-pointer"
                            onClick={handleLogout}>
                            Log out
                        </div>
                    </div>
                    <div className="w-full flex flex-col gap-[20px] p-[20px]">
                        <h1 className="text-white text-[19px]">Suggested Users</h1>
                        {suggestedUsers &&
                            suggestedUsers.slice(0, 3).map((user, index) => {
                                return <OtherUser key={index} user={user} />
                            })}
                    </div>
                </div>
            )}
            {showNotification && <Notifications />}
        </div>
    )
}

export default LeftHome
