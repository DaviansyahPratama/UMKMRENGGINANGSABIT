import axios from "axios";

// Ambil dari .env, KALAUPUN kosong/gagal, langsung tembak ke Railway kamu!
const BASE_URL =
  import.meta.env.VITE_API_URL || "https://rengginangsabit.up.railway.app";

const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Fungsi pembuat URL gambar otomatis yang dinamis
export function buildProductImageUrl(
  imagePath: string | null | undefined,
): string {
  if (!imagePath) return "/images/logo/rengginang-sabit.png"; // Gambar default jika kosong

  // Jika backend sudah mengirimkan URL utuh (http/https), pakai langsung
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  // Jika path dari DB sudah diawali dengan garis miring (/)
  if (imagePath.startsWith("/")) {
    return `${BASE_URL}${imagePath}`;
  }

  // Gabungkan BASE_URL langsung dengan path dari database (images/products/filename.jpg)
  return `${BASE_URL}/${imagePath}`;
}

export default api;
