import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  addToWishlist as addWishlistService,
  removeFromWishlist as removeWishlistService,
  getWishlist,
} from "../services/wishlist.service";
import { useAuth } from "./AuthContext";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  // Fetch wishlist when app loads
 useEffect(() => {
  if (isAuthenticated) {
    fetchWishlist();
  } else {
    setWishlist([]);
    setLoading(false);
  }
}, [isAuthenticated]);

  const fetchWishlist = async () => {
    try {
      const response = await getWishlist();

      // Backend returns wishlist.items
      const items = response.data.items || [];

      // Store only product ids
      setWishlist(items.map((item) => item.productId));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const addToWishlist = async (productId) => {
    try {
      await addWishlistService(productId);

  setWishlist((prev) =>
  prev.includes(productId)
    ? prev
    : [...prev, productId]
);
    } catch (error) {
      console.error(error);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      await removeWishlistService(productId);

      setWishlist((prev) =>
        prev.filter((id) => id !== productId)
      );
    } catch (error) {
      console.error(error);
    }
  };

const isWishlisted = (productId) => {
  return wishlist.some(
    (id) => String(id) === String(productId)
  );
};

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        loading,
        fetchWishlist,
        addToWishlist,
        removeFromWishlist,
        isWishlisted,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);