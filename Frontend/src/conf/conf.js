import axios from 'axios';
import authService from "../backend/auth"
import store from '../store/store'
import { login, logout } from '../store/authSlice';

const conf = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
})

// conf.interceptors.request.use((config) => {
//     const token = localStorage.getItem("accessToken")
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config
// })

// conf.interceptors.request.use(
//     response => response,
//     async (error) => {
//         const originalRequest = error.config;
//         if (error.response.status === 401 && error.config && !error.config._isRetry) {
//             originalRequest._isRetry = true;
//             try {
//                 const newAccess = await authService.refreshAccessToken()
//                 store.dispatch(login({ accessToken: newAccess, refreshToken: localStorage.getItem("refreshToken") }));
//                 originalRequest.headers.Authorization = `Bearer ${newAccess}`;
//                 return conf(originalRequest)

//             } catch (refreshError) {
//                 store.dispatch(logout())
//                 window.location.href = "/login";
//                 throw refreshError
//             }
//         }
//         return Promise.reject(error);
//     }
// )

export default conf;