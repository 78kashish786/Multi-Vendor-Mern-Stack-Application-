import { useState, useEffect , useContext, createContext} from "react";
import axios from 'axios'

const buyContext = createContext();





const BuyProvider = ({children})=>{
   const [buy,setbuy]= useState([]) 

useEffect(()=>{
    let existingbuyItem = localStorage.getItem('buy')
    if(existingbuyItem) {
        setbuy(JSON.parse(existingbuyItem))
    }
},[])


return(
    <buyContext.Provider value = {[buy,setbuy]}>
        {children}
    </buyContext.Provider>
)
}


//custom hook

const useBuy = ()=> useContext(buyContext)


export {useBuy, BuyProvider};