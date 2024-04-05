import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login(index) {
const [cred, setCred] = useState({email:"", password:""});
  
let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify({ email: cred.email, password: cred.password}));
  
    const response = await fetch("https://foodapp-uqfe.onrender.com/api/loginuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: cred.email, password: cred.password })
    });
  
    if (!response.ok) {
      console.error('Error:', response.status);
      toast.error("Failde to submit!, try Again!")
      alert('Failed to submit the form. Please try again later.');
      return
    }
  
    const json = await response.json();
    console.log(json);
  
    if (!json.success) {
      toast.alert('Enter valid data');
    }
    if (json.success) {
      localStorage.setItem("userEmail", cred.email);
      localStorage.setItem("authToken", json.authToken);
      toast.success("Login successfully!", { delay: 450 });
      console.log(localStorage.getItem("authToken"));
      navigate('/');
    }    
  }

  const onChange = (e) => {
    setCred({...cred,[e.target.name]:e.target.value})
  }
  
  return (
    <div>
      <motion.div 
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ delay: index*0.3, ease: "easeInOut" }}
      >
      <div className='container'>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" name='email' value={cred.email} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={onChange} />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" name='password' value={cred.password} id="exampleInputPassword1" placeholder="Password" onChange={onChange} />
          </div>
          
          <button type="submit" className="m-3 btn btn-primary">Submit</button>
          <Link className='m-3 btn btn-danger' to="/createuser" >NEW USER!</Link>
        </form>
      </div>
      </motion.div>
    </div>
  )
}

export default Login