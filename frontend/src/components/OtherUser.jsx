import { useNavigate } from 'react-router-dom'
import dp from '../assets/dp.webp'

const OtherUser = ({ user }) => {
    const navigate = useNavigate()
    return (
        <div className="w-full h-[80px] flex items-center justify-between border-b-2 border-gray-800">
            <div
                className="flex items-center justify-between"
                onClick={() => navigate(`/profile/${user.userName}`)}>
                <div className="w-[50px] h-[50px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
                    <img src={user.profileImage || dp} alt="" className="w-full object-cover" />
                </div>
                <div className="ml-2">
                    <div className="text-[18px] text-white font-semibold line-clamp-1">
                        {user.userName}
                    </div>
                    <div className="text-[15px] text-gray-300 font-semibold line-clamp-1">
                        {user.name}
                    </div>
                </div>
            </div>
            <button className="px-[10px] w-[100px] py-[5px] h-[40px] bg-white rounded-2xl cursor-pointer">
                Follow
            </button>
        </div>
    )
}

export default OtherUser
