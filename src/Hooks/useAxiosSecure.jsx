import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router';
import useAuth from './useAuth';
import { toast } from 'react-toastify';

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const {userSignOut} = useAuth();

    // Request Interceptor
    axiosSecure.interceptors.request.use((config) => {
        const token = localStorage.getItem("access-token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    // Response Interceptor
    axiosSecure.interceptors.response.use((response) => {
        return response;
    }, async (error) => {
        const status = error.response?.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem("access-token");
            userSignOut();
        }
        return Promise.reject(error);
    });

    return axiosSecure;
}

export default useAxiosSecure;