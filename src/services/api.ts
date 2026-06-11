import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";

const api = axios.create({
  baseURL: "https://rengginangsabit.infinityfreeapp.com/api",
});

export const buildProductImageUrl = (imagePath?: string) => {
  if (!imagePath) return "";
  const apiHost = API_BASE_URL.replace(/\/api$/, "");
  return `${apiHost}/storage/${imagePath}`;
};

export default api;