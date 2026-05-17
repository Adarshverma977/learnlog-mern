import axios from "axios";

import toast from "react-hot-toast";


const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});


// RESPONSE INTERCEPTOR
axiosInstance.interceptors.response.use(

  (response) => response,

  (error) => {

    if (error.response?.status === 401) {

      toast.error("Session expired");

      window.location.href = "/login";

    }

    return Promise.reject(error);

  }
);

export default axiosInstance;