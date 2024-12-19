import React, {useState} from 'react'
import Layout from '../../components/layout/Layout'
// import toast from 'react-hot-toast'

import { ToastContainer, toast } from 'react-toastify';
  import axios from 'axios'
  import { useNavigate } from "react-router-dom"
  


const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [answer, setAnswer] = useState('');

    const navigate = useNavigate();


    //form function 
    const handleSubmit  = async (e)=>{
        e.preventDefault();
        try{

            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`, {
                name,email,password,phone,address,answer
            });
            if(res.data.success){
                toast.success(res.data.message);
                // alert(res.data.message);
                navigate("/login");
            }else{
                toast(res.data.message);
            }
        }catch(error){
            console.log(error)
            toast.error("Something went wrong");

        }
    }




  return (
    <Layout>
            <div className='register'>
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
    <div className="register_item">
        <input type="text" className="form-control"  placeholder='Enter Your Name'
        value ={name}
        onChange={(e)=>setName(e.target.value)}
        required
        />
    </div>
    <div className="register_item">
        <input type="email" className="form-control"  placeholder='Enter your Email'
        value ={email}
        onChange={(e)=>setEmail(e.target.value)}
        required

        />
    </div>
    <div className="register_item">
        <input type="text" className="form-control"  placeholder='Enter Your Password'
        
        value ={password}
        onChange={(e)=>setPassword(e.target.value)}
        required
        />
    </div>
    <div className="register_item">
        <input type="text" className="form-control"  placeholder='Enter Your Phone'
        value ={phone}
        onChange={(e)=>setPhone(e.target.value)}
        required
        />
    </div>
    <div className="register_item">
        <input type="text" className="form-control"  placeholder='Enter Your Address'
        value ={address}
        onChange={(e)=>setAddress(e.target.value)}
        required
        />
    </div>
    <div className="register_item">
        <input type="text" className="form-control"  placeholder='favourite color'
        value ={answer}
        onChange={(e)=>setAnswer(e.target.value)}
        required
        />
    </div>
    
    <button type="submit" className="btn btn-primary" onClick={()=>handleSubmit}>Submit</button>
    </form>
        

            </div>
    </Layout>
  )
}

export default Register