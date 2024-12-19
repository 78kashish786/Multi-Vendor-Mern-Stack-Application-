import React, {useState,useEffect} from 'react'
import Layout from '../components/layout/Layout'
import { useAuth } from '../context/auth'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Checkbox, Radio } from 'antd';
import { toast } from 'react-hot-toast';
import { Prices } from '../components/Prices';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/Cart';
import SearchInput from '../components/Form/SearchInput';
import { useFavourite } from '../context/favourites';
import { useBuy } from '../context/buy';
import { Carousel } from 'antd'
import Carasouel from './Carasouel';

const HomePage = () => {

  const [auth,setAuth]= useAuth();
  const [products, setProducts]= useState([]);
  const [categories, setCategories]= useState([]);
  const [checked,setChecked]= useState([]);
  const [radio,setRadio]= useState([]);
  const [total,setTotal]= useState(0);
  const [page,setPage]= useState(1);
  const Navigate = useNavigate();
  const [cart,setCart]= useCart();
  const [favourite,setFavourite]=useFavourite();
  const [buy,setBuy]= useBuy({});

  //getting total count
  const getTotal = async(req,res)=>{
    try{

      const {data} = await axios.get("/api/v1/product/product-count")
      setTotal(data?.total);
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{

    getTotal();

  },[])

//grt aLll Products

const getAllProducts = async()=>{
  try{
    const {data} = await axios.get('/api/v1/product/get-product')
    setProducts(data.products);

  }catch(err){
    console.log(err)
  }
}

useEffect(()=>{
getAllProducts()
},[])

//get all categories

const getAllACategories = async()=>{
  try{

    const {data} = await axios.get("/api/v1/category/get-category")
    if(data.success){
      setCategories(data.category);
      // toast.success("Categories extracted")
    }
  }catch(err){
    console.log(err)
    toast.error("Something went wrong in getting categories")

  }

}


useEffect(()=>{
  if(!checked.length || !radio.length){
    getAllACategories();
  };

},[checked.length || radio.length])

useEffect(()=>{
  if(checked.length || radio.length){
    filterProducts();
  }
},[checked, radio])

const handleFilter = (value,id)=>{
  let all =[...checked]
  if(value){
    all.push(id);
  }else{
    all= all.filter(c=> c!==id)
  }
  setChecked(all)

}

//get Filtered products

const filterProducts = async()=>{
  try{

    const {data} = await axios.post(`/api/v1/product/product-filters/`, {checked,radio})
    setProducts(data?.products)

  }catch(err){
    console.log(err);
  }
}

// const filterReset = ()=>{
//   setChecked([])
//   setRadio([])
// }


  return (
    <Layout>
      {/* <Carousel autoplay>
    <div className='container'>
      <div  className='container ms-5 p-5 w-100'>
        <div className='carasouel'>
          <h1>Hello</h1>
        </div>
      </div>
    </div>
    <div>
    {/* <img src ="https://img.freepik.com/free-psd/sale-banner-template_24972-824.jpg?w=2000"/> */}
    {/* </div>
  </Carousel> */} 
        {/* <Carasouel/> */}
        


        <div className='row mt-5'>
          <div className='col-md-3 ms-4 '>
            <div className='filter_pane'>
            <h2 className='text-center'>Filters By Category</h2>
            <div className='d-flex flex-column filter_checkbox '>
            {
              categories?.map((c)=>(
                <Checkbox key={c._id} 
                onChange={(e)=>handleFilter(e.target.checked,c._id)}
                >
                  {
                  c.name

                  }
                </Checkbox>
              ))
            }
            {/* Price fiter */}
            </div>
            <h2 className='text-center'>Filters By Price</h2>
            <div className='d-flex flex-column filter_checkbox '>
           
              <Radio.Group onChange={(e)=>setRadio(e.target.value)}>
                {Prices?.map((p)=>(
                 <div key={p._id}>
                  <Radio value ={p.array} >{p.name}</Radio>

                 </div>
                ))}
              </Radio.Group>
              
            
            </div>
            <div className='d-flex flex-column filter_checkbox '>
              <button className='btn btn-outline reset' onClick= {()=>window.location.reload()}>Reset Filters</button>
            </div>

            </div>
          </div>
          <div className='col-md-9 product_pane ms-5'>
           
            <div className='col-md-9'>
              <h2 className='p-2 ms-2 '>Welcome {auth?.user?.name}</h2>
             
              <SearchInput/> 
              <h4 className='heading'>Recommended For You</h4>

            </div>
           
            <div className='d-flex flex-wrap'>
              
              {products?.map((p) => (
              
                <div className="card m-2 imagesss" style={{ width: "18rem" }}>
                  <Link
                key={p._id}
                to={`/product/${p.slug}`}
                className="product-link"
              >
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    height={"250px"}
                    width={"120px"}
                    object-fit ={"cover"}
                  /></Link>
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description.substring(0,35)}</p>
                    <h3 >Rs{p.price}</h3>
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

                    }>Add to favourite</button>
                  </div>
                </div>
                // </Link>
            ))}
            </div>
          </div>



        </div>

    </Layout>
  )
}

export default HomePage