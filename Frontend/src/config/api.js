import axios from "axios";

export const BASE_URL = 'https://cryptowave-backend.onrender.com';


const api=axios.create({
    baseURL:BASE_URL,
    headers:{
        "Content-Type":"application/json"
    }
}
)
export default api;

