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

  // Jika backend sudah telanjur mengirimkan URL utuh (http/https), pakai langsung
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  // Jika hanya nama file/path saja, sambungkan dengan BASE_URL Railway
  return `${BASE_URL}/storage/${imagePath}`;
}

export default api;
