import { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import axios from 'axios'
import { ClipLoader } from 'react-spinners'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import logo from '../assets/logo2.png'
import logo1 from '../assets/logo.png'
import { serverURL } from '../App'
import { setUserData } from '../redux/userSlice'

const SignUp = () => {
    const navigate = useNavigate()
    const [inputClicked, setInputClicked] = useState({
        name: false,
        userName: false,
        email: false,
        password: false,
    })
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('')
    const [userName, setUserName] = useState('')
    const [err, setErr] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    const handleSignUp = async () => {
        setErr('')
        setLoading(true)
        try {
            const result = await axios.post(
                `${serverURL}/api/auth/signup`,
                { name, userName, email, password },
                { withCredential: true }
            )
            dispatch(setUserData(result.data))
            console.log('result.data', result.data)
            setLoading(false)
        } catch (error) {
            setErr(error.response?.data?.message)
            console.log('error', error)
            setLoading(false)
        }
    }

    return (
        <div className="w-full h-screen bg-gradient-to-b from-black to-gray-900 flex flex-col justify-center items-center">
            <div className="w-[90%] lg:max-w-[60%] h-[600px] bg-white rounded-2xl flex justify-center items-center overflow-hidden border-2 border-[#1a1f23]">
                <div className="w-full lg:w-[50%] h-full bg-white flex flex-col items-center p-[10px] gap-[20px]">
                    <div className="flex gap-[10px] justify-center items-center text-[20px] font-semibold mt-[40px]">
                        <span>Sign Up to</span>
                        <img src={logo} alt="logo" className="w-[70px]" />
                    </div>
                    <div
                        className="relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl border-2 border-black"
                        onClick={() => setInputClicked({ ...inputClicked, name: true })}>
                        <label
                            htmlFor="name"
                            className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] transition-all duration-300 ease-in-out ${
                                inputClicked.name ? 'top-[-18px]' : 'top-[6px]'
                            }`}>
                            Enter Your Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onFocus={() => setInputClicked({ ...inputClicked, name: true })}
                        />
                    </div>
                    <div
                        className="relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl border-2 border-black"
                        onClick={() => setInputClicked({ ...inputClicked, userName: true })}>
                        <label
                            htmlFor="userName"
                            className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] transition-all duration-300 ease-in-out ${
                                inputClicked.userName ? 'top-[-18px]' : 'top-[6px]'
                            }`}>
                            Enter Username
                        </label>
                        <input
                            type="text"
                            id="userName"
                            className="w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0"
                            required
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            onFocus={() => setInputClicked({ ...inputClicked, userName: true })}
                        />
                    </div>
                    <div
                        className="relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl border-2 border-black"
                        onClick={() => setInputClicked({ ...inputClicked, email: true })}>
                        <label
                            htmlFor="email"
                            className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] transition-all duration-300 ease-in-out ${
                                inputClicked.email ? 'top-[-18px]' : 'top-[6px]'
                            }`}>
                            Enter Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onFocus={() => setInputClicked({ ...inputClicked, email: true })}
                        />
                    </div>
                    <div
                        className="relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl border-2 border-black"
                        onClick={() => setInputClicked({ ...inputClicked, password: true })}>
                        <label
                            htmlFor="password"
                            className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] transition-all duration-300 ease-in-out ${
                                inputClicked.password ? 'top-[-18px]' : 'top-[6px]'
                            }`}>
                            Enter Password
                        </label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            className="w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onFocus={() => setInputClicked({ ...inputClicked, password: true })}
                        />
                        {!showPassword ? (
                            <FaEye
                                className="absolute cursor-pointer right-[20px] w-[25px] h-[25px]"
                                onClick={() => setShowPassword(true)}
                            />
                        ) : (
                            <FaEyeSlash
                                className="absolute cursor-pointer right-[20px] w-[25px] h-[25px]"
                                onClick={() => setShowPassword(false)}
                            />
                        )}
                    </div>
                    {err && <p className="text-red-500">{err}</p>}
                    <button
                        className="w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px] cursor-pointer rounded-2xl mt-[30px]"
                        onClick={handleSignUp}
                        disabled={loading}>
                        {loading ? <ClipLoader size={30} color="white" /> : 'Sign Up'}
                    </button>
                    <p className="cursor-pointer text-gray-800">
                        Already Have An Account ?{' '}
                        <span
                            className="border-b-2 border-b-black pb-[3px] text-black"
                            onClick={() => {
                                navigate('/SignIn')
                            }}>
                            Sign In
                        </span>
                    </p>
                </div>
                <div className="md:w-[50%] h-full hidden lg:flex justify-center items-center bg-[#000000] flex-col gap-[10px] text-white text-[16px] font-semibold rounded-l-[30px] shadow-2xl shadow-black">
                    <img src={logo1} alt="" className="w-[40%]" />
                    <p>Capture and Share the World's Moments</p>
                </div>
            </div>
        </div>
    )
}

export default SignUp
