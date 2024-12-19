import React from 'react'
import { useSearch } from '../../context/Search'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const SearchInput = () => {

    const [values,setValues] = useSearch();
    const Navigate  = useNavigate();


    const handleSubmit = async(e)=>{
        try{
            e.preventDefault();
            const {data} = await axios.get(`/api/v1/product/search/${values.keyword}`)
            setValues({...values, result:data})
            Navigate("/search")

        }catch(err){
            console.log(err);
        }
    }

  return (
    <div>
        <form className="d-flex w-100" role="search" onSubmit={handleSubmit}>
        <input className="form-control ms-1 w-90" type="search" placeholder="Search"value ={values.keyword} 
        onChange={(e)=>setValues({...values, keyword: e.target.value})}
        />
        <button className="btn btn-primary h-180  ms-1   w-50" type="submit">Search</button>
      </form>
    </div>
  )
}

export default SearchInput