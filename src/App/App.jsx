import { useState, Fragment } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import { AppBar, Toolbar, IconButton, Typography, Box, CssBaseline } from '@mui/material'
import { useTheme, ThemeProvider } from '@mui/material/styles'
import MenuIcon from '@mui/icons-material/Menu'

import MenuSidebar from '@/shared/components/MenuSidebar'
import MenuTopbar from '@/shared/components/MenuTopbar'
import { Container, Content, Canvas } from './MainStyle'
import BaseStyles from './BaseStyles'

import { sizes, color, font } from '@/shared/utils/styles';
import { theme, mainTheme } from '@/shared/utils/theme'
import Dashboard from '@/App/Pages/Dashboard'
import MyProjects from '@/App/Pages/Projects/MyProjects'
import LoginForm from '@/App/Pages/Login'

import './fontStyles.css'

const App = () => {

  const [user, setUser] = useState(null)

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', height: '100vh' }}>
        <CssBaseline />
        { user && <MenuTopbar>

        </MenuTopbar> }
        { user && <MenuSidebar>

        </MenuSidebar> }
        <ThemeProvider theme={mainTheme}>
          <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: `${sizes.topbarHeight}px`, boxShadow: 'inset 2px 2px 5px #d3d3d3' }}>
            <Routes>
              <Route path="/login" element={ <LoginForm setUser={setUser} /> } /> 
              <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate replace to="/login" />} />
              <Route path="/projects" element={user ? <MyProjects /> : <Navigate replace to="/login" />} />
              <Route path="*" element={ <Navigate to="/login" replace /> } />
            </Routes>
          </Box>
        </ThemeProvider>
      </Box>
    </ThemeProvider>
  )
}

export default App