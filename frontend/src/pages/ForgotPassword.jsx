import axios from 'axios'
import React, { useState } from 'react'
import { ClipLoader } from 'react-spinners'
import { serverURL } from '../App'

const ForgotPassword = () => {
    const [step, setStep] = useState(1)
    const [inputClicked, setInputClicked] = useState({
        email: false,
        otp: false,
        newPassword: false,
        confirmNewPassword: false,
    })
    const [email, setEmail] = useState('')
    const [otp, setOtp] = useState('')
    const [err, setErr] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const handleStep1 = async () => {
        setLoading(true)
        setErr('')
        try {
            const result = await axios.post(
                `${serverURL}/api/auth/sendOtp`,
                { email },
                { withCredentials: true }
            )
            setStep(2)
            console.log(result.data)
            setLoading(false)
        } catch (error) {
            setErr(error.response?.data?.message)
            console.log(error)
            setLoading(false)
        }
    }
    const handleStep2 = async () => {
        setLoading(true)
        setErr('')
        try {
            const result = await axios.post(
                `${serverURL}/api/auth/verifyOtp`,
                { email, otp },
                { withCredentials: true }
            )
            setStep(3)
            console.log(result.data)
            setLoading(false)
        } catch (error) {
            setErr(error.response?.data?.message)
            console.log(error)
            setLoading(false)
        }
    }
    const handleStep3 = async () => {
        if (newPassword !== confirmNewPassword) {
            return setErr('password does not match')
        }
        setLoading(true)
        setErr('')
        try {
            const result = await axios.post(
                `${serverURL}/api/auth/resetPassword`,
                { email, password: newPassword },
                { withCredentials: true }
            )
            console.log(result.data)
            setLoading(false)
        } catch (error) {
            setErr(error.response?.data?.message)
            console.log(error)
            setLoading(false)
        }
    }

    return (
        <div className="w-full h-screen bg-gradient-to-b from-black to-gray-900 flex flex-col justify-center items-center">
            {step === 1 && (
                <div className="w-[90%] max-w-[500px] h-[500px] bg-white rounded-2xl flex justify-center items-center flex-col border-[#1a1f23]">
                    <h2 className="text-[30px] font-semibold">Forgot Password</h2>
                    <div
                        className="relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl border-2 border-black mt-[30px]"
                        onClick={() => setInputClicked({ ...inputClicked, email: true })}>
                        <label
                            htmlFor="email"
                            className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${
                                inputClicked.email ? 'top-[-18px]' : ''
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
                        />
                    </div>
                    {err && <p className="text-red-500">{err}</p>}
                    <button
                        className="w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px] cursor-pointer rounded-2xl mt-[30px]"
                        onClick={handleStep1}
                        disabled={loading}>
                        {loading ? <ClipLoader size={30} color="white" /> : 'Send OTP'}
                    </button>
                </div>
            )}
            {step === 2 && (
                <div className="w-[90%] max-w-[500px] h-[500px] bg-white rounded-2xl flex justify-center items-center flex-col border-[#1a1f23]">
                    <h2 className="text-[30px] font-semibold">Forgot Password</h2>
                    <div
                        className="relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl border-2 border-black mt-[30px]"
                        onClick={() => setInputClicked({ ...inputClicked, otp: true })}>
                        <label
                            htmlFor="otp"
                            className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${
                                inputClicked.otp ? 'top-[-18px]' : ''
                            }`}>
                            Enter OTP
                        </label>
                        <input
                            type="text"
                            id="otp"
                            className="w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0"
                            required
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                    </div>
                    {err && <p className="text-red-500">{err}</p>}
                    <button
                        className="w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px] cursor-pointer rounded-2xl mt-[30px]"
                        onClick={handleStep2}
                        disabled={loading}>
                        {loading ? <ClipLoader size={30} color="white" /> : 'Submit'}
                    </button>
                </div>
            )}
            {step === 3 && (
                <div className="w-[90%] max-w-[500px] h-[500px] bg-white rounded-2xl flex justify-center items-center flex-col border-[#1a1f23]">
                    <h2 className="text-[30px] font-semibold">Reset Password</h2>
                    <div
                        className="relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl border-2 border-black mt-[30px]"
                        onClick={() => setInputClicked({ ...inputClicked, newPassword: true })}>
                        <label
                            htmlFor="newPassword"
                            className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${
                                inputClicked.newPassword ? 'top-[-18px]' : ''
                            }`}>
                            Enter New Password
                        </label>
                        <input
                            type="text"
                            id="newPassword"
                            className="w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0"
                            required
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    <div
                        className="relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl border-2 border-black mt-[30px]"
                        onClick={() =>
                            setInputClicked({ ...inputClicked, confirmNewPassword: true })
                        }>
                        <label
                            htmlFor="confirmNewPassword"
                            className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px] ${
                                inputClicked.confirmNewPassword ? 'top-[-18px]' : ''
                            }`}>
                            Confirm New Password
                        </label>
                        <input
                            type="text"
                            id="confirmNewPassword"
                            className="w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0"
                            required
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                        />
                    </div>
                    {err && <p className="text-red-500">{err}</p>}
                    <button
                        className="w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px] cursor-pointer rounded-2xl mt-[30px]"
                        onClick={handleStep3}
                        disabled={loading}>
                        {loading ? <ClipLoader size={30} color="white" /> : 'Reset Password'}
                    </button>
                </div>
            )}
        </div>
    )
}

export default ForgotPassword
