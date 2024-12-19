import React from 'react'
import emailjs from  'emailjs-com'
import { useAuth } from '../../context/auth'
import { toast } from 'react-hot-toast'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
const EmailAdmin = () => {

  const [auth,setAuth] = useAuth();

  
  const sendMail= (e)=>{
    e.preventDefault();

          
    emailjs.sendForm('service_zpm6e2z', 'template_rki91oi', e.target, 'BUkCnkMY8facYVFiK').then((res)=>{
      toast.success("Email is sent successfully")
      console.log("sent Email,")
    }).catch((err)=>console.log(err))

  }

  return (
    <Layout>
       <div className='container-fluid m-4 p-4'>
          <div className='row'>
            <div className='col-md-3'>
              <AdminMenu/>
            </div>
            <div className='col-md-9 p-3 '>
            <div  className='container' style ={{ backgroundPosition:'center', backgroundSize:'cover', marginbottom:'50px',  marginTop:"5%", width:'50%'}}>
    <h1 style={{marginTop:'25px' ,color:'blue'}}>Contact Form</h1>
    <form className='row' style={{margin:"25px 85px 75px 100px"} }  onSubmit={sendMail}>
      <label>Name</label>
      <input type ="text" name="name" className='form-control' value ={auth?.user?.name}/>
      <br></br>
      <label>Email</label>
      <input type ="email" name="user_email" className='form-control' value ={auth?.user?.email}/>
      <br/>
      <label>Message</label>
      <textarea name ="message" row="5" className='form-control'/>

      <input type='submit' value='Send' className='btn btn-primary mt-5'/>
    </form>

  </div>
            </div>
            </div>
            </div>
    </Layout>
  )
}

export default EmailAdmin