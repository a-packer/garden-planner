import React, { useState } from 'react';
import './Login.css'

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');


    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        console.log('login', username, password)
        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const result = await response.json();
                setMessage(result.message);
            } else {
                setMessage('Invalid username or password. Please Try again');
            }
        } catch (error) {
            setMessage('Error logging in');
        }
    };


    return (
        <div className='loginWrapper'>
            <h2 className='login-header'>Login</h2>
            <form onSubmit={handleSubmitLogin}>
                <div className='login-form-div'>
                    <label className='login-form-label'>Username:</label>
                    <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className='login-form-div'>
                    <label className='login-form-label'>Password:</label>
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type='submit'>Login</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Login;