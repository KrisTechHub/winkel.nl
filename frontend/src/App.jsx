import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, deleteProducts } from './store/productSlice';
import { checkAuthStatus } from "./actions/authActions";
import ProtectedRoute from "./ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";
import 'react-toastify/dist/ReactToastify.css';
import './App.css'

//MAIN PAGES
import Home from "./components/homepage/Home";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
//PRODUCTS
// import Products from "./components/products/Products";
import ProductDetail from "./components/products/ProductDetail";
import ValidatedForm from "./components/productForm/ValidatedForm";
import NewProduct from "./components/productForm/NewProduct";
import Update from "./components/productForm/Update";
import ProductsByCategory from "./components/categories/ProductsByCategory";
import FilteredProducts from "./components/products/FilteredProducts";
//USERS
import Form from "./components/userForm/Form";
import Profile from "./components/users/Profile";
import Favorites from "./components/users/Favorites";
import Cart from "./components/users/Cart";
import Orders from "./components/users/Orders";
//SELLER PAGES
import SellerRegister from "./components/seller/SellerRegister";
import SellerWelcome from "./components/seller/SellerWelcome";
import SellerPage from "./components/seller/SellerPage";
//STATIC PAGES
import Maintenance from "./components/staticPages/Maintenance";
import ShippingInfo from "./components/staticPages/ShippingInfo";
import AuthRedirect from "./components/staticPages/AuthRedirect";


function App() {
  const dispatch = useDispatch();
  const productStatus = useSelector(state => state.products.status);


  useEffect(() => {
    dispatch(checkAuthStatus());

    if (productStatus === 'idle') {
      dispatch(fetchProducts())
  }
  }, [dispatch, productStatus]);

  return (
    <BrowserRouter>
      <ScrollToTop/>
        <Navbar />
        <div className="lg:container mx-auto pt-[53px] lg:pt-[115px] overflow-hidden">
          <Routes>
              {/* MAIN PAGES */}
              <Route path="/" exact element={<Home />} />
              {/* <Route path="/products" exact element={<Products />} /> */}
              <Route path="/product/:uuid" exact element={<ProductDetail />} />
              <Route path="/product/form" exact element={
                <ProtectedRoute>
                  <NewProduct />
                </ProtectedRoute>    
              } />
              <Route path="/product/update/:uuid" exact element={<Update />} />
              <Route path="/category/:category" element={<ProductsByCategory />} />
              <Route path="/user/register" exact element={<Form />} />
              <Route path="/seller/register" exact element={ <SellerRegister /> } />
              <Route path="/seller/welcome" exact element={ <SellerWelcome /> } />
              <Route path="/user/:uuid/favorites" exact element={<Favorites/>} />
              <Route path="/user/:uuid/cart" exact element={ <Cart/> } />
              <Route path="/user/profile/:uuid" element={
                <ProtectedRoute>
                          <Profile />
                </ProtectedRoute>
              } />
              <Route path="/user/profile/:uuid/seller-page" element={
                <ProtectedRoute>
                          <SellerPage />
                </ProtectedRoute>
              } />
              <Route path="/products/:filter" exact element={ <FilteredProducts /> } />
              <Route path="/user/:uuid/orders" exact element={ <Orders /> } />

              {/* STATIC PAGES */}
              <Route path="/maintenance" exact element={<Maintenance />} />
              <Route path="/auth/redirect" exact element={<AuthRedirect />} />
              <Route path="/shippinginformation" exact element={<ShippingInfo />} />


          </Routes>
        </div>
        <Footer />
    </BrowserRouter>
  )
}

export default App;
