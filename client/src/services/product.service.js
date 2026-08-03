import api from "../api/axios";

export const getProducts = async (params = {}) => {
  const response = await api.get("/products", {
    params,
  });

  return response.data;
};