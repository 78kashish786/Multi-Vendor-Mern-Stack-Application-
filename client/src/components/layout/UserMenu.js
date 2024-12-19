import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/auth'
const UserMenu = () => {

    const [auth]= useAuth();

  return (
    <>
    <div className='text-center adminMenu'>
        <h2>User Panel</h2>
        <h5>{auth?.user?.name}</h5>
        <h6>{auth?.user?.email}</h6>
    <div className="list-group">
  <NavLink to="/dashboard/user/profile" className="list-group-item list-group-item-action">Profile</NavLink>
  <NavLink to="/dashboard/user/orders" className="list-group-item list-group-item-action">Order History</NavLink>
  {/* <NavLink to="/dashboard/user/orderss" className="list-group-item list-group-item-action">Orders </NavLink> */}

 
</div>
    </div>
</>
  )
}

export default UserMenu