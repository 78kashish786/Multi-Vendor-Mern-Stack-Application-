import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/Layout'
import useCategory from '../hooks/useCategory'
import { useParams, useNavigate , Link} from 'react-router-dom';
import axios from 'axios';
import { useBuy } from '../context/buy';
import { useFavourite } from '../context/favourites';
import { toast } from 'react-hot-toast';
import { useCart } from '../context/Cart';
import { Spinner } from 'react-bootstrap';
const CategoriesProduct = () => {

    // const categories= useCategory();
    const params = useParams();
    const[products,setProducts]= useState([])
    const[category,setCategory]= useState([])
    const Navigate = useNavigate();
    const [cart,setCart]= useCart();
    const [favourite,setFavourite]=useFavourite();
    const [buy,setBuy]= useBuy({});
    const [loading, setLoading] = useState(false);


  
    
    // const CategoryProduct  = async()=>{
    //   setLoading(true);
    //     try{
    //         const {data} =  await axios.get(`/api/v1/product/product-category/${params?.slug}`)
    //         setProducts(data?.products)
    //         setCategory(data?.category)
    //         setLoading(false)

    //     }catch(err){
    //         console.log(err);
    //         toast("NOT")
    //     }
    // }

    const getProdByCat = async()=>{
      setLoading(true);
        try{

            const {data} = await axios.get(`/api/v1/product/product-category/${params.slug}`)
            setProducts(data?.product)
            setCategory(data?.category)
            setLoading(false);

        }catch(err){
            console.log(err)
            setLoading(false)
        }
    }




    useEffect(()=>{
       if(params?.slug) getProdByCat();
    },[params?.slug])

    // const renderUser =  () 

  return (
    <Layout>

            
        <div className='row heading text-center '>
            <h1>Category : {category?.name}</h1>
            <h4>{products.length >0 ?`${products?.length} Products found`: "No Products Found" }</h4>
        </div>

        <div className='row d-flex flex-wrap justify-content-center align-items-center w-100'>
            {
                products?.length >0 ? (
                    products?.map((p)=>(
                        <div className='card ms-2 imagesss' style={{width:"18rem"}}>
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
                        <h3>Rs {p.price}</h3>
                        <button className="btn btn-primary  w-100  mb-1 "
                        onClick={()=>{
                          setBuy([...buy, p])
                          localStorage.setItem('buy_now', JSON.stringify([...buy,p]))
                        toast("Lets buy this product")
                        Navigate("/buy-now")
                        }}
                        >Buy  </button>
                        
                        <button className="btn btn-secondary  w-100 mb-1" 
                        onClick={ ()=>{
                          setCart([...cart, p])
                          localStorage.setItem('cart', JSON.stringify([...cart, p]))
                          toast("Prodcut added to Cart")
                          Navigate("/cart")
                        }
    
                        }>Add to Cart</button>
    
                      
                      <button className="btn btn-danger  w-100 mb-1" 
                        onClick={ ()=>{
                          setFavourite([...favourite, p])
                          localStorage.setItem('Favourite', JSON.stringify([...favourite, p]))
                          toast("Prodcut added to Favourite")
                        }
    
                        }>add to fav</button>
                      </div>
                        </div>
                    ))
                ):(
                    <div className='pnf'>
      <span>OOPS! No Product found </span>
      <Link to ="/" className="pnf_button">GO BACK!</Link>
    </div>
                )
            }

        </div>

        

    </Layout>
  )
}

export default CategoriesProduct