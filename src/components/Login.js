import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await axios.get(`http://localhost:3001/users?email=${email}&password=${password}`);
    if (res.data.length > 0) {
      localStorage.setItem('user', JSON.stringify(res.data[0]));
      navigate('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div style={styles.container}>
      <style>{css}</style>
      <h2>Login</h2>
      <input style={styles.input} placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input style={styles.input} placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
      <button style={styles.button} onClick={handleLogin}>Login</button>
      <p style={styles.linkText}>Don't have an account? <Link to="/register">Register here</Link></p>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '500px',
    margin: '40px auto',
    padding: '30px',
    background: '#fff',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    fontFamily: 'sans-serif'
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '4px',
    border: '1px solid #ccc'
  },
  button: {
    padding: '10px 16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  linkText: {
    marginTop: '10px',
    textAlign: 'center'
  }
};

const css = `
  a { color: #007bff; text-decoration: none; }
  a:hover { text-decoration: underline; }
`;

export default Login;
