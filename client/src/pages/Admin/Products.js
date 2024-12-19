import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/layout/AdminMenu.js";
import Layout from "./../../components/layout/Layout.js";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {Modal} from 'antd'

const Products = () => {
  const [products, setProducts] = useState([]);
  const Navigate = useNavigate();

  //getall products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Someething Went Wrong");
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);

    const handleDelete = async (ID) => {
    try {
      let answer = window.prompt("Type Yes to delete this product ? ");
      if (!answer) return;
      const { data } = await axios.delete(
        `/api/v1/product/delete-product/${ID}`
      );
      toast.success("Product Deleted Succfully");
      // navigate("/dashboard/admin/products");
      getAllProducts();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="row dashboard p-5">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9  ">
          <h2 className="">All Products List</h2>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <Link
                key={p._id}
                to={`/dashboard/admin/product/${p.slug}`}
                className="product-link"
              >
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    height={"250px"}
                    width={"100px"}
                    object-fit ={"cover"}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description.substring(0,35)}</p>
                    <h5>{p.price}</h5>
                    <button className="btn btn-success ms-2" onClick={()=>Navigate(`/dashboard/admin/product/${p.slug}`)}>Update </button>
                    <button className="btn btn-danger ms-2" onClick={()=>handleDelete(p._id)}>Delete</button>

                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;