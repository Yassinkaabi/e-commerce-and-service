import React from 'react';
import {Link} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slice/userSlice';

const Navbar = () => {
  const {isAuth,role} = useSelector ((state)=>state.user);
  const dispatch = useDispatch()
  return <div>

      <Link to='/' >Home</Link>
     {isAuth && role==='admin' ? <Link to='/Dashboard' >Dashboard</Link> 
      :isAuth && role==='user'? <Link to='/Profile' >Profile</Link>
      :isAuth && role==='technicien'? <Link to='/Technicien' >Technicien</Link>
      :<><Link to='/Register' >Register</Link>
      <Link to='/Login' >Login</Link></> }
      {isAuth && <button onClick={()=>dispatch(logout())}>Logout</button>}
      <Link to='/Product' >Product</Link>
      <Link to='/Contact' >Contact</Link>

  </div>;
};

export default Navbar;
