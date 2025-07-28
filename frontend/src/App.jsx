import { Navigate, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import ForgotPassword from './pages/ForgotPassword'
import Home from './pages/Home'
import { useSelector } from 'react-redux'
import GetCurrentUser from './hooks/GetCurrentUser'
import GetSuggestedUsers from './hooks/GetSuggestedUsers'
import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'
import Upload from './pages/Upload'
import GetAllPost from './hooks/GetAllPost'
export const serverURL = 'http://localhost:8000'

const App = () => {
    GetCurrentUser()
    GetSuggestedUsers()
    GetAllPost()
    const { userData } = useSelector((state) => state.user)
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
                path="/edit-profile"
                element={userData ? <EditProfile /> : <Navigate to={'/signin'} />}
            />
            <Route path="/upload" element={userData ? <Upload /> : <Navigate to={'/signin'} />} />
        </Routes>
    )
}

export default App
