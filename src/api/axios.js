import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

const instance = axios.create({
  baseURL: API_URL,
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
