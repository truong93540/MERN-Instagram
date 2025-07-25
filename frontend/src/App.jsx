import { Navigate, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import ForgotPassword from './pages/ForgotPassword'
import Home from './pages/Home'
import { useSelector } from 'react-redux'
import GetCurrentUser from './hooks/GetCurrentUser'
import GetSuggestedUsers from './hooks/GetSuggestedUsers'
export const serverURL = 'http://localhost:8000'

const App = () => {
    GetCurrentUser()
    GetSuggestedUsers()
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
        </Routes>
    )
}

export default App
