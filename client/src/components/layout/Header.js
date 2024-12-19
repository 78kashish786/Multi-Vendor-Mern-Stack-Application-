import React from 'react'
import { NavLink,Link} from 'react-router-dom'
import {FaShopware} from 'react-icons/fa'
import { useAuth } from '../../context/auth'
import {toast} from 'react-hot-toast';
import SearchInput from '../Form/SearchInput';
import useCategory from '../../hooks/useCategory';
import Dropdown from 'react-bootstrap/Dropdown';
import { useCart } from '../../context/Cart.js';
import { Badge } from 'antd';
const Header = () => {

  const [auth,setAuth]= useAuth();
  const [cart,setCart]= useCart();

  const categories = useCategory()

//Logout functionlaity
const handleLogout = ()=>{
  setAuth({
    ...auth,
    user:null,
    token: ""
  })
  localStorage.removeItem('auth');
  toast.success("User Logged Out")


}

  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light  ">
  <Link to="/"className="navbar-brand" ><FaShopware/>CLOTHIFY..</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>


  <div className="collapse navbar-collapse" id="navbarSupportedContent">
  
    <ul className="navbar-nav ms-auto">
    
      <li className="nav-item  ">
        <NavLink to="/"className="nav-link" >Home </NavLink>
      </li>
      <li className="nav-item  ">
        <NavLink to="/contact"className="nav-link" >Contact us </NavLink>
      </li>

      <li className="nav-item ">
        <NavLink to="/categories"className="nav-link" >Categories</NavLink>
      </li>
      <li className="nav-item ">
        <NavLink to="/favourites"className="nav-link" >Favourite </NavLink>
      </li>
      <li className="nav-item">
        <Badge count={cart?.length} showZero>
        <NavLink to="/cart"className="nav-link" style={{fontSize:'20px'}} >Cart</NavLink>
        </Badge>
   
       
      </li>
      {/* {auth?.user?.role === 1? (<li className="nav-item ">
        <NavLink to="/dashboard/user/profile"className="nav-link" >Profile</NavLink>
      </li>):("")

      } */}
      {
        !auth.user ? (<>
        <li className="nav-item">
        <NavLink to="/register"className="nav-link">Register</NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/login"className="nav-link" >Login</NavLink>
      </li>
      </>):(<>
        
      <li className='nav-item'>
      <NavLink to={`/dashboard/${auth?.user?.role ===1 ?'admin':'user'}`}className="nav-link" >Dashboard</NavLink>
      </li>
      <li className="nav-item ">
      <NavLink onClick ={handleLogout} to="/login"className="nav-link" >Log Out</NavLink>
      </li>
        
      </>)
      }
      
      {/* <li>
      
  <NavLink className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Dropdown link
  </NavLink>

  <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
    <NavLink className="dropdown-item" href="#">Action</NavLink>
    
  </div>

      </li> */}
      {/* <li className="nav-item dropdown">
        <button className="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown
        </button>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <Link className="dropdown-item" href="#">Action</Link>
          <Link className="dropdown-item" href="#">Another action</Link>
          </div>
      </li> */}
      {/* <li className="nav-item">
        <NavLink to={`/dashboard/${auth?.user?.role ===1 ?'admin':'user'}`}className="nav-link" >Dashboard</NavLink>
      </li> */}
      
    </ul>
  </div>
</nav>
    
    </>
  )
}

export default Header