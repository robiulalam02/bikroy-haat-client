import axios from 'axios';
import React from 'react'

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

const useAxiosSecure = () => {
    axiosSecure.interceptors.request.use((config) => {
        const token = localStorage.getItem("access-token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });
    return axiosSecure
}

export default useAxiosSecure
