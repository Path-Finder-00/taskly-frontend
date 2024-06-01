import { useNavigate } from 'react-router-dom'

import { Box, AppBar, Toolbar, IconButton, Grid, Button } from '@mui/material'
import { styled } from '@mui/material/styles'

import { sizes, color } from '@/shared/utils/styles'
import logo from '@/App/assets/taskly_logo.png'
import i18n from "i18next";
import { useTranslation } from 'react-i18next'

const MenuTopbar = () => {
    const StyledAppBar = styled(AppBar)(({ theme }) => ({
        height: sizes.topbarHeight,
        width: '100%',
        background: color.sidebar
    }))

    const navigate = useNavigate()
    const { t } = useTranslation("translations")

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    }

    return (
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
                    </IconButton >
                    <Grid container justifyContent="flex-end" gap="8px">
                        <Button onClick={() => changeLanguage(t('topbar.changeLanguage'))} sx={{ color: `${color.third}`}}>{t('topbar.changeLanguage')}</Button>
                    </Grid>
                </Toolbar>
            </StyledAppBar>
        </Box>
    )
}

export default MenuTopbar