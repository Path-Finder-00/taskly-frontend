import { useNavigate } from 'react-router-dom'

import { Box, AppBar, Toolbar, IconButton } from '@mui/material'
import { styled } from '@mui/material/styles'

import { sizes, color } from '@/shared/utils/styles'
import logo from '@/App/assets/taskly_logo.png'


const MenuTopbar = () => {
    const StyledAppBar = styled(AppBar)(({ theme }) => ({
        height: sizes.topbarHeight,
        width: '100%',
        background: color.sidebar
    }))

    const navigate = useNavigate()

    return(
        <Box>
            <StyledAppBar position="fixed" elevation={0} >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="go to dashboard"
                        edge="start"
                        onClick={() => navigate('/dashboard')}
                    >
                        <img src={logo} height={sizes.topbarHeight - 20} />
                    </IconButton>
                </Toolbar>
            </StyledAppBar>
        </Box>
    )
}

export default MenuTopbar