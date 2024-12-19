import React from 'react'
import Layout from '../components/layout/Layout'
import useCategory from '../hooks/useCategory'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
const Categories = () => {

    const categories= useCategory();
  

  return (
    <Layout>
        <div className='row w-100' justiy-content-center align-items-center >
        <h1 className='text-center heading '>Categories</h1>\
        <h5 className='text-center'>Choose a Category </h5>
           
            <div className='col-md-5'>
            <ul className='row w-100 category_box  '>
            {categories.map((c)=>(
                <>
                   
                        <Link to ={`/category/${c.slug}`}>
                        <li className='list_category'>  
                        {c.name}</li>
                        </Link>
                    
                </>
            ))}</ul>
            </div>
            <div className='col-md-7'>
              <div className='container m-4 p-2'>
                <img
                 height={"650px"}
                 width={"820px"}
                 object-fit ={"cover"}
                src ="https://cdn5.vectorstock.com/i/1000x1000/94/79/colorful-poster-shopping-online-with-bag-vector-15209479.jpg" alt ="#" / >

              </div>
            </div>
           
            
        </div>
 
    </Layout>
  )
}

export default Categories