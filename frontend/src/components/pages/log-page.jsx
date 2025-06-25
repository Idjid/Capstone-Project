import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  //My logging part
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //Loading and error control
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('')

  //Navigation Hook
  const navigate = useNavigate();

  //Login function
  const Logging = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      return alert('Please, fill all blanks');
    }

    setLoading(true);
    setError('');


    try {
      const res = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ email, password })
      });
      
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        alert('Login worked!');
        navigate('/frontend/src/components/pages/main.js')
      } else {
        setError(data.msg || "Login error");
      }
    } catch (err) {
      setError("Server is not available. Sorry")
    } finally {
      setLoading(false);
    }
  };

  

  //Login page
  return (
  <form onSubmit={Logging}>
    <input value={email} onChange={event => setEmail(event.target.value)} placeholder="Email"></input>
    <input type="password" value={password} onChange={event => setPassword(event.target.value)} placeholder='Password'></input>
    <button type="submit" disable={loading}>{loading ? 'Logging in...' : Login}Login</button>
  </form>
  );
}

export default Login;