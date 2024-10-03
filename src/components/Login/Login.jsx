import React, { useState } from 'react';
import '../common.css';

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
        <div className='login-reg-wrapper'>
            <form onSubmit={handleSubmitLogin}>
                <div className='login-reg-form-div'>
                    <img src={require('../../components/user.svg').default} alt='mySvgImage' className="login-reg-icon" />
                    <input 
                        placeholder="username" 
                        type='text'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="login-reg-input" />
                </div>
                <div className='login-reg-form-div'>
                  <img src={require('../../components/lock-solid.svg').default} alt='mySvgImage' className="login-reg-icon" />    
                   <input 
                    placeholder="password" 
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="login-reg-input" />
                </div>
                <button className="login-reg-button" type='submit'>Login</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Login;