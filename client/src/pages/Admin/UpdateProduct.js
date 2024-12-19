import React, { useState, useEffect } from "react";
import Layout from "./../../components/layout/Layout";
import AdminMenu from "./../../components/layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [ID, setId] = useState("");

  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);
  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //create product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      const { data } = axios.put(
        `/api/v1/product/update-product/${ID}`,
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  //delete a product
  const handleDelete = async () => {
    try {
      let answer = window.prompt("Type Yes to delete this product ? ");
      if (!answer) return;
      const { data } = await axios.delete(
        `/api/v1/product/delete-product/${ID}`
      );
      toast.success("Product Deleted Succfully");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    
 
<Layout>
        <div className='container-fluid m-4 p-4'>
          <div className='row'>
            <div className='col-md-3'>
              <AdminMenu/>
            </div>
            <div className='col-md-9 p-3 '>
              <h2>Update Product</h2>
                <div className='m-1 w-75'>
                  <Select
                  bordered={false}
                  placeholder="Select a Category"
                  size="large"
                  showSearch
                  className='form-select mb-3'
                  onChange={(value)=>{setCategory(value)}}
                  value ={category}
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
                    {photo ? (
                      <div className='text-center'>
                        <img src={URL.createObjectURL(photo)} alt="Product" height={"200px"}  className='im img-responive' value={photo}/>

                        </div>
                    ) : (
                        <div className='text-center'>
                        <img src={`/api/v1/product/product-photo/${ID}`} alt="Product" height={"200px"}  className='im img-responive' value={photo}/>

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
                  value= {shipping ?"Yes":"No"}
                  >
                    <Option value ="0" >No</Option>
                    <Option value ="1" >Yes</Option>


                  </Select>
                </div>
                <div className='mb-3 w-100'>
                  <button className='btn btn-primary ' onClick={handleUpdate}>Update Product</button>
                  <button className='btn btn-danger ms-2 ' onClick={handleDelete}>Delete Product</button>

                </div>

            </div>
          </div>
        </div>
    </Layout>
     );
};

export default UpdateProduct;
