import React, {useState,useEffect} from 'react'
import Layout from '../components/layout/Layout'
import { useCart } from '../context/Cart.js'
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import DropIn from 'braintree-web-drop-in-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useBuy } from '../context/buy';


const CartPage = () => {
  const [buy,setBuy]= useBuy({});
  const [cart, setCart]= useCart();
  const [auth, setAuth]= useAuth();
  const Navigate = useNavigate();
  const [clientToken, setClientToken] = useState("");
  const[instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);

  //remove item from cart
  const removeCartItem = async(pid)=>{
    try{
      let mycart =[...cart]
      let index = mycart.findIndex(item => item._id === pid)
      mycart.splice(index,1);
      setCart(mycart)
      localStorage.setItem('cart',JSON.stringify(mycart));

    }catch(err){
      console.log(err)
    }
  }

  //totoal price

  const TotalPrice = ()=>{
    try{
      let total = 0;
      cart?.map((item)=> {total = total + item.price})
      return total.toLocaleString("en-US", {
        style :"currency",
        currency :"INR",
      })

    }catch(err){
      console.log(err)
    }
  }

  //payment gateway Token 

  const getToken = async(req,res)=>{
    try{

      const {data} = await axios.get('/api/v1/product/braintree/token')
      setClientToken(data?.clientToken)

    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    getToken()

  },[auth?.token])


  const handlePayment = async()=>{
    try{
      setLoading(true)

      const {nonce} = await instance.requestPaymentMethod();
      const {data} = await axios.post("/api/v1/product/braintree/payment",{
        nonce, cart
      })
      setLoading(false)
      localStorage.removeItem('cart')
      setCart([])
      Navigate('/dashboard/user/orders')
      toast.success('Payment Completed Successfully')
    }catch(err){
      console.log(err)
      setLoading(false)
    }
  }

  return (
    <Layout>
      <div className='container'>
            <div className='row'>
                <div className='col-md-12 mt-3 border-5'>
                  <h1 className='text-center bg-light p-2 heading'>{` Hello ${auth?.token && auth?.user?.name}`}</h1>
                  
                </div>
                <h4 className='text-center'>
                 {
                  cart.length >0 ?
                  `You have ${cart.length} products in cart   ${auth?.token ? "" :"Please login to Checkout "}`
                  :"Your cart is empty  "
                 }
                </h4>
            </div>
            <div className='row'>
              <div className='col-md-7'>
                {
                  cart?.map((p)=>(
                    <div className='row p-4 mb-2 card flex-row'>
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
                          <h3>Rs{p.price}</h3>
                          <button className='btn btn-success ms-2'   
                           onClick={()=>{
                            setBuy([...buy, p])
                            localStorage.setItem('buy_now', JSON.stringify([...buy,p]))
                          toast("Lets buy this product")
                          Navigate("/buy-now")
                          }}
                          
                          >Buy Now</button>
                          <button className='btn btn-danger ms-2' onClick={()=>removeCartItem(p._id)}>Remove</button>

                        </div>
                      </div>
                  ))
                }
              </div>
              <div className='col-md-4 card ms-5 p-3 text-center  '>
                <h2>Cart Summary</h2> 
                <h5>Total || Payment || CheckOut</h5>
                <hr/>

                <h4>Total :{TotalPrice()} </h4> 
                {
                auth?.user?.address ? (
                  <div className='mb-3'>
                    <h4>Current Address</h4>
                    <h5>{auth?.user?.address}</h5>
                    <button className='btn btn-outline-warning' 
                    onClick={()=>Navigate("/dashboard/user/profile")}
                    >Update Address</button>
                    </div>
                ) : (
                  <div className='mb-3'>
                    {
                      auth?.token ? (
                        <button className='btn btn-outline-warning' 
                    onClick={()=>Navigate("/dashboard/user/profile")}
                    >Update Address</button>
                      ) : (
                        <button className='btn btn-outline-warning' 
                    onClick={()=>Navigate("/login",{
                      state:'/cart',
                    })}
                    >Pleas Login to Checkout</button>
                      ) 
                                       }
                  </div>
                ) 
                }
                <div className="mt-2">
              {!clientToken || !cart?.length ? (
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
                    className="btn btn-primary"
                    onClick={handlePayment}
                    disabled={loading || !instance || !auth?.user?.address}
                  >
                    {loading ? "Processing ...." : "Make Payment"}
                  </button>
                </>
              )}
            </div>
              </div>
            </div>
        </div>
    </Layout>  )
}

export default CartPage