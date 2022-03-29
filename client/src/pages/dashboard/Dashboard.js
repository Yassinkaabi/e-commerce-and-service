import React from 'react';
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom'

const Dashboard = () => {
    const {isAuth,role} = useSelector ((state)=>state.user);
  return (
    <>
    <div>
      <div className='btn-dashboard'>
        {isAuth && role==='admin' && <Link to='/Profile' > <button  style={{marginLeft:'43%'}} className='btn-user' >View Profile</button></Link>}
        {isAuth && role==='admin' && <Link to='/ListUsers' > <button className='btn-profile' >List Of Users</button></Link>}
        {isAuth && role==='admin' && <Link to='/OrderScreen' > <button className='btn-profile' >Order </button></Link>}
        </div>
      <img src='bgAdmin.jpg' width='100%' height='100%'/>
    </div>
    </>
  )
}
export default Dashboard;
