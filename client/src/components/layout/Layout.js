import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Toaster } from 'react-hot-toast';

import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  
const Layout = (props) => {
  return (
    <div className='layout_bg'>
        <Header/>
        
        <main style ={{minHeight:"100vh"}} className="main_lay"  >
          <ToastContainer/>
          <Toaster
  position="top-center"
  reverseOrder={false}
  gutter={8}
  containerClassName=""
  containerStyle={{}}
  toastOptions={{
    // Define default options
    className: '',
    duration: 5000,
    style: {
      background: '#363636',
      color: '#fff',
    },

    // Default options for specific types
    success: {
      duration: 3000,
      theme: {
        primary: 'green',
        secondary: 'black',
      },
    },
  }}
/>
        {props.children}
        
        </main>
        {/* <Footer/>  */}
    </div>
    
  )
}

export default Layout;