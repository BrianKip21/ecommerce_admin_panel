import axios from "./axios";

export const getCategories = () => axios.get("/categories").then((r) => r.data);
export const getCategoryById = (id) => axios.get(`/categories/${id}`).then((r) => r.data);
export const addCategory = (payload) => axios.post("/categories", payload).then((r) => r.data);
export const editCategory = (id, payload) => axios.patch(`/categories/${id}`, payload).then((r) => r.data);
export const deleteCategory = (id) => axios.delete(`/categories/${id}`).then((r) => r.data);
