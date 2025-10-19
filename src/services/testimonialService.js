import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL.replace(/\/$/, "");

// Add new testimonial
export const addTestimonial = async (payload) => {
  const res = await axios.post(`${API_BASE_URL}/api/review`, payload, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// Get all testimonials
export const getAllTestimonials = async () => {
  const res = await axios.get(`${API_BASE_URL}/api/reviews`);
  return res.data;
};

// Get single testimonial by ID
export const getTestimonialById = async (id) => {
  const res = await axios.get(`${API_BASE_URL}/api/review/${id}`);
  return res.data;
};

// Update testimonial by ID
export const updateTestimonial = async (id, payload) => {
  const res = await axios.put(`${API_BASE_URL}/api/review/${id}`, payload, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// Delete testimonial by ID
export const deleteTestimonial = async (id) => {
  const res = await axios.delete(`${API_BASE_URL}/api/review/${id}`);
  return res.data;
};

// Delete all testimonials
export const deleteAllTestimonials = async () => {
  const res = await axios.delete(`${API_BASE_URL}/api/reviews`);
  return res.data;
};
