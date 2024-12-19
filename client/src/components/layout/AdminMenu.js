import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/auth'
const AdminMenu = () => {
    const [auth]= useAuth();
  return (
    <>
    <div className=' adminMenu'>
        <h2>Vendor Panel</h2>
        <div >
        <h5>{auth?.user?.name}</h5>
        <h6>E-mail: {auth?.user?.email}</h6>
        </div>
    <div className="list-group text-center">
  <NavLink to="/dashboard/admin/create-category" className="list-group-item list-group-item-action">Create Category</NavLink>
  <NavLink to="/dashboard/admin/create-product" className="list-group-item list-group-item-action">Create Product</NavLink>
  <NavLink to="/dashboard/admin/products" className="list-group-item list-group-item-action">Products</NavLink>
  <NavLink to="/dashboard/admin/users" className="list-group-item list-group-item-action">Users</NavLink>
  <NavLink to="/dashboard/admin/orders" className="list-group-item list-group-item-action">All Orders</NavLink>
  <NavLink to="/dashboard/admin/email" className="list-group-item list-group-item-action">Send Email</NavLink>




</div>
    </div>
</>
  )
}

export default AdminMenu