import axios from "axios";
import { BASE_URL } from "./constant";

const axiosIntance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type":"application/json",
    },
});

axiosIntance.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem("token");
      if(accessToken){
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export default axiosIntance;