import { Routes, Route, Navigate } from "react-router-dom"

import Dashboard from '@/App/Pages/Dashboard'
import LoginForm from '@/App/Pages/Login'

const RoutesWTF = ({ user, setUser }) => (
    <Routes>
        <Route path="/login" element={ <LoginForm setUser={setUser} /> } /> 
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate replace to="/login" />} />
    </Routes>
)

export default RoutesWTF