import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api"; // Hubungkan ke API Railway kita
import { Product } from "../../types/Product";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  // Ambil data produk murni dari Backend Laravel Railway kamu
  const loadProducts = async () => {
    try {
      const response = await api.get("/products");

      const mappedProducts = response.data.map((item: any) => {
        // --- TRIK JINAKKAN URL GAMBAR UTUH ---
        let finalImageUrl = "/images/logo/rengginang-sabit.png";

        if (item.image_url) {
          // Ambil nama filenya saja (buang folder localhost / storage / products jika nyangkut)
          const filename = item.image_url.split("/").pop();
          // Satukan langsung ke folder publik HTTPS Railway kamu yang valid
          finalImageUrl = `https://rengginangsabit.up.railway.app/images/products/${filename}`;
        }

        return {
          id: item.id,
          name: item.name,
          description: item.description,
          composition: item.composition,
          category: item.category,
          price: item.price,
          imageUrl: finalImageUrl,
          isBestSeller: Boolean(item.is_best_seller),
        };
      });

      // Urutkan berdasarkan best seller jika diperlukan
      mappedProducts.sort(
        (a: Product, b: Product) =>
          Number(b.isBestSeller) - Number(a.isBestSeller),
      );

      setProducts(mappedProducts);
      setFilteredProducts(mappedProducts);
    } catch (err: any) {
      console.error(err);
      setError("Gagal memuat produk dari server.");
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Sistem pencarian lokal (Debounce 500ms)
  useEffect(() => {
    const timeout = setTimeout(() => {
      const result = products.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase()),
      );
      setFilteredProducts(result);
    }, 500);

    return () => clearTimeout(timeout);
  }, [query, products]);

  return (
    <div className="container mx-auto px-6 py-10">
      {error && (
        <p className="text-red-500 mb-4 text-center font-semibold">{error}</p>
      )}

      {/* INPUT PENCARIAN */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Cari menu rengginang..."
        className="
          w-full
          rounded-full
          border-2
          border-amber-400
          bg-slate-800
          px-6
          py-3
          text-white
          placeholder:text-gray-400
          shadow-lg
          focus:outline-none
          focus:ring-4
          focus:ring-amber-300
          mb-8
        "
      />

      {/* GRID DAFTAR PRODUK */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <div
              key={item.id}
              className="
                group
                overflow-hidden
                rounded-3xl
                bg-slate-800
                border
                border-amber-400
                shadow-xl
                transition-all
                duration-300
                hover:-translate-y-2
                hover:shadow-amber-500/20
                p-4
              "
            >
              <div className="overflow-hidden rounded-2xl mb-3">
                <img
                  src={item.imageUrl}
                  alt={`Gambar ${item.name}`}
                  loading="lazy"
                  onError={(event) => {
                    event.currentTarget.src =
                      "/images/logo/rengginang-sabit.png";
                  }}
                  className="
                    h-48
                    w-full
                    object-cover
                    transition
                    duration-500
                    group-hover:scale-110
                  "
                />
              </div>

              <Link
                to={`/products/${item.id}`}
                className="text-2xl font-bold text-amber-400 hover:text-amber-500 transition-colors"
              >
                {item.name}
              </Link>

              <p className="text-gray-400 mt-2 text-sm line-clamp-2">
                {item.description}
              </p>

              <div className="mt-4 flex items-center justify-between border-t border-slate-700 pt-3">
                <span className="text-xl font-extrabold text-white">
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    maximumFractionDigits: 0,
                  }).format(item.price)}
                </span>

                <span className="text-xs font-semibold px-3 py-1 bg-slate-700 text-amber-400 rounded-full">
                  {item.category}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center">
            <p className="text-lg text-gray-400">Produk tidak ditemukan.</p>
          </div>
        )}
      </div>
    </div>
  );
}
