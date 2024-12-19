import React, {useState} from 'react'
import Layout from '../../components/layout/Layout'
// import toast from 'react-hot-toast'
  import axios from 'axios'
  import { useNavigate} from "react-router-dom"
  
  import { ToastContainer, toast } from 'react-toastify';

const ForgotPassword = () => {

    
    const [email, setEmail] = useState('');
    const [newPassword, setNewpassword] = useState('');
    const [answer, setAnswer]= useState("");
    const navigate = useNavigate();
  

    //form function 
    const handleSubmit  = async (e)=>{
        e.preventDefault();
        try{

            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`, {
            email,answer,newPassword
            });
           
            if(res.data.success){
                toast.success(res.data.message);
                // alert(res.data.message);
                toast('Password  reset successfully')
                  navigate( "/login");
            }else{
                toast.error(res.data.message);
            }
        }catch(error){
            console.log(error)
            toast.error("Password Reset Unsuccessful");

        }
    }






  return (
    <Layout>
        <div className='register'>
                <h1>Reset Password</h1>
                <form onSubmit={handleSubmit}>
    
    <div className="register_item">
        <input type="email" className="form-control"  placeholder='Enter your Email'
        value ={email}
        onChange={(e)=>setEmail(e.target.value)}
        required

        />
    </div>
    <div className="register_item">
        <input type="text" className="form-control"  placeholder='Enter Your favourite color'
        
        value ={answer}
        onChange={(e)=>setAnswer(e.target.value)}
        required
        />
    </div>
    <div className="register_item">
        <input type="text" className="form-control"  placeholder='Enter Your new Password'
        
        value ={newPassword}
        onChange={(e)=>setNewpassword(e.target.value)}
        required
        />
    </div>
    
    
    <button type="submit" className="btn btn-primary" onClick={()=>handleSubmit}>Reset Password</button>
   
    </form>
        

            </div>
    </Layout>
  )
}

export default ForgotPassword