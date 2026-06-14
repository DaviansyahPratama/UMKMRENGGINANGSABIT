import axios from "axios";

// Ambil dari .env, jika kosong otomatis tembak ke Railway produksi
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

// Fungsi pembuat URL gambar otomatis yang dinamis (Sudah Diperbaiki Total)
export function buildProductImageUrl(
  imagePath: string | null | undefined,
): string {
  if (!imagePath) return "/images/logo/rengginang-sabit.png"; // Gambar default jika kosong

  // 1. Jika backend mengirimkan URL utuh (http/https)
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    // CEK SPESIFIK: Jika URL utuh tersebut ternyata mengarah ke Localhost / IP lokal komputer
    if (imagePath.includes("localhost") || imagePath.includes("127.0.0.1")) {
      const filename = imagePath.split("/").pop();
      // Arahkan ke folder storage link bawaan Laravel di Railway
      return `${BASE_URL}/storage/products/${filename}`;
    }

    // Jika URL utuh dan bukan localhost (sudah online/benar), gunakan langsung
    return imagePath;
  }

  // 2. Jika path dari DB berupa string relatif "products/namafile.png" (Data lama kamu)
  if (imagePath.startsWith("products/")) {
    return `${BASE_URL}/storage/${imagePath}`;
  }

  // 3. Jika path dari DB berupa string relatif "images/products/namafile.png" (Data dari Controller barumu)
  if (imagePath.startsWith("images/")) {
    return `${BASE_URL}/${imagePath}`;
  }

  // 4. Jika path dari DB berupa relative path yang diawali dengan garis miring (/)
  if (imagePath.startsWith("/")) {
    return `${BASE_URL}${imagePath}`;
  }

  // Gabungkan BASE_URL langsung dengan relative path dari database sebagai cadangan
  return `${BASE_URL}/${imagePath}`;
}

export default api;
