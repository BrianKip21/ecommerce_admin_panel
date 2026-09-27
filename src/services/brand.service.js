import axios from "./axios";

export const getBrands = () => axios.get("/brands").then((r) => r.data);
export const getBrandById = (id) => axios.get(`/brands/${id}`).then((r) => r.data);
export const addBrand = (payload) => axios.post("/brands", payload).then((r) => r.data);
export const editBrand = (id, payload) => axios.patch(`/brands/${id}`, payload).then((r) => r.data);
export const deleteBrand = (id) => axios.delete(`/brands/${id}`).then((r) => r.data);
