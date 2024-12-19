import React from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import { useAuth } from '../../context/auth'

const AdminDashboard = () => {

  const [auth]= useAuth();


  return (
    <Layout>
        <div className='container-fluid m-4 p-4 '>
          <div className='row'>
            <div className='col-md-3'>
              <AdminMenu/>
            </div>
            <div className='col-md-9 '>
            <div className='pnf m-0 p md-9'>
      <h1>Welcome to Dashboard</h1>
      <span>{auth?.user?.name}</span>
    </div>
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default AdminDashboard