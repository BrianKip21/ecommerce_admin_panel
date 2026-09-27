import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "/api";

const instance = axios.create({
    baseURL,
    withCredentials: true,
    headers: { "Content-Type": "application/json" }
});

instance.interceptors.response.use(
    (response) => response,
    (error) => {
        const message =
            error.response?.data?.message || error.message || "Something went wrong";
        return Promise.reject({ ...error, status: error.response?.status, message });
    }
);

export default instance;
