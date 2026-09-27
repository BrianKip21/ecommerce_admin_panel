import axios from "./axios";

export const getAllOrders = () => axios.get("/orders").then((r) => r.data);
export const getOrderById = (id) => axios.get(`/orders/${id}`).then((r) => r.data);
export const updateOrderStatus = (id, status) =>
    axios.patch(`/orders/${id}/status`, { status }).then((r) => r.data);
