import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { storeAuthToken } from '@/shared/utils/authToken'
import { storeUserId } from '@/shared/utils/storeUserId'
import { Box, Button, Typography, FormHelperText, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import { color } from '@/shared/utils/styles';
import logo from '@/App/assets/taskly_logo.png'
import loginService from '@/App/services/login.js'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const LoginForm = ({ setUser }) => {

    const navigate = useNavigate()
    const { t } = useTranslation("translations")
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [credentialsError, setCredentialsError] = useState('')

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }
    
    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleLogin = async (event) => {
        event.preventDefault()
        const isPasswordValid = validatePassword();
        const isEmailValid = validateEmail();

        let formValid = isPasswordValid && isEmailValid

        if (formValid) {
            try {
                const user = await loginService.login({
                    email, password
                })
    
                storeAuthToken(user.token)
                storeUserId(user.id)
            
                console.log(user.token)
                setUser(user)
                setEmail('')
                setPassword('')
                navigate('/dashboard')
            } catch (exception) {
                setCredentialsError("Invalid e-mail or password")
                console.log(exception)
            }
        }
    }

    const validatePassword = () => {
        if (password.trim() === '') {
            setPasswordError(t('projects.fieldEmpty'));
            return false;
        } else if (password.length < 8) {
            setPasswordError(t('users.passwordTooShort'));
            return false;
        }
        setPasswordError('');
        return true;
    }

    const validateEmail = () => {
        if (!email.trim()) {
            setEmailError(t('projects.fieldEmpty'));
            return false;
        }
        if (!emailRegex.test(email.toLowerCase())) {
            setEmailError(t('users.emailInvalid'));
            return false;
        }
        setEmailError('');
        return true;
    };

    return (
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '90vh'}}>
            <Box
                component="form"
                onSubmit={handleLogin}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: 350,
                    margin: 'auto',
                    padding: 2,
                    boxShadow: 1,
                    backgroundColor:  color.mainBackground
                }}
            >
                <Box sx={{ marginBottom: 2, p: 2 }}>
                    <img src={logo} alt="taskly-logo" style={{ height: 100 }} />
                </Box>
                <FormControl fullWidth sx = {{ marginBottom: 2, width: 'calc(100% - 20px)'}} error={!!emailError}>
                        <InputLabel htmlFor="email">{t('users.email')}</InputLabel>
                        <OutlinedInput
                            error={!!emailError}
                            id="email"
                            value={email}
                            onChange={handleEmailChange}
                            label={t('users.email')}
                        />
                        {emailError && <FormHelperText>{emailError}</FormHelperText>}
                    </FormControl>
                <FormControl fullWidth sx = {{ marginBottom: 2, width: 'calc(100% - 20px)'}} error={!!passwordError}>
                        <InputLabel htmlFor="password">{t('users.password')}</InputLabel>
                        <OutlinedInput
                            error={!!passwordError}
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={handlePasswordChange}
                            label={t('users.password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        {passwordError && <FormHelperText>{passwordError}</FormHelperText>}
                    </FormControl>
                    {credentialsError && (
                        <Typography color="error">
                            {credentialsError}
                        </Typography>
                    )}
                <Button
                    id="login-button"
                    type="submit"
                    variant="contained"
                    sx={{
                        marginTop: '20px',
                        width: 'calc(100% - 20px)',
                        padding: '10px',
                        cursor: 'pointer',
                    }}
                >
                    Sign in
                </Button>
                <Box sx={{ textAlign: 'center', marginTop: 2 }}>
                    <Typography>email: test_admin@gmail.com</Typography>
                    <Typography>password: password</Typography>
                </Box>
            </Box>
        </Box>
    );
}

export default LoginForm