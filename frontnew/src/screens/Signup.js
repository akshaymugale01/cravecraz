import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { toast } from 'react-toastify';

export default function Signup() {

  const [cred, setCred] = useState({ name: "", email: "", password: "", geolocation: "" })

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify({ name: cred.name, email: cred.email, password: cred.password, location: cred.geolocation }));
    try {
      const response = await fetch("https://cravecraz.onrender.com/api/createuser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: cred.name, email: cred.email, password: cred.password, location: cred.geolocation })
      });
      const json = await response.json();
      console.log(json);

      if (!json.success) {
        alert('Enter valid data');
      }else {
        toast.success("User Created sucessfully!")
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit the form. Please try again later.');
    }
  }


  const onchange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value })
  }

  return (
    <>
      <div className='container'>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" className="form-control" name='name' value={cred.name} onChange={onchange} />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" name='email' value={cred.email} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={onchange} />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" name='password' value={cred.password} id="exampleInputPassword1" placeholder="Password" onChange={onchange} />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Address</label>
            <input type="text" className="form-control" name='geolocation' value={cred.geolocation} placeholder="Address" onChange={onchange} />
          </div>
          <button type="submit" className="m-3 btn btn-primary">Submit</button>
          <Link className='m-3 btn btn-danger' to="/login" >Already user bro!</Link>
        </form>
      </div>
    </>
  )
}