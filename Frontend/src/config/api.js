import axios from "axios";

// export const BASE_URL = 'https://cryptowaveupdate.onrender.com';
export const BASE_URL = 'https://cryptowavebackend.onrender.com';



const api=axios.create({
    baseURL:BASE_URL,
    headers:{
        "Content-Type":"application/json"
    }
}
)
export default api;

