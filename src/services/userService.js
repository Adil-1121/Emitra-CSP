import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL.replace(/\/$/, "");
export const getUserById = async (id) => {
    const res = await axios.get(`${API_BASE_URL}/api/user/${id}`);
    return res.data;
};

export const updateUser = async (id, payload) => {
    const res = await axios.put(`${API_BASE_URL}/api/user/${id}`, payload);
    return res.data;
};
export const addUser = async (payload) => {
    const res = await axios.post(`${API_BASE_URL}/api/user`, payload);
    return res.data;
};

export const getAllUsers = async () => {
    const res = await axios.get(`${API_BASE_URL}/api/users`);
    return res.data;
};

export const deleteUser = async (id) => {
    const res = await axios.delete(`${API_BASE_URL}/api/user/${id}`);
    return res.data;
};
