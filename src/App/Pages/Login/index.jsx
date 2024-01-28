import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import loginService from '@/App/services/login.js'

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

            window.localStorage.setItem('loggedTasklyAppUser', JSON.stringify(user))
        
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
            <form onSubmit={handleLogin}>
                <div>
                    email 
                    <input
                        type="text"
                        id='email'
                        value={email}
                        onChange={handleEmailChange}
                    />
                </div>
                <div>
                    password
                    <input
                        type="password"
                        id='password'
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <button id='login-button' type="submit">login</button>
            </form>
            <p>email: test_admin@gmail.com</p>
            <p>password: password</p>
        </>
    )
}

export default LoginForm