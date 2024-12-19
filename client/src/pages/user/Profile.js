import React, { useState, useEffect } from 'react'
import Layout from '../../components/layout/Layout'
import UserMenu from '../../components/layout/UserMenu'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'
import axios from 'axios'
import { useAuth } from '../../context/auth';


  


const Profile = () => {

  const [auth,setAuth]= useAuth();
  const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [answer, setAnswer] = useState('');

    const navigate = useNavigate();

    useEffect (()=>{
      const {name,email,phone,password,address}= auth.user
      setName(name)
      setEmail(email)
      setPhone(phone)
      setPassword(password)
      setAddress(address)
 

    },[auth.user])
    //form function 
    const handleSubmit  = async (e)=>{
      e.preventDefault();
      try{

          const {data} = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/profile`, {
              name,email,password,phone,address
          });
          if(data?.error){
            toast.error(data?.error);
          }else{
            setAuth({...auth, user: data?.updatedUser})
            let ls = localStorage.getItem('auth')
            ls= JSON.parse(ls)
            ls.user = data.updatedUser
            localStorage.setItem('auth', JSON.stringify(ls))
            toast.success("Profile Updated Scuccessfully")

          }
      }catch(error){
          console.log(error)
          toast.error("Something went wrong");

      }
  }




  return (
    <Layout>
        <div className='container-fluid m-4 p-4'>
          <div className='row'>
            <div className='col-md-3'>
              <UserMenu/>
            </div>
            <div className='col-md-9 p-0 ccc'>
            <div className='p-3'>
                <h3 className='heading'>User Profile</h3>
                <form onSubmit={handleSubmit}>
    <div className="register_item">
        <input type="text" className="form-control w-75 mt-3"  placeholder='Enter Your Name'
        value ={name}
        onChange={(e)=>setName(e.target.value)}
       

        />
    </div>
    <div className="register_item">
        <input type="email" className="form-control w-75 mt-3"  placeholder='Enter your Email'
        value ={email}
        onChange={(e)=>setEmail(e.target.value)}
        required
        disabled

        />
    </div>
    <div className="register_item">
        <input type="text" className="form-control w-75 mt-3"  placeholder='Enter Your Password'
        
        value ={password}
        onChange={(e)=>setPassword(e.target.value)}
       
        />
    </div>

    <div className="register_item">
        <input type="text" className="form-control w-75 mt-3"  placeholder='Enter Your Phone'
        value ={phone}
        onChange={(e)=>setPhone(e.target.value)}

        />
    </div>
    <div className="register_item">
        <input type="text" className="form-control w-75 mt-3"  placeholder='Enter Your Address'
        value ={address}
        onChange={(e)=>setAddress(e.target.value)}

        />
    </div>
    
    <button type="submit" className="btn btn-primary" onClick={()=>handleSubmit}>UPDATE </button>
    </form>
        

            </div>
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default Profile