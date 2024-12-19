import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import { useBuy } from '../context/buy';
import { toast } from 'react-hot-toast';
import { useCart } from '../context/Cart';

const ProductDetails = () => {

    const params = useParams();
    const [product,setProduct] = useState({});
    const[related,setrelated]= useState([]);
    const [buy, setBuy] = useBuy();
    const Navigate= useNavigate();
    const [cart,setCart]= useCart();
    const getProduct = async()=>{
        try{
            const {data} = await axios.get( `/api/v1/product/get-product/${params.slug}`)
            setProduct(data?.product)
            getSimilarProducts(data?.product._id , data?.product.category._id  )

        }catch(err){
            console.log(err)
        }
    }
    const getSimilarProducts = async(pid,cid)=>{
        try{

            const {data} = await axios.get(`/api/v1/product/related-product/${pid}/${cid}`);
            setrelated(data?.products);

        }catch(err){
            console.log(err);

        }

    }
    useEffect(()=>{
        if(params?.slug) getProduct();

    },[])


    const handleView = async(id)=>{
      Navigate(`/product/${id}`)
      window.location.reload();
    }



  return (
    <Layout>
        <div className='row container mt-3 productDetail'>
            <div className='col-md-6 imageDetail'>
                <img src ={`/api/v1/product/product-photo/${product._id}`}
                className='card-img-top detailIMG'
                alt ={product.name}
                height ={"300px"}
                width ={"350px"}

                />
            </div>
            <div className='col-md-6 detailsbox'>
               <h1>Product Details</h1> 
               <div className='details'>
                    
                    <h3> {product.name}</h3>
                    <h5>Description :</h5>  
                    {product.description}
                    <br/>you
                    <h3 className='heading '>${product.price}</h3>
                    
                    Category<h6 className="tag">{product?.category?.name}</h6>
                   
                </div>
                <div className='details_button'>
                <button className='btn btn-success ms-2 w-25'
                onClick={()=>{
                    setBuy([...buy, product])
                    localStorage.setItem('buy_now', JSON.stringify([...buy, product]))
                      toast('Lets buy')
                      Navigate("/buy-now");

                }}
                >Buy Now</button>
                <button className='btn btn-danger ms-2 w-25'>Add to Cart</button>

                    </div>

         
        </div>
        <hr/>

        <div  className='row container text-center'>
            <h3>Similar Products</h3>

            {
                related.length <1 && (<h3 className='text-center'>No Similar Products Found</h3>) 
            }
            
{related?.map((p) => (
                <div className="card m-2 imagesss" style={{ width: "18rem" }}>
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    height={"150px"}
                    width={"90px"}
                    object-fit ={"cover"}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description.substring(0,35)}</p>
                    <h3>$ {p.price}</h3>
                    <button className="btn btn-primary ms-1  " onClick={()=>handleView(p.slug)}>View  </button>
                    <button className="btn btn-secondary ms-1"
                    onClick={ ()=>{
                        setCart([...cart, p])
                        localStorage.setItem('cart', JSON.stringify([...cart, p]))
                        toast("Prodcut added to Cart")
                        Navigate("/cart")
                      }
                    }
                    >Add to Cart</button>

                  </div>
                </div>
              // </Link
            ))}





        </div>
        </div>
    </Layout>
  )
}

export default ProductDetails