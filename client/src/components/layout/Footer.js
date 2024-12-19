import React from 'react'
import {Link } from "react-router-dom"

const Footer = () => {
  return (
    <div className='bg-dark text-light p-3 footer'>
        <h4 className='text-center'>Kashish Kataria @ 1902117</h4>
        <div className='footer_div'>
          <Link className = " link"to="/contact">Contact us</Link>
          <Link className ="link" to="/about">About us </Link>
        </div>

    </div>
  )
}

export default Footer