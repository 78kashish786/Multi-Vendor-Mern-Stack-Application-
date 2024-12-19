import React, {useState, useEffect} from 'react'

import AdminMenu from '../../components/layout/AdminMenu'
import Layout from '../../components/layout/Layout'
import { Select } from 'antd';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const {Option}= Select;




const CreateProduct = () => {

  //multiple States
  const [categories, setCategories]= useState([]);
  const [category, setCategory]= useState("");
  const [photo, setPhoto] = useState("")
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [quantity, setQuantity] = useState("")
  const [shipping, setShipping] = useState("")
  const Navigate = useNavigate();

  
//get all categories

const getAllACategories = async()=>{
  try{

    const {data} = await axios.get("/api/v1/category/get-category")
    if(data?.success){
      setCategories(data?.category);
      toast.success("Categories extracted")
    }
  }catch(err){
    console.log(err)
    toast.error("Something went wrong in getting categories")

  }

}

useEffect(()=>{
  getAllACategories()
  return () => {
    console.log('This will be logged on unmount');
  };
},[])

//create product function
const handleCreate = async(e)=>{
  e.preventDefault();
  try{
    const productData = new FormData();
    productData.append("name", name)
    productData.append("description", description)
    productData.append("price", price)
    productData.append("quantity", quantity)
    productData.append("photo", photo)
    productData.append("category", category)
    // productData.append("name", name)

    const {data} = await axios.post("/api/v1/product/create-product", productData )
    if(data?.success){
      toast.error(data?.message)
    }else{
     toast.success("Product Created Successfully")
      Navigate("/dashboard/admin/products")

    }

  }catch(err){
    console.log(err);
    toast.error("Something went wrong")
  }



}


  return (
    <Layout>
        <div className='container-fluid m-4 p-4'>
          <div className='row'>
            <div className='col-md-3'>
              <AdminMenu/>
            </div>
            <div className='col-md-9 p-3  '>
            <h2>Create Product</h2>
                <div className='m-1 w-75'>
                  <Select
                  bordered={false}
                  placeholder="Select a Category"
                  size="large"
                  showSearch
                  className='form-select mb-3'
                  onChange={(value)=>{setCategory(value)}}
                  >
                    {
                      categories.map((c)=>(
                        <>
                        <Option key ={c._id}  value={c._id }>{c.name}</Option>
                        </>
                      ))
                    }

                  </Select>
                  <div className='mb-3'>
                    <label className='btn btn-success btn-outline col-md-11'>
                      {photo ? photo.name :" Upload Image" }
                      <input type='file' name ="photo"  accept='image/*' onChange={(e)=>{setPhoto(e.target.files[0])} } 
                      hidden
                      />
                    </label>
                    <button className='btn btn-danger ms-2 md-2' onClick={()=>{setPhoto("")}} >Edit </button>

                  </div>
                  <div className='mb-3'>
                    {photo &&(
                      <div className='text-center'>
                        <img src={URL.createObjectURL(photo)} alt="Product" height={"200px"}  className='im img-responive'/>

                        </div>
                    )}

                  </div>
                  {/* name */}
                  <div className='mb-3 '>
                    <input
                    type ="text"
                    value={name}
                    placeholder="Product Name"
                    className="form-control w-100"
                    onChange={(e)=>{setName(e.target.value)}}
                    />

                  </div>

                  {/* Description */}

                  <div className='mb-3 '>
                    <textarea
                    type ="text"
                    value={description}
                    placeholder="Product Description"
                    className="form-control w-100"
                    onChange={(e)=>{setDescription(e.target.value)}}
                    />

                  </div>
                  {/* Price */}


                  <div className='mb-3 '>
                    <input
                    type ="text"
                    value={price}
                    placeholder="Product price"
                    className="form-control w-100"
                    onChange={(e)=>{setPrice(e.target.value)}}
                    />

                  </div>

                  <div className='mb-3 '>
                    <input
                    type ="text"
                    value={quantity}
                    placeholder="Quantity"
                    className="form-control w-100"
                    onChange={(e)=>{setQuantity(e.target.value)}}
                    />

                  </div>

                  {/* Shipping */}
                  <Select
                  bordered={false}
                  placeholder="Select Shipping"
                  size="large"
                  showSearch
                  className='form-select mb-3'
                  onChange={(value)=>{setShipping(value)}}
                  >
                    <Option value ="0" >No</Option>
                    <Option value ="1" >Yes</Option>


                  </Select>
                </div>
                <div className='mb-3 w-100'>
                  <button className='btn btn-primary ' onClick={handleCreate}>Create Product</button>
                </div>
                

            </div>
          </div>
        </div>
    </Layout>
  )
}

export default CreateProduct