import axios from "axios";
import { useAuthStore } from "@/features/auth/store/useAuthStore";


const api = axios.create({
  baseURL: "http://localhost:3000/",
});

api.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuthStore.getState();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


export default api;
