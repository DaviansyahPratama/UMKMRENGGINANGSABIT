import axios from "axios";

// Langsung tembak ke URL Railway kamu yang benar
const API_BASE_URL = "https://rengginangsabit.up.railway.app/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const buildProductImageUrl = (imagePath?: string) => {
  if (!imagePath) return "";
  const apiHost = API_BASE_URL.replace(/\/api$/, "");
  return `${apiHost}/storage/${imagePath}`;
};

export default api;