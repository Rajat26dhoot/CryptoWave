import axios from "axios";

export const BASE_URL = 'https://spring-boot-docker-vn4g.onrender.com';


const api=axios.create({
    baseURL:BASE_URL,
    headers:{
        "Content-Type":"application/json"
    }
}
)
export default api;

