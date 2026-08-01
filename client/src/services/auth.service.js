import api from "../api/axios";

export const login = async(credentials) => {
  const response = await api.post("/users/login",credentials);
  return response.data;
};


export const register = async (userData) => {
  const formData = new FormData();

formData.append("fullName",userData.fullName);
formData.append("email", userData.email);
formData.append("username", userData.username);
formData.append("phone", userData.phone);
formData.append("password", userData.password);
formData.append("avatar", userData.avatar[0]);

  const response = await api.post("/users/register", formData);
  return response.data;
};

export const logout = async () => {
  const response = await api.post("/users/logout");
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get("/users/me");
  return response.data;
};