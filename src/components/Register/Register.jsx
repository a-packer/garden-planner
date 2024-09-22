import React, {useState} from 'react'
import '../common.css';

const Register = () => {

  const [message, setMessage] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    console.log('register', registerUsername, registerPassword)
    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ registerUsername, registerPassword }),
      });
      if (response.ok) {
        setMessage("Registration complete");
      } else {
        setMessage('Invalid username or password for registration.');
      }
    } catch (error) {
      setMessage('Error registering');
    }
  };

  return (
    <div className="login-reg-wrapper">
      <h2 className="login-reg-header">Register New User</h2>
      <form onSubmit={handleSubmitRegister}>
          <div className="login-reg-form-div">
            <img src={require('../../components/user.svg').default} alt='mySvgImage' className="login-reg-icon" />    
            <input 
              placeholder="username"
              type="text" value={registerUsername}
              onChange={(e) => setRegisterUsername(e.target.value)}
              required
              className="login-reg-input" />
          </div>
          <div className="login-reg-form-div">
            <img src={require('../../components/lock-solid.svg').default} alt='mySvgImage' className="login-reg-icon" />    
            <input 
              placeholder="password"
              type="password"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
              required
              className="login-reg-input" />
          </div>
          <button className="login-reg-button" type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  )
}

export default Register