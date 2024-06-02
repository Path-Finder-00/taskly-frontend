import { useNavigate } from 'react-router-dom'
import { Box, AppBar, Toolbar, IconButton, Grid, Button } from '@mui/material'
import { styled } from '@mui/material/styles'

import { sizes, color } from '@/shared/utils/styles'
import logo from '@/App/assets/taskly_logo.png'
import i18n from "i18next";
import { useTranslation } from 'react-i18next'
import logoutService from '@/App/services/logout';
import { removeStoredAuthToken } from '@/shared/utils/authToken'
import { removeStoredUserId } from '@/shared/utils/storeUserId'
import { useSnackbar } from '@/shared/components/Snackbar';

const MenuTopbar = ({ setUser }) => {
    const StyledAppBar = styled(AppBar)(() => ({
        height: sizes.topbarHeight,
        width: '100%',
        background: color.sidebar
    }))

    const navigate = useNavigate()
    const { t } = useTranslation("translations")
    const { openSnackbar } = useSnackbar();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    }

    const logout = () => {
        logoutService.logout()
            .then(() => {
                removeStoredUserId(),
                removeStoredAuthToken(),
                setUser(null),
                openSnackbar(t('topbar.logoutSuccess'), 'success'),
                navigate('/', { replace: true })
            })
            .catch(err => {
                console.error('Error while logging out:', err),
                openSnackbar(t('topbar.logoutError'), 'error');
            })
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
                        <Button onClick={() => logout()} sx={{ color: `${color.third}`}}>{t('topbar.logout')}</Button>
                    </Grid>
                </Toolbar>
            </StyledAppBar>
        </Box>
    )
}

export default MenuTopbar