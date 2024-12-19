import { useState, useEffect , useContext, createContext} from "react";
import axios from 'axios'

const cartContext = createContext();





const CartProvider = ({children})=>{
   const [cart,setcart]= useState([]) 

useEffect(()=>{
    let existingCartItem = localStorage.getItem('cart')
    if(existingCartItem) {
        setcart(JSON.parse(existingCartItem))
    }
},[])


return(
    <cartContext.Provider value = {[cart,setcart]}>
        {children}
    </cartContext.Provider>
)
}


//custom hook

const useCart = ()=> useContext(cartContext)


export {useCart, CartProvider};