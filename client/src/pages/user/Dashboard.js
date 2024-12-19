import React from 'react'
import Layout from '../../components/layout/Layout'
import UserMenu from '../../components/layout/UserMenu';
import { useAuth } from '../../context/auth';
const Dashboard = () => {

  const [auth ]= useAuth();


  return (
    <Layout>
        <div className='container-fluid m-4 p-4'>
          <div className='row'>
            <div className='col-md-3'>
              <UserMenu/>
            </div>
            <div className='col-md-9 p-3'>
            <div className='pnf m-0 p-1 md-9'>
      <h1>Welcome to Dashboard</h1>
      <span>{auth?.user?.name}</span>
    </div>
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default Dashboard;