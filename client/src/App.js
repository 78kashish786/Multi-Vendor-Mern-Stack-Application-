import {Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage';
import About from './pages/About.js';
import Contact from './pages/Contact.js';
import PageNotFound from './pages/PageNotFound.js';
import Policy from './pages/Policy';
import Register from './pages/Auth/Register';

import Login from './pages/Auth/Login';
import Dashboard from "./pages/user/Dashboard"
import PrivateRoute from './components/Routes/Private';
import ForgotPassword from './pages/Auth/ForgotPassword';
import AdminRoute from './components/Routes/AdminRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import Users from './pages/Admin/Users';
import Profile from './pages/user/Profile';
import Orders from './pages/user/Orders';
import Products from './pages/Admin/Products';
import UpdateProduct from './pages/Admin/UpdateProduct';
import Search from './Search';
import ProductDetails from './pages/ProductDetails';
import Categories from './pages/Categories';
import CategoriesProduct from './pages/CategoriesProduct';
import CartPage from './pages/CartPage';
import AdminOrders from './pages/Admin/AdminOrders';
import Orderss from './pages/user/Orderss';
import Favourites from './pages/Favourites';
import Buynow from './pages/Buynow.js';
import EmailAdmin from './pages/Admin/EmailAdmin';


function App() {
  return (
    <>
    <Routes>
      <Route path ="/" element={<HomePage/>}  />
      <Route path="/search" element={<Search/>}/>
      <Route path="/product/:slug" element={<ProductDetails/>}/>
      <Route path="/categories" element={<Categories/>}/>
      <Route path="/category/:slug" element={<CategoriesProduct/>}/>
      <Route path="/cart" element={<CartPage/>}/>
      <Route path ="/favourites" element={<Favourites/>}/>
      <Route path ="/buy-now" element={<Buynow/>}></Route>
      \


     
//USer Private routes

      <Route path ="/dashboard" element={<PrivateRoute/>}>
         <Route path ="user" element={<Dashboard/>}/>
         <Route path ="user/profile" element={<Profile/>}/>
         <Route path ="user/orders" element={<Orders/>}/>
         <Route path ="user/orderss" element={<Orderss/>}/>
         




      </Route>

//Admin private routes

      <Route path="/dashboard" element={<AdminRoute/>}>
        <Route path ="admin" element={<AdminDashboard/>} />
        <Route path ="admin/create-category" element={<CreateCategory/>} />
        <Route path ="admin/create-product" element={<CreateProduct/>} />
        <Route path ="admin/product/:slug" element={<UpdateProduct/>} />

        <Route path ="admin/users" element={<Users/>} />
        <Route path ="admin/orders" element={<AdminOrders/>} />

        <Route path ="admin/products" element={<Products/>}/> 
        <Route path ="/dashboard/admin/email" element={<EmailAdmin/>}/> 





        
      </Route>

      <Route path ="/register" element={<Register/>}/>
      <Route path ="/forgot-password" element={<ForgotPassword/>}/>

      <Route path ="/login" element={<Login/>}/>
      <Route path ="/about" element={<About/>}  />
      <Route path ="/contact" element={<Contact/>}  />
      <Route path ="/policy" element={<Policy/>}  />
      <Route path ="/*" element={<PageNotFound/>}  />
      
    </Routes>

    </>
  );
}

export default App;
