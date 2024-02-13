import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import loginService from '@/App/services/login.js'
import { storeAuthToken } from '@/shared/utils/authToken'
import './login.css'
import logo from '../../assets/taskly_logo.png'

const LoginForm = ({ setUser }) => {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }
    
    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                email, password
            })

            storeAuthToken(user.token)
        
            console.log(user.token)
            setUser(user)
            setEmail('')
            setPassword('')
            navigate('/dashboard')
        } catch (exception) {
            console.log(exception)
        }
    }

    return (
        <>
          <form onSubmit={handleLogin} className="signin-form-container">
            <div className="logo">
                <img src={logo} alt="taskly-logo" />
            </div>
            <div className="input-wrapper">
                <input
                type="text"
                id="email"
                value={email}
                onChange={handleEmailChange}
                className="input-field"
                placeholder="Email"
                />
            </div>
            <div className="input-wrapper">
                <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                className="input-field"
                placeholder="Password"
                />
            </div>
            <button id="login-button" type="submit" className="signin-submit-button">Sign in</button>
            <div className="signin-info">
                <p>email: test_admin@gmail.com</p>
                <p>password: password</p>
          </div>
          </form>
        </>
      );
}

export default LoginForm