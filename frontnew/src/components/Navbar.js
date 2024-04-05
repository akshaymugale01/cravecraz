import React, {useState} from 'react'
import { Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'
import Model from '../Model';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';

export const Navbar = () => {
  let data = useCart();
  const [CartView, setCartView] = useState(false)
  
  const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem("authToken");
  navigate("/")
}
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-warning">
  <div className="container-fluid">
  <Link className="navbar-brand fst-italic fw-bold fs-4" to="/">CraveCraze!</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav me-auto mb-2">
        <li className="nav-item">
          <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
        </li>
       {(localStorage.getItem("authToken")) ? 
       <li className="nav-item">
       <Link className="nav-link active fs-5" aria-current="page" to="/myOrder">My Order</Link>
       </li> 
       : "" }
      </ul>
    {(!localStorage.getItem("authToken"))? 
      <div className='d-flex'>
          <Link className="btn bg-black text-success mx-1" to="/login">Login</Link>
          <Link className="btn bg-black text-success mx-1" to="/createuser">Signup</Link>
      </div>
      : 
      <div>
      <div className='btn bg-black text-success mx-2' onClick={() => {setCartView(true)}}>
        My Cart {""}
        <Badge pill bg='danger'>{data.length}</Badge>
      </div>
      {CartView ? <Model onClose={()=> setCartView(false)}><Cart /></Model>: null}
      <div className='btn bg-white text-danger text-uppercase mx-2' onClick={handleLogout}>
        Logout
      </div>
      </div>
      }
    </div>
  </div>
</nav>

    </div>
  )
}