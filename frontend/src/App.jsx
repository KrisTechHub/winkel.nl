import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from './store/productSlice';
import { checkAuthStatus } from "./actions/authActions";
import ProtectedRoute from "./ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

// MAIN PAGES
import Home from "./components/homepage/Home";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
// PRODUCTS
import ProductDetail from "./components/products/ProductDetail";
import NewProduct from "./components/productForm/NewProduct";
import Update from "./components/productForm/Update";
import ProductsByCategory from "./components/categories/ProductsByCategory";
import FilteredProducts from "./components/products/FilteredProducts";
// USERS
import Form from "./components/userForm/Form";
import Profile from "./components/users/Profile";
import Favorites from "./components/users/Favorites";
import Cart from "./components/users/Cart";
import Orders from "./components/users/Orders";
import MobileLogin from "./components/userForm/MobileLogin";
import MobileRegister from "./components/userForm/MobileRegister";
import AuthSuccess from "./components/users/AuthSuccess";
// SELLER PAGES
import SellerRegister from "./components/seller/SellerRegister";
import SellerWelcome from "./components/seller/SellerWelcome";
import SellerPage from "./components/seller/SellerPage";
// STATIC PAGES
import Maintenance from "./components/staticPages/Maintenance";
import ShippingInfo from "./components/staticPages/ShippingInfo";
import AuthRedirect from "./components/staticPages/AuthRedirect";
import Loading from "./components/staticPages/Loading";


function App() {
  const dispatch = useDispatch();
  const productStatus = useSelector(state => state.products.status);
  const products = useSelector(state => state.products.products);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    dispatch(checkAuthStatus());

    if (productStatus === 'idle') {
      dispatch(fetchProducts());
    } else if (productStatus === 'succeeded' || (productStatus === 'failed' && products.length > 0)) {
      setIsLoading(false);
    }

    const handleWindowResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleWindowResize);
    handleWindowResize();

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [dispatch, productStatus, products.length]);

  useEffect(() => {
    if (productStatus === 'succeeded' || (productStatus === 'failed' && products.length > 0)) {
      setIsLoading(false);
    }
  }, [productStatus, products.length]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <BrowserRouter >
      <ScrollToTop />
      <Navbar />
      <div className="lg:container mx-auto pt-[53px] lg:pt-[115px] overflow-hidden">
        <Routes>
          {/* MAIN PAGES */}
          <Route path="/" element={<Home />} />
          <Route path="/product/:uuid" element={<ProductDetail />} />
          <Route path="/product/form" element={
            <ProtectedRoute>
              <NewProduct />
            </ProtectedRoute>
          } />
          <Route path="/product/update/:uuid" element={<Update />} />
          <Route path="/category/:category" element={<ProductsByCategory />} />
          <Route path="/user/register" element={isLargeScreen ? <Form /> : <MobileRegister/> } />
          <Route path="/user/login" element={isLargeScreen ? <Form /> : <MobileLogin/> } />
          <Route path="/seller/register" element={ <SellerRegister />} />
          <Route path="/seller/welcome" element={<SellerWelcome />} />
          <Route path="/user/:uuid/favorites" element={<Favorites />} />
          <Route path="/user/:uuid/cart" element={<Cart />} />
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
          <Route path="/products/:filter" element={<FilteredProducts />} />
          <Route path="/user/:uuid/orders" element={<Orders />} />
          {/* STATIC PAGES */}
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/auth/redirect" element={<AuthRedirect />} />
          <Route path="/auth/success" element={<AuthSuccess />} />
          <Route path="/shippinginformation" element={<ShippingInfo />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
