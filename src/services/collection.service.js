import axios from "./axios";

export const getCollections = () =>
    axios
        .get("/collections")
        .then((r) => r.data);

export const getCollectionsAdmin = () =>
    axios
        .get("/collections/admin/all")
        .then((r) => r.data);

export const getCollectionAdmin = (id) =>
    axios
        .get(`/collections/admin/${id}`)
        .then((r) => r.data);

export const getCollectionBySlug = (slug, params) =>
    axios
        .get(`/collections/${slug}`, { params })
        .then((r) => r.data);

export const createCollection = (formData) =>
    axios
        .post("/collections", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        .then((r) => r.data);

export const updateCollection = (id, formData) =>
    axios
        .patch(`/collections/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        .then((r) => r.data);

export const deleteCollection = (id) =>
    axios
        .delete(`/collections/${id}`)
        .then((r) => r.data);
