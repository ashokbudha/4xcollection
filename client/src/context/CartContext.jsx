import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

import { useAuth } from "./AuthContext";

import {
  getCart,
  addToCart as addCartService,
  updateCartItem as updateCartItemService,
  removeCartItem as removeCartItemService,
  clearCart as clearCartService,
} from "../services/cart.service";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // FETCH CART
  // ==========================================

  const fetchCart = async () => {
    try {
      setLoading(true);

      const response = await getCart();

      setCart(response.data);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // FETCH CART WHEN AUTH STATE CHANGES
  // ==========================================

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    } else {
      setCart(null);
      setLoading(false);
    }
  }, [isAuthenticated]);

  // ==========================================
  // ADD TO CART
  // ==========================================

  const addToCart = async ({
    productId,
    variantId,
    quantity = 1,
  }) => {
    try {
      await addCartService({
        productId,
        variantId,
        quantity,
      });

      // Get fully populated cart
      await fetchCart();

      toast.success("Added to cart");
    } catch (error) {
      console.error("Add to cart error:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to add to cart"
      );

      throw error;
    }
  };

  // ==========================================
  // UPDATE CART ITEM
  // ==========================================

  const updateCartItem = async (
    itemId,
    quantity
  ) => {
    try {
      await updateCartItemService(
        itemId,
        quantity
      );

      // Get fully populated cart
      await fetchCart();

      toast.success("Cart updated.");
    } catch (error) {
      console.error(
        "Update cart item error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to update cart."
      );

      throw error;
    }
  };

  // ==========================================
  // REMOVE CART ITEM
  // ==========================================

  const removeCartItem = async (itemId) => {
    try {
      await removeCartItemService(itemId);

      // Get fully populated cart
      await fetchCart();

      toast.success(
        "Product removed from cart."
      );
    } catch (error) {
      console.error(
        "Remove cart item error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to remove product."
      );

      throw error;
    }
  };

  // ==========================================
  // CLEAR CART
  // ==========================================

  const clearCart = async () => {
    try {
      await clearCartService();

      // Get latest cart
      await fetchCart();

      toast.success("Cart cleared.");
    } catch (error) {
      console.error(
        "Clear cart error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to clear cart."
      );

      throw error;
    }
  };

  // ==========================================
  // CART ITEMS
  // ==========================================

  const cartItems = cart?.items || [];

  // ==========================================
  // CART COUNT
  // ==========================================

  const cartCount = cartItems.reduce(
    (total, item) =>
      total + (item.quantity || 0),
    0
  );

  // ==========================================
  // CART SUBTOTAL
  // ==========================================

  const cartSubtotal = cartItems.reduce(
    (total, item) =>
      total +
      (item.quantity || 0) *
        (item.unitPrice || 0),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        cartItems,
        loading,

        cartCount,
        cartSubtotal,

        fetchCart,
        addToCart,
        updateCartItem,
        removeCartItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () =>
  useContext(CartContext);