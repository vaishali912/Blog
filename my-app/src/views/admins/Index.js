import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; 
import { Link } from 'react-router-dom';
export default function Index() {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      console.log("while givng uer",username);
      const res = await fetch('http://localhost:5000/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({ username, password }),
        credentials: 'include' 
      });

      const msg = await res.json();
      console.log("msg",msg)
      if (res.ok) {
        alert("Login successful!");
        navigate(`/dashboard`);
      } else {
        alert(" Login failed: " + msg);
      }

    } catch (err) {
      console.error('Login error:', err);
    }
  };



  return(
    <>
      <h3>Sign In</h3>
      <form onSubmit={(e)=>{handleLogin(e)}} >
        <input type="text" name="username" placeholder="Enter Username" onChange={e => setUsername(e.target.value)} />
        <input type="password" name="password" placeholder="Enter Password" onChange={e => setPassword(e.target.value)} />
        <input type="submit" value="Login" className="btn" />
      </form>
      <span>New User<Link to = '/Register'>Register</Link></span> 
    </>
  )
}
