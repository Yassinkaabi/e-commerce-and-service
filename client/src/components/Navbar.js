import {React,useState} from 'react';
import {Link,Route} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slice/userSlice';
import "./navbar.css"

const Navbar = () => {
  const {isAuth,role} = useSelector ((state)=>state.user);
  const dispatch = useDispatch()
  const { cartTotalQuantity } = useSelector((state) => state.cart);
  const [isMenu, setIsMenu] = useState (false)

  return (<div className="header" >
      <nav>
      <Link className='Link-style' to='/'><h1 className='logo'><span className='firstword'>Security</span><span className='secondword'>shop</span> </h1> </Link>
      <ul  className={isMenu ? "nav-links-mobile" : "nav-links"}
        onClick= {()=> setIsMenu (false)}
              >
              <li><Link className='Link-style' id='home' to='/' ><p>Home</p></Link></li>             
              <li><Link className='Link-style' id='product' to='/Product'><p>Products</p></Link> </li>
              <li><Link className='Link-style' id='technicien' to='/Techniciens'><p>Techniciens</p></Link> </li>
              {isAuth && role==='admin' ?  <li><Link className='Link-style' id='dashboard' to='/Dashboard' ><p>Dashboard</p></Link></li>
              :isAuth && role==='user'? <li><Link className='Link-style' id='profile' to='/Profile' ><p>Profile</p></Link></li>
              :isAuth && role==='technicien'?<li><Link className='Link-style' to='/Technicien' ><p>Profile</p></Link></li> 
              // :<> <li><Link to='/Register' ><p>Register</p></Link></li>
              :<li><Link className='Link-style' to='/Login' id='login'><p>Login ✥ Register</p></Link></li>}
              {/* <li><Link to='Cart'>Cart</Link> </li> */}
              <li>{isAuth &&<p className='btn-logout' onClick={()=>dispatch(logout())}>Logout</p>}</li>
            <Link className='Link-cart' to="/cart" >
        <li className="nav-bag">
        <i class="fa-solid fa-cart-arrow-down"></i>
          <span>
            <span>{cartTotalQuantity}</span>
          </span>
        </li>
      </Link>
            </ul>
            

              <button className='mobile-menu-icon'
        onClick={() => setIsMenu(!isMenu)}
        >
      {isMenu? (
      <i class="fa-solid fa-xmark"></i>
      )  : (
      <i class="fa-solid fa-bars"></i>
      )}
      </button>
      </nav>
  </div>);
};

export default Navbar;
