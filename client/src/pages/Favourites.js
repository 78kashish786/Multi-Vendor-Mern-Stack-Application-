import React from 'react'
import Layout from '../components/layout/Layout'
import { useFavourite } from '../context/favourites'
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useCart } from '../context/Cart';


const Favourites = () => {
    const [favourite,setFavourite]= useFavourite();
    const [auth,setAuth]= useAuth();
    const[cart,setCart]= useCart();
    const Navigate = useNavigate();

    const handleRemove =  async(fid) =>{
        try{
            let myfav = [...favourite]
            let index = myfav.findIndex(item =>item._id === fid)
            myfav.splice(index,1)
            setFavourite(myfav)
            localStorage.setItem('Favourite', JSON.stringify(myfav));

        }catch(err){
            console.log(err);
        }
    }


  return (
    <Layout>
        <div className='row m-3 p-3    '>
            <div className='text-center'>
            <h1 className='heading'>Favourite Products</h1>  
            </div>
            <h3 className='text-center '>You have {favourite.length} products in your favourite's List.</h3>
            <div className='col-md-12 p-5 m-3  d-flex  flex-wrap'>
              
                
                {favourite?.map((p) => (
              
                <div className="card m-4 imagesss" style={{ width: "18rem" }}>
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    height={"250px"}
                    width={"90px"}
                    object-fit ={"cover"}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description.substring(0,35)}</p>
                    <h3 >Rs {p.price}</h3>
                    <button className="btn btn-primary ms-1 mb-1 w-100  " onClick={()=>Navigate(`/product/${p.slug}`)}>View Details </button>
                    
                    <button className="btn btn-secondary ms-1 mb-1 w-100" 
                    onClick={ ()=>{
                      setCart([...cart, p])
                      localStorage.setItem('cart', JSON.stringify([...cart, p]))
                      toast("Prodcut added to Cart")
                    }

                    }>Add to Cart</button>
                    <button className='btn btn-danger ms-1 w-100 'onClick={()=>handleRemove(p._id)}>Remove</button>

                  </div>
                </div>
               
            ))}

            </div>
        </div>
    </Layout>
  )
}

export default Favourites