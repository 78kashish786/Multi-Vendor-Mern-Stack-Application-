import React, { useEffect, useState } from 'react'

import Layout from '../../components/layout/Layout'
import UserMenu from '../../components/layout/UserMenu'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useAuth } from '../../context/auth'
import moment from 'moment'
const Orders = () => {

  const [orders,setOrders] = useState([])
  const [auth, setAuth]= useAuth();


  const getOrders = async()=>{
    try{
      const {data} = await axios.get('/api/v1/auth/orders')
      setOrders(data)

    }catch(err){
      console.log(err);
      toast.error('Something is wrong in getting Orders')
    }
  }

  useEffect(()=>{

    if(auth?.token) getOrders()
  },[auth?.token])

  return (
    <Layout>
        <div className='container-fluid m-4 p-4'>
          <div className='row'>
            <div className='col-md-3'>
              <UserMenu/>
            </div>
            <div className='col-md-9 p-3 ccc'>
                <div className='text-center'><div className='border-shadow'>
                  <h3 className='heading'>Order History</h3>
                          <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Status</th>
      <th scope="col">Buyer</th>
      <th scope="col">Date</th>
      <th scope="col">Payment</th>
      <th scope="col">Quantity</th>

    </tr>
  </thead>
                  {
                    orders.map((o,i)=>{
                      return (
                        
  <tbody>
    <tr>
      <th scope="row">{i+1}</th>
      <td>{o?.status}</td>
      <td>{o?.buyer?.name}</td>
      <td>{moment(o?.createdAt).fromNow()}</td>
      <td>{o?.payment.success ? "Success" :"Failed"}</td>
      <td>{o?.products?.length}</td>

    </tr>
    
  </tbody>   )
                    })
                  }
</table>
                
                          </div>
                   
                </div>
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default Orders