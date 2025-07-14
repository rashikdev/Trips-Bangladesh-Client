import axios from "axios";
import React, { useEffect } from "react";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
});

const useAxiosSecure = () => {
  useEffect(() => {
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("access-token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
    };
  }, []);

  return axiosInstance;
};

export default useAxiosSecure;
