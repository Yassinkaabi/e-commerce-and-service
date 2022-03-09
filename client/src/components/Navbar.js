import React from 'react';
import {Link} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slice/userSlice';
import "./navbar.css"

const Navbar = () => {
  const {isAuth,role} = useSelector ((state)=>state.user);
  const dispatch = useDispatch()
  const { cartTotalQuantity } = useSelector((state) => state.cart);

  return (<div className="header" >
      <nav>
      <Link to='/'> <img src="/logo1.png"/></Link>
            <div className="nav-links" id="navlink">
            <ul>
              <li ><Link to='/' ><p><i className="fa-solid fa-house-chimney"></i>Home</p></Link></li>             
              <li><Link to='/Product'><p>Product</p></Link> </li>
              <li><Link to='/Techniciens'><p>Techniciens</p></Link> </li>
              {isAuth && role==='admin' ?  <li><Link to='/Dashboard' ><p>Dashboard</p></Link></li>
              :isAuth && role==='user'? <li><Link to='/Profile' ><p>Profile</p></Link></li>
              :isAuth && role==='technicien'?<li><Link to='/Technicien' ><p>Profile</p></Link></li> 
              // :<> <li><Link to='/Register' ><p>Register</p></Link></li>
              :<li><Link to='/Login' ><p>Login ✥ Register</p></Link></li>}
              {/* <li><Link to='Cart'>Cart</Link> </li> */}
              
              <li>{isAuth && <button onClick={()=>dispatch(logout())}><p>Logout</p></button>}</li>
            </ul>
            </div> 
            <Link to="/cart">
        <div className="nav-bag">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            fill="currentColor"
            className="bi bi-handbag-fill"
            viewBox="0 0 16 16"
          >
            <path d="M8 1a2 2 0 0 0-2 2v2H5V3a3 3 0 1 1 6 0v2h-1V3a2 2 0 0 0-2-2zM5 5H3.36a1.5 1.5 0 0 0-1.483 1.277L.85 13.13A2.5 2.5 0 0 0 3.322 16h9.355a2.5 2.5 0 0 0 2.473-2.87l-1.028-6.853A1.5 1.5 0 0 0 12.64 5H11v1.5a.5.5 0 0 1-1 0V5H6v1.5a.5.5 0 0 1-1 0V5z" />
          </svg>
          <span className="bag-quantity">
            <span>{cartTotalQuantity}</span>
          </span>
        </div>
      </Link>
      </nav>

  </div>);
};

export default Navbar;
