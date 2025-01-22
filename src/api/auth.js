import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });

  const token = response.data.token;
  console.log("Token guardado:", localStorage.getItem("token"));
  if (!token) {
    throw new Error("Token no recibido del servidor");
  }

  localStorage.setItem("token", token);
  return response.data;
};

export const register = async (name, email, password) => {
  const response = await axios.post(`${API_URL}/register`, { name, email, password });
  return response.data;
};

export const logout = async () => {
  await axios.post(`${API_URL}/logout`, {}, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  localStorage.removeItem("token");
};

export const getUser = async () => {
  const token = localStorage.getItem("token");
  console.log("Token guardado:", localStorage.getItem("token"));
  if (!token) {
    throw new Error("Token no encontrado en localStorage");
  }

  const response = await axios.get(`${API_URL}/user`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};
