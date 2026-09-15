import { Routes, Route } from "react-router-dom";

import Home from "../pages/home/home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ProductsPage from "../pages/ProductPage/ProductPage";
import CategoryPage from "../pages/CategoryPage/CategoryPage";
import ProductDetailsPage from "../pages/ProductDetailsPage/ProductDetailsPage";
import CartPage from "../pages/Cart/CartPage"
import CheckoutPage from "../pages/Checkout/CheckoutPage";
import ProfilePage from "../pages/Profile/ProfilePage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/products" element={<ProductsPage />} />

      <Route path="/category/:slug/*" element={<CategoryPage />} />

      <Route path="/product/:slug" element={<ProductDetailsPage />} />

      <Route path="/cart" element={<CartPage />} />
      
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/profile" element={<ProfilePage />} />

{/* 
      <Route path="/checkout" element={<CheckoutPage />} />

      <Route path="/profile" element={<ProfilePage />} /> */}
    </Routes>
  );
}

export default AppRoutes;
