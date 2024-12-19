import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import DropIn from 'braintree-web-drop-in-react'
import { useBuy } from '../context/buy'
import axios from 'axios'
import { useAuth } from '../context/auth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
const Buynow = () => {

    const [buy, setBuy]= useBuy();
    const [clientToken, setClientToken]= useState("")
    const[instance, setInstance] = useState("");
    const [auth,setAuth]= useAuth();
    const [loading,setLoading]= useState(false); 
    const Navigate = useNavigate();


    const Reload = async()=>{
      if(window.location.reload){
        localStorage.removeItem('buy_now')
      }
    }


    const getToken = async() =>{
        try{

            const {data}= await axios.get("/api/v1/product/braintree/token")
            setClientToken(data?.clientToken)
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        getToken();
    },[])


    const handleRemove =  async(rid)=>{
        try{

            const remBuy = [...buy]
            let index = remBuy.findIndex( item => item._id == rid)
            remBuy.splice(index, 1);
            setBuy(remBuy);
            localStorage.removeItem('buy_now', JSON.stringify(remBuy))

        }catch(err){
            console.log(err)
        }
    }

    
  const handlePayment = async()=>{
    try{
      setLoading(true)

      const {nonce} = await instance.requestPaymentMethod();
      const {data} = await axios.post("/api/v1/product/braintree/payment",{
        nonce, buy
      })
      setLoading(false)
      localStorage.removeItem('buy_now')
      setBuy([])
      Navigate('/dashboard/user/orders')
      toast.success('Payment Completed Successfully')
    }catch(err){
      console.log(err)
      setLoading(false)
    }
  }


    


  return (
    <Layout>
      <div className='row m-5 p-5 d-flex flex-wrap justify-content-center'>
        <h3 className='heading text-center'>{buy[0]?.name}</h3>
      </div>
        <div className='row m-5 p-5 d-flex flex-wrap justify-content-center'>
            
            <div className='col-md-5'>
            {
                  buy?.map((p)=>(
                    <div className='row p-3 mb-2 card flex-row'>
                      <div className='col-md-4'>

                    <img src ={`/api/v1/product/product-photo/${p._id}`}
                className='card-img-top detailIMG'
                alt ={p.name}
                height ={"200px"}
                width ={"300px"}

                />
                
                        </div>
                        <div className='col-md-8'>
                          <h1 >{p.name}</h1>
                          <p>{p.description.substring(0,30)}</p>
                          <h3>${p.price}</h3>
                          <button className='btn btn-danger ms-2'
                          onClick={()=>handleRemove(p._id)}
                          
                          >Remove</button>
                          
                        </div>
                      </div>
                  ))
                }

            </div>
            <div className='col-md-5'>
            {!clientToken || !buy?.length ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />

                  <button
                    className="btn btn-primary w-100"
                    onClick={handlePayment}
                    disabled={loading || !instance || !auth?.user?.address}
                  >
                    {loading ? "Processing ...." : "Make Payment"}
                  </button>
                </>
              )}
            </div>
        </div>
    </Layout>
  )
}

export default Buynow
