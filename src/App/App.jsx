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
import CreateProject from '@/App/Pages/Projects/CreateProject'
import ProjectDetails from '@/App/Pages/Projects/ProjectDetails'
import EditProject from '@/App/Pages/Projects/EditProject'
import MyTickets from '@/App/Pages/Tickets/MyTickets'
import LoginForm from '@/App/Pages/Login'
import CreateTicket from '@/App/Pages/Tickets/CreateTicket'
import CommentsAttachments from '@/App/Pages/Tickets/CommentsAttachments'
import TicketDetails from '@/App/Pages/Tickets/TicketDetails'
import EditTicket from '@/App/Pages/Tickets/EditTicket'

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
              <Route path="/tickets" element={user ? <MyTickets /> : <Navigate replace to="/login" />} />
              <Route path="/projects/createProject" element={user ? <CreateProject /> : <Navigate replace to="/login" />} />
              <Route path="/projects/editProject/:projectId" element={user ? <EditProject /> : <Navigate replace to="/login" />} />
              <Route path="/projects/projectDetails/:projectId" element={user ? <ProjectDetails /> : <Navigate replace to="/login" />} />
              <Route path="/tickets/createTicket" element={user ? <CreateTicket /> : <Navigate replace to="/login" />} />
              <Route path="/tickets/ticketDetails/:ticketId" element={user ? <TicketDetails /> : <Navigate replace to="/login" />} />
              <Route path="/tickets/editTicket/:ticketId" element={user ? <EditTicket /> : <Navigate replace to="/login" />} />
              <Route path="/tickets/commentsAttachments/:ticketId" element={user ? <CommentsAttachments /> : <Navigate replace to="/login" />} />
              <Route path="*" element={ <Navigate to="/login" replace /> } />
            </Routes>
          </Box>
        </ThemeProvider>
      </Box>
    </ThemeProvider>
  )
}

export default App