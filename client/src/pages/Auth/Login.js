import React, {useState} from 'react'
import Layout from '../../components/layout/Layout'
// import toast from 'react-hot-toast'
  import axios from 'axios'
  import { useNavigate, useLocation } from "react-router-dom"
  
  import { ToastContainer, toast } from 'react-toastify';
  import { useAuth } from '../../context/auth';


const Login = () => {

    
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [auth,setAuth] = useAuth();
    const location= useLocation();

    //form function 
    const handleSubmit  = async (e)=>{
        e.preventDefault();
        try{

            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, {
            email,password
            });
            if(res.data.success){
                toast.error(res.data.message);
                // alert(res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token:res.data.token
                })
                localStorage.setItem("auth", JSON.stringify(res.data))
                navigate(location.state || "/");
            }else{
                toast.error(res.data.message);
            }
        }catch(error){
            console.log(error)
            toast.error("Something went wrong");

        }
    }




  return (
    <Layout>
            <div className='register'>
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
    
    <div className="register_item">
        <input type="email" className="form-control"  placeholder='Enter your Email'
        value ={email}
        onChange={(e)=>setEmail(e.target.value)}
        required

        />
    </div>
    <div className="register_item">
        <input type="password" className="form-control"  placeholder='Enter Your Password'
        
        value ={password}
        onChange={(e)=>setPassword(e.target.value)}
        required
        />
    </div>
    
    <button type="submit" className="btn btn-primary" onClick={()=>handleSubmit}>LOGIN</button>
    <button type="button" className="btn btn-danger mt-2" onClick={()=>{navigate('/forgot-password')}}>Forgot Password ?</button>
    </form>
        

            </div>
    </Layout>
  )
}

export default Login;