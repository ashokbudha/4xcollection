import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ProductsPage from "../pages/ProductPage/ProductPage";
import CategoryPage from "../pages/CategoryPage/CategoryPage";
import ProductDetailsPage from "../pages/ProductDetailsPage/ProductDetailsPage";
import CartPage from "../pages/Cart/CartPage"

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
{/* 
      <Route path="/checkout" element={<CheckoutPage />} />

      <Route path="/profile" element={<ProfilePage />} /> */}
    </Routes>
  );
}

export default AppRoutes;
