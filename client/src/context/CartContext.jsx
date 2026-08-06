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

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    } else {
      setCart(null);
      setLoading(false);
    }
  }, [isAuthenticated]);

  const fetchCart = async () => {
    try {
      setLoading(true);

      const response = await getCart();

      setCart(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

const addToCart = async ({
  productId,
  variantId,
  quantity = 1,
}) => {
  try {
    const response = await addCartService({
      productId,
      variantId,
      quantity,
    });

    setCart(response.data);

    toast.success("Added to cart");
  } catch (error) {
    toast.error(

      error.response?.data?.message || "Failed to add to cart"
    );
    throw error;
  }
};

  const updateCartItem = async (
    itemId,
    quantity
  ) => {
    try {
      const response = await updateCartItemService(
        itemId,
        quantity
      );

console.log(response.data);


      setCart(response.data);
      toast.success("Cart updated.");
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  

  const removeCartItem = async (itemId) => {
    try {
      const response = await removeCartItemService(
        itemId
      );

      setCart(response.data);
      toast.success("Product removed from cart.");
    } catch (error) {
     toast.error("Failed to remove product.");
      throw error;
    }
  };

  const clearCart = async () => {
    try {
      const response = await clearCartService();

      setCart(response.data);
      toast.success("Cart cleared.");
    } catch (error) {
    toast.error("Failed to clear cart.");
      throw error;
    }
  };

  const cartItems = cart?.items || [];

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartSubtotal = cartItems.reduce(
    (total, item) =>
      total +
      item.quantity *
        (item.variantId?.price || 0),
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

export const useCart = () => useContext(CartContext);