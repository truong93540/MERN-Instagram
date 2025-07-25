import { GoHomeFill } from 'react-icons/go'
import { FiPlusSquare } from 'react-icons/fi'
import { IoSearch } from 'react-icons/io5'
import { MdOutlineOndemandVideo } from 'react-icons/md'
import dp from '../assets/dp.webp'

const Nav = () => {
    return (
        <div className="w-[90%] lg:w-[40%] h-[80px] bg-black flex justify-around items-center fixed bottom-[20px] rounded-full shadow-2xl shadow-[#000000] z-[100]">
            <div>
                <GoHomeFill className="text-white w-[32px] h-[32px]" />
            </div>
            <div>
                <IoSearch className="text-white w-[32px] h-[32px]" />
            </div>
            <div>
                <FiPlusSquare className="text-white w-[32px] h-[32px]" />
            </div>
            <div>
                <MdOutlineOndemandVideo className="text-white w-[32px] h-[32px]" />
            </div>
            <div className="w-[36px] h-[36px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
                <img src={dp} alt="" className="w-full object-cover" />
            </div>
        </div>
    )
}

export default Nav
