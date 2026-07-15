import axios from "axios";

// export const BASE_URL = 'https://cryptowaveupdate.onrender.com';
// export const BASE_URL = 'https://cryptowavebackend.onrender.com';
export const BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:10000').replace(/\/+$/, '');

axios.defaults.timeout = 20000;

const api=axios.create({
    baseURL:BASE_URL,
    timeout: 20000,
    headers:{
        "Content-Type":"application/json"
    }
}
)
export default api;

