import React from 'react'
import Layout from '../components/layout/Layout'
import {FaUserAlt}from 'react-icons/fa'
import {MdEmail} from 'react-icons/md'
import emailjs from 'emailjs-com'
import { toast } from 'react-hot-toast'
import { useAuth } from '../context/auth'
const Contact = () => {

  const [auth, setAuth]= useAuth();


  const sendMail= (e)=>{
    e.preventDefault();

          
    emailjs.sendForm('service_zpm6e2z', 'template_rki91oi', e.target, 'BUkCnkMY8facYVFiK').then((res)=>{
      toast.success("Email is sent successfully")
      console.log("sent Email,")
    }).catch((err)=>console.log(err))

  }

  return (
    <Layout>
      <div  className='container border   ' style ={{ backgroundPosition:'center', backgroundSize:'cover', marginbottom:'50px',  marginTop:"5%", width:'50%'}}>
        <h1 style={{marginTop:'25px' ,color:'blue'}}>Contact Form</h1>
        <form className='row' style={{margin:"25px 85px 75px 100px"} }  onSubmit={sendMail}>
          <label>Name</label>
          <input type ="text" name="name" className='form-control' value ={auth?.user?.name}  />
          <br></br>
          <label>Email</label>
          <input type ="email" name="user_email" className='form-control' value ={auth?.user?.email}/>
          <br/>
          <label>Message</label>
          <textarea name ="message" row="5" className='form-control'/>

          <input type='submit' value='Send' className='btn btn-primary mt-5'/>
        </form>

      </div>
        {/* <div className='contact'>
          <div className='Contact_left'>
            <img src ="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y29udGFjdCUyMHVzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"/>

          </div>
          <div className='Contact_right'>
            <h1>Contact us</h1>
            <div className='right_details'>
            
              <h4>Kashish Kataria</h4>
            </div>
            <div className='right_details'>
              <h4>1902117</h4>
            </div>
            <div className='right_details'>
              <h4>B.Tech CSE </h4>
            </div>
            <div className='right_details'>
              <h4>9485686863</h4>
            </div>
            <div className='right_details'>
              
              <h4>kkofficio@gmail.com</h4>
            </div>
            <div className='right_details'>
            <h4>Batch : 2019-2023</h4>
            
            </div>
          

          </div> */}

        {/* </div> */}
    </Layout>
   
  )
}

export default Contact