import React , {useState} from 'react'
import Layout from './components/layout/Layout'
import { useSearch } from './context/Search'
import { useNavigate } from 'react-router-dom'
import SearchInput from './components/Form/SearchInput'
import { useCart } from './context/Cart'
import  toast  from 'react-hot-toast'

const Search = () => {

  const Navigate = useNavigate();
  const [values, setValues]= useSearch();
  const [cart,setCart] = useCart();
  const [pic, setPic] = useState(`https://plchldr.co/i/500x250?text=No_Image >`);
  return (
    <Layout>
      <div className='container mt-2'>
        <div className=''>
          <SearchInput/>

          <h1 className='text-center'>Search Results</h1>
          <h5 className='text-center'>{values?.result.length < 1 ?"NO PRODUCT FOUND" : ` ${values?.result.length} Products Found`}</h5>
          <div className='d-flex flex-wrap mt-2 w-100 favouritePane'>
              
              {values?.result.map((p) => (
              
                <div className="card m-2 imagesss" style={{ width: "18rem" }}>
                  <img
                    // src={pic? pic :`/api/v1/product/product-photo/${p._id}`}
                    src ={`/api/v1/product/product-photo/${p._id}`? `/api/v1/product/product-photo/${p._id}`:pic} alt ={pic}
                    className="card-img-top"
                    // alt={p.name}
                    height={"150px"}
                    width={"90px"}
                    object-fit ={"cover"}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description.substring(0,35)}</p>
                    <h3>Rs {p.price}</h3>
                    <button className="btn btn-primary  w-100 mb-1" onClick={()=>Navigate(`/product/${p.slug}`)}>View Details </button>
                    <button className="btn btn-secondary  w-100 mb-1"
                    
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
            ))}
            </div>
        </div>
      </div>
        
    </Layout>
  )
}

export default Search