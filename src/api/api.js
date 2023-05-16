import axios from "axios";
import AuthStore from "@/store/AuthStore";

const api = axios.create({
    baseURL: 'http://localhost:8000'
});

api.interceptors.request.use(config => {
    if (AuthStore.Token.value !== undefined) {
        config.headers.Authorization ="Bearer " + AuthStore.Token.value;
    }

    return config;
});

export default api;