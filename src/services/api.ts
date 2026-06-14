import axios from "axios";

// Membaca dari file .env. Jika tidak ada, baru otomatis pakai localhost (8000)
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const buildProductImageUrl = (imagePath?: string) => {
  if (!imagePath) return "";
  const apiHost = API_BASE_URL.replace(/\/api$/, "");
  return `${apiHost}/storage/${imagePath}`;
};

export default api;