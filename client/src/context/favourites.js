import { useState, useEffect , useContext, createContext} from "react";
import axios from 'axios'

const FavouriteContext = createContext();





const FavouriteProvider = ({children})=>{
   const [favourite,setFavourite]= useState([]) 

useEffect(()=>{
    let existingFavouriteItem = localStorage.getItem('Favourite')
    if(existingFavouriteItem) {
        setFavourite(JSON.parse(existingFavouriteItem))
    }
},[])


return(
    <FavouriteContext.Provider value = {[favourite,setFavourite]}>
        {children}
    </FavouriteContext.Provider>
)
}


//custom hook

const useFavourite = ()=> useContext(FavouriteContext)


export {useFavourite, FavouriteProvider};