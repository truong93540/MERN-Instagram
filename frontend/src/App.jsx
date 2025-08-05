import { Navigate, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import ForgotPassword from './pages/ForgotPassword'
import Home from './pages/Home'
import { useDispatch, useSelector } from 'react-redux'
import GetCurrentUser from './hooks/GetCurrentUser'
import GetSuggestedUsers from './hooks/GetSuggestedUsers'
import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'
import Upload from './pages/Upload'
import GetAllPost from './hooks/GetAllPost'
import Loops from './pages/Loops'
import GetAllLoops from './hooks/GetAllLoops'
import Story from './pages/Story'
import GetAllStories from './hooks/GetAllStories'
import Messages from './pages/Messages'
import MessageArea from './pages/MessageArea'
import { io } from 'socket.io-client'
import { useEffect } from 'react'
import { setOnlineUsers, setSocket } from './redux/socketSlice'
import GetFollowingList from './hooks/GetFollowingList'
import GetPrevChatUsers from './hooks/GetPrevChatUsers'
import Search from './pages/Search'
import GetAllNotification from './hooks/GetAllNotifications'
import Notifications from './pages/Notifications'
import { setNotificationData } from './redux/userSlice'

export const serverURL = 'https://mern-instagram-yyq5.onrender.com'

const App = () => {
    GetCurrentUser()
    GetSuggestedUsers()
    GetAllPost()
    GetAllLoops()
    GetAllStories()
    GetFollowingList()
    GetPrevChatUsers()
    GetAllNotification()
    const { userData, notificationData } = useSelector((state) => state.user)
    const { socket } = useSelector((state) => state.socket)
    const dispatch = useDispatch()

    useEffect(() => {
        if (userData) {
            const socketIo = io(serverURL, {
                query: {
                    userId: userData._id,
                },
            })
            dispatch(setSocket(socketIo))

            socketIo.on('getOnlineUsers', (users) => {
                dispatch(setOnlineUsers(users))
            })

            return () => socketIo.close()
        } else {
            if (socket) {
                socket.close()
                dispatch(setSocket(null))
            }
        }
    }, [userData])

    socket?.on('newNotification', (noti) => {
        dispatch(setNotificationData([...notificationData, noti]))
    })

    return (
        <Routes>
            <Route path="/signup" element={!userData ? <SignUp /> : <Navigate to={'/'} />} />
            <Route path="/signin" element={!userData ? <SignIn /> : <Navigate to={'/'} />} />
            <Route
                path="/forgot-password"
                element={!userData ? <ForgotPassword /> : <Navigate to={'/'} />}
            />
            <Route path="/" element={userData ? <Home /> : <Navigate to={'/signin'} />} />
            <Route
                path="/profile/:userName"
                element={userData ? <Profile /> : <Navigate to={'/signin'} />}
            />
            <Route
                path="/story/:userName"
                element={userData ? <Story /> : <Navigate to={'/signin'} />}
            />
            <Route
                path="/edit-profile"
                element={userData ? <EditProfile /> : <Navigate to={'/signin'} />}
            />
            <Route
                path="/messages"
                element={userData ? <Messages /> : <Navigate to={'/signin'} />}
            />
            <Route
                path="/messageArea"
                element={userData ? <MessageArea /> : <Navigate to={'/signin'} />}
            />
            <Route
                path="/notifications"
                element={userData ? <Notifications /> : <Navigate to={'/signin'} />}
            />
            <Route path="/upload" element={userData ? <Upload /> : <Navigate to={'/signin'} />} />
            <Route path="/search" element={userData ? <Search /> : <Navigate to={'/signin'} />} />
            <Route path="/loops" element={userData ? <Loops /> : <Navigate to={'/signin'} />} />
        </Routes>
    )
}

export default App
