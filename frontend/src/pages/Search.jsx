import { useEffect, useState } from 'react'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { IoSearch } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { serverURL } from '../App'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchData } from '../redux/userSlice'
import dp from '../assets/dp.webp'

const Search = () => {
    const navigate = useNavigate()
    const [input, setInput] = useState('')
    const dispatch = useDispatch()
    const { searchData } = useSelector((state) => state.user)

    const handleSearch = async () => {
        try {
            const result = await axios.get(`${serverURL}/api/user/search?keyword=${input}`, {
                withCredentials: true,
            })
            dispatch(setSearchData(result.data))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (input != '') {
            handleSearch()
        } else {
            dispatch(setSearchData(null))
        }
    }, [input])

    return (
        <div className="w-full min-h-[100vh] bg-black flex items-center flex-col gap-[20px] p-5">
            <div className="w-full h-[80px] flex items-center gap-[20px] px-[20px]">
                <IoMdArrowRoundBack
                    className="text-white w-[25px] h-[25px] cursor-pointer"
                    onClick={() => navigate(`/`)}
                />
                <h1 className="text-white text-[20px] font-semibold ">Search</h1>
            </div>
            <div className="w-full h-[80px] flex items-center justify-center">
                <form
                    action=""
                    className="w-[90%] max-w-[800px] h-[80%] rounded-full bg-[#0f1414] flex items-center px-[20px] ">
                    <IoSearch className="text-white w-[18px] h-[18px]" />
                    <input
                        type="text"
                        className="w-full outline-0 rounded-full px-[20px] text-white text-[18px]"
                        placeholder="Search..."
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                    />
                </form>
            </div>
            {searchData?.map((user) => (
                <div
                    className="w-[90%] max-w-[700px] h-[60px] rounded-full bg-white flex items-center gap-[20px] px-[6px] hover:bg-gray-200 cursor-pointer"
                    onClick={() => navigate(`/profile/${user.userName}`)}>
                    <div className="w-[50px] h-[50px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
                        <img src={user.profileImage || dp} alt="" className="w-full object-cover" />
                    </div>
                    <div className="text-black text-[18px] font-semibold">
                        <div>{user.userName}</div>
                        <div className="text-[14px] text-gray-400 ">{user.name}</div>
                    </div>
                </div>
            ))}
            {!input && <div className="text-[30px] text-gray-700 font-bold">Search Here...</div>}
        </div>
    )
}

export default Search
