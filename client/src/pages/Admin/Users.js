import React, { useEffect, useState } from 'react'
import AdminMenu from '../../components/layout/AdminMenu'
import Layout from '../../components/layout/Layout'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Users = () => {

  const [users, setUsers] = useState([]);
  const [Admin, setAdmin] = useState(false);
  const Navigate = useNavigate();

  const getUsers = async(req,res) =>{
    try{

      const {data} = await axios.get("/api/v1/auth/users")
      if(data?.success){
        setUsers(data.users)
        toast.success(data.message)

      }else{
        toast.error(data.message)
      }

    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    getUsers();

  },[])

 
const AdminHandle = async()=>{

}



  return (
    <Layout>
        <div className='container-fluid m-4 p-4 '>
          <div className='row'>
            <div className='col-md-3'>
              <AdminMenu/>
            </div>
            <div className='col-md-9 p-3 '>
              <h1>All Users</h1>
              <div>
                {/* <button className='btn btn-primary ms-2' onCLick={AdminHandle}>Admin</button>
                <button className='btn btn-danger ms-2'>User</button> */}

              </div>
            <table class="table ">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope='col'>Role</th>
                  <th scope="col">Phone</th>
                  <th scope ="col">Address</th>
                  <th scope ="col">Created At</th>

                  <th scope="col"></th>


                </tr>
              </thead> 
              { users?.map((p) => (
              <tbody>
                <tr>
                  <td>{p.name}</td>
                  <td>{p.email}</td>
                  <td>{p.role === 1?<h6 style={{color:"red"}}>Admin</h6>:<h6 style={{color:"green"}}>User</h6>}</td>
                  <td>{p.phone}</td>
                  <td>{p.address.substring(0,20)}</td>
                  <td>{p.createdAt}</td>
                  {/* <td><button className='btn btn-primary'
                  onCLick={()=>{Navigate('/email')}}
                  >Send E-mail</button></td> */}
                
                </tr>
                
              </tbody>
                ))}
            </table>
                
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default Users