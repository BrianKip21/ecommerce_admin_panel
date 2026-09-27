import axios from "./axios";

export const getProducts = (params) => axios.get("/products", { params }).then((r) => r.data);
export const getProductById = (id) => axios.get(`/products/${id}`).then((r) => r.data);

// Product create/edit use multipart/form-data since the backend expects a file upload (req.file)
export const addProduct = (formData) =>
    axios.post("/products", formData, {
        headers: { "Content-Type": "multipart/form-data" }
    }).then((r) => r.data);

export const editProduct = (id, formData) =>
    axios.patch(`/products/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
    }).then((r) => r.data);

export const deleteProduct = (id) => axios.delete(`/products/${id}`).then((r) => r.data);
