import React from 'react'
import Layout from '../components/layout/Layout'
import {Link } from 'react-router-dom'
const PageNotFound = () => {
  return (
   <Layout>
    <div className='pnf'>
      <h1> Error 404</h1>
      <span>OOPS! Page Not Found</span>
      <Link to ="/" className="pnf_button">GO BACK!</Link>
    </div>
   </Layout>
  )
}

export default PageNotFound