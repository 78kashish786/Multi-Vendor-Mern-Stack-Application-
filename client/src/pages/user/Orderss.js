import React, { useState, useEffect } from "react";
import axios from "axios";

import Layout from "../../components/layout/Layout";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";
import UserMenu from "../../components/layout/UserMenu";
const { Option } = Select;

const Orderss = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "deliverd",
    "cancel",
  ]);
  const [changeStatus, setCHangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/all-orders/{}");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(`/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout >
        <div className='container-fluid m-4 p-4'>
      <div className="row dashboard">
        <div className="col-md-3">
          <UserMenu />
        </div>
        <div className="col-md-8 ccc">
          <h3 className="text-center heading">All Orders</h3>
          <h2>Attention</h2>
          {orders?.map((o, i) => {
            return (
              <div className="border shadow">
                
                <div className="container ">
                  {o?.products?.map((p, i) => (
                    <div className="row mb-2 p-3 card flex-row" key={p._id}>
                      <div className="col-md-4">
                        <img
                          src={`/api/v1/product/product-photo/${p._id}`}
                          className="card-img-top"
                          alt={p.name}
                          width="100px"
                          height={"100px"}
                        />
                      </div>
                      <div className="col-md-8">
                        <p>{p.name}</p>
                        <p>{p.description.substring(0, 30)}</p>
                        <p>Price : {p.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      </div>
    </Layout>
  );
};

export default Orderss