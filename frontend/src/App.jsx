import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkAuthStatus } from "./actions/authActions";
import ProtectedRoute from "./ProtectedRoute";
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from "./components/ScrollToTop";
import './App.css'

//MAIN PAGES
import Home from "./components/homepage/Home";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
//PRODUCTS
// import Products from "./components/products/Products";
import ProductDetail from "./components/products/ProductDetail";
import ValidatedForm from "./components/productForm/ValidatedForm";
import Update from "./components/productForm/Update";
import ProductsByCategory from "./components/categories/ProductsByCategory";
import FilteredProducts from "./components/products/FilteredProducts";
//USERS
import Form from "./components/userForm/Form";
import Profile from "./components/users/Profile";
import Favorites from "./components/users/Favorites";
import Cart from "./components/users/Cart";
import Orders from "./components/users/Orders";
//STATIC PAGES
import Maintenance from "./components/staticPages/Maintenance";
import ShippingInfo from "./components/staticPages/ShippingInfo";
import AuthRedirect from "./components/staticPages/AuthRedirect";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);


  return (
    <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <div className="lg:container mx-auto pt-[53px] lg:pt-[115px] overflow-hidden">
          <Routes>
              {/* MAIN PAGES */}
              <Route path="/" exact element={<Home />} />
              {/* <Route path="/products" exact element={<Products />} /> */}
              <Route path="/product/:uuid" exact element={<ProductDetail />} />
              <Route path="/product/form" exact element={
                <ProtectedRoute>
                  <ValidatedForm />
                </ProtectedRoute>    
              } />
              <Route path="/product/update/:uuid" exact element={<Update />} />
              <Route path="/category/:category" element={<ProductsByCategory />} />
              <Route path="/user/register" exact element={<Form />} />
              <Route path="/user/:uuid/favorites" exact element={<Favorites/>} />
              <Route path="/user/:uuid/cart" exact element={ <Cart/> } />
              <Route path="/user/profile/:uuid" element={
                <ProtectedRoute>
                          <Profile />
                </ProtectedRoute>
              } />
              <Route path="/products/:filter" exact element={ <FilteredProducts /> } />
              <Route path="/user/:uuid/orders" exact element={ <Orders /> } />

              {/* STATIC PAGES */}
              <Route path="/maintenance" exact element={<Maintenance />} />
              <Route path="/auth/redirect" exact element={<AuthRedirect />} />
              <Route path="shippinginformation" exact element={<ShippingInfo />} />


          </Routes>
        </div>
        
        <Footer />
    </BrowserRouter>
  )
}

export default App;
