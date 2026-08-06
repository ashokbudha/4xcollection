import api from "../api/axios";

export const getCart = async () => {
  const response = await api.get("/cart");

  return response.data;
};

export const addToCart = async ({
  productId,
  variantId,
  quantity,
}) => {
  const response = await api.post("/cart/add", {
    productId,
    variantId,
    quantity,
  });

  return response.data;
};

export const updateCartItem = async (
  itemId,
  quantity
) => {
  const response = await api.patch(
    `/cart/item/${itemId}`,
    {
      quantity,
    }
  );

  return response.data;
};

export const removeCartItem = async (itemId) => {
  const response = await api.delete(
    `/cart/item/${itemId}`
  );

  return response.data;
};

export const clearCart = async () => {
  const response = await api.delete("/cart");

  return response.data;
};