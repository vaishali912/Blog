import React, { useEffect, useState } from 'react'
import style from './admins/style.css';
 import { Link, useNavigate } from 'react-router-dom';
export default function Index1() {
  const navigate =useNavigate();
 const [username,setUsername] = useState('');
  const [password,setPassword] =useState('');
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
         body:JSON.stringify({ username, password }),
         credentials: 'include' 
      });

      const json = await res.json();

      if (res.status === 201) {
        alert(" Registered successfully!");
        console.log("id",json);
        navigate(`/dashboard`);
      } else {
        alert(" Register failed: " + json.message);
      }

    } catch (err) {
      console.error('Register error:', err);
    }
  };
     return (
    <>
      <h3>Register</h3>
      <form onSubmit={(e)=>{handleRegister(e)}}>
        <input type="text" name="username" placeholder="Enter Username" onChange={e => setUsername(e.target.value)} />
        <input type="password" name="password" placeholder="Enter Password" onChange={e => setPassword(e.target.value)} />
        <input type="submit" value="Register" className="btn" />
      </form>
     <span>Already have a account<Link to = '/'>Sign In</Link></span>
    </>
  )


}
