import React from 'react'
import Layout from '../components/layout/Layout'
import {Link} from "react-router-dom"
const About = () => {
  return (
    <Layout>
        <div className='pnf'>
      <h1> About us</h1>
      <span>This is the project made by Kashish Kataria.</span>
      <Link to ="/" className="pnf_button">GO BACK!</Link>
    </div>
    </Layout>
  )
}

export default About