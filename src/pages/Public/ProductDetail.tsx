import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
// 1. IMPORT: Pastikan buildProductImageUrl diimpor dari file api Anda
import api, { buildProductImageUrl } from "../../services/api";
import PageMeta from "../../components/common/PageMeta";
import type { Product } from "../../types/Product";

export default function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchProduct = async () => {
      if (!id) {
        setError("Produk tidak ditemukan.");
        setLoading(false);
        return;
      }

      try {
        const resp = await api.get(`/products/${id}`);
        if (!mounted) return;
        const data = resp.data;

        // 2. FILTERING: Ambil properti gambar apa pun yang dikirim oleh API
        const rawImage = data.image || data.image_url || data.image_path || "";

        // 3. EKSEKUSI: Lewatkan ke helper untuk mengubah localhost menjadi Railway secara otomatis
        const finalImageUrl = buildProductImageUrl(rawImage);

        setProduct({
          id: data.id,
          name: data.name,
          description: data.description,
          composition: data.composition ?? "",
          category: data.category ?? "",
          price: Number(data.price) || 0,
          imageUrl: finalImageUrl, // Gunakan URL hasil penyaringan dinamis
          isBestSeller: Boolean(data.is_best_seller),
        });
      } catch (err: any) {
        if (!mounted) return;
        setError(
          err?.response?.data?.message ||
            err?.message ||
            "Gagal memuat detail produk.",
        );
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchProduct();

    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading)
    return <p className="text-center text-white py-20">Loading...</p>;
  if (error) return <p className="text-red-500 text-center py-20">{error}</p>;
  if (!product)
    return (
      <p className="text-center text-white py-20">Produk tidak ditemukan.</p>
    );

  return (
    <>
      <PageMeta
        title={`${product.name} | RengginangSabit`}
        description={product.description || `Detail produk ${product.name}`}
      />

      <div className="container mx-auto px-6 py-10 pt-24">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="md:col-span-1">
            <div className="overflow-hidden rounded-3xl bg-slate-900 shadow-xl">
              <img
                src={product.imageUrl}
                alt={product.name}
                loading="lazy"
                onError={(event) => {
                  // Fallback final jika file di server Railway Anda memang tidak ada/terhapus
                  event.currentTarget.src = "/images/logo/rengginang-sabit.png";
                  event.currentTarget.className =
                    "h-full min-h-[320px] w-full object-cover opacity-50 p-8";
                }}
                className="h-full min-h-[320px] w-full object-cover"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="space-y-6 rounded-3xl bg-slate-900 p-8 shadow-xl">
              <div>
                <h1 className="text-3xl font-extrabold text-white">
                  {product.name}
                </h1>
                {product.isBestSeller && (
                  <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white">
                    🔥 BEST SELLER
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <p className="text-gray-300 leading-relaxed">
                  {product.description}
                </p>

                {product.composition && (
                  <div>
                    <h3 className="mb-2 text-lg font-semibold text-white">
                      Komposisi
                    </h3>
                    <p className="text-gray-400">{product.composition}</p>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-3xl font-extrabold text-amber-400">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    maximumFractionDigits: 0,
                  }).format(product.price)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
