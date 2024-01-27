import { useState, Fragment } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import MenuSidebar from '@/shared/components/MenuSidebar'
import MenuTopbar from '@/shared/components/MenuTopbar'
import BaseStyles from './BaseStyles'
import Dashboard from '@/App/Pages/Dashboard'
import LoginForm from '@/App/Pages/Login'

import './fontStyles.css'

const App = () => {

  const [user, setUser] = useState(null)

  return (
    <Fragment>
      <BaseStyles />
      <MenuTopbar />
      <MenuSidebar />
      <Routes>
        <Navigate replace from="/" to="/dashboard" />
        <Route path="/login" element={ <LoginForm setUser={setUser} /> } /> 
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate replace to="/login" />} />
      </Routes>
    </Fragment>
  )
}

export default App