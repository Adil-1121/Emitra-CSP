import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL.replace(/\/$/, "");

// Register
export const registerUser = async (fullName, email, password) => {
    const res = await axios.post(`${API_BASE_URL}/auth/register`, {
        full_name: fullName,
        email,
        password
    }, {
        headers: { "Content-Type": "application/json" }
    });
    return res.data;
};

// Login
export const loginUser = async (email, password) => {
    const res = await axios.post(`${API_BASE_URL}/auth/login`, { email, password }, {
        headers: { "Content-Type": "application/json" }
    });
    return res.data;
};

// Change password
export const changePassword = async (currentPassword, newPassword, token) => {
    const res = await axios.put(`${API_BASE_URL}/auth/change-password`,
        { currentPassword, newPassword },
        {
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
        }
    );
    return res.data;
};

// Forgot password
export const forgotPassword = async (email) => {
    const res = await axios.post(`${API_BASE_URL}/auth/forgot-password`, { email }, {
        headers: { "Content-Type": "application/json" }
    });
    return res.data;
};

// Lockscreen unlock
export const unlockLockscreen = async (password, token) => {
    const res = await axios.post(`${API_BASE_URL}/auth/lockscreen-unlock`,
        { password },
        {
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
        }
    );
    return res.data;
};

// ✅ Reset Password
export const resetPassword = async (token, newPassword) => {
    const res = await axios.post(`${API_BASE_URL}/auth/reset-password`, {
        token,
        newPassword
    }, {
        headers: { "Content-Type": "application/json" }
    });
    return res.data;
};