import { useEffect, useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { Product } from "../../types/Product";

export default function KatalogMenu() {
  const [query, setQuery] = useState("");
  const [menuItems, setMenuItems] = useState<Product[]>([]);
  const [filteredMenu, setFilteredMenu] = useState<Product[]>([]);

  const BASE_URL =
    import.meta.env.VITE_API_URL || "https://rengginangsabit.up.railway.app";

  const loadProducts = async () => {
    try {
      const response = await api.get("/products");

      const products = response.data.map((item: any) => {
        return {
          id: item.id,
          name: item.name,
          description: item.description,
          composition: item.composition,
          category: item.category,
          price: item.price,

          // FIX IMAGE URL (AMAN 100%)
          imageUrl: item.image_url
            ? `${BASE_URL}/storage/${item.image_url}`
            : "/images/logo/rengginang-sabit.png",

          isBestSeller: Boolean(item.is_best_seller),
        };
      });

      products.sort(
        (a: Product, b: Product) =>
          Number(b.isBestSeller) - Number(a.isBestSeller),
      );

      setMenuItems(products);
      setFilteredMenu(products);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      const result = menuItems.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase()),
      );

      setFilteredMenu(result);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query, menuItems]);

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <>
      <PageMeta
        title="Katalog Menu | Rengginang Sabit"
        description="Daftar produk Rengginang Sabit"
      />

      <div className="container mx-auto px-6 py-10">
        {/* HEADER */}
        <section className="pt-16 text-center">
          <span className="inline-block rounded-full bg-amber-100 px-5 py-2 text-sm font-semibold text-amber-700 shadow">
            Produk Premium
          </span>

          <h1 className="mt-6 text-5xl font-extrabold">
            <span className="text-white">Katalog</span>{" "}
            <span className="text-amber-400">Menu</span>
          </h1>

          <p className="mt-4 text-lg text-gray-300">
            Pilihan rengginang premium khas nusantara.
          </p>
        </section>

        {/* SEARCH */}
        <div className="mx-auto mt-10 max-w-md">
          <input
            type="text"
            placeholder="Cari menu rengginang..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-full border-2 border-amber-400 bg-slate-800 px-6 py-4 text-white placeholder:text-gray-400 shadow-lg focus:outline-none focus:ring-4 focus:ring-amber-300"
          />
        </div>

        {/* LIST MENU */}
        <section className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {filteredMenu.length > 0 ? (
            filteredMenu.map((item) => (
              <div
                key={item.id}
                className="group overflow-hidden rounded-3xl bg-slate-800 border border-amber-400 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-amber-500/20"
              >
                <div className="overflow-hidden">
                  <img
                    src={item.imageUrl}
                    loading="lazy"
                    alt={`Gambar ${item.name}`}
                    onError={(e) => {
                      e.currentTarget.src = "/images/logo/rengginang-sabit.png";
                    }}
                    className="h-72 w-full object-cover transition duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="p-6">
                  {item.isBestSeller && (
                    <span className="inline-block rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white shadow-md">
                      🔥 BEST SELLER
                    </span>
                  )}

                  <h2 className="mt-3 text-2xl font-bold text-white">
                    {item.name}
                  </h2>

                  <p className="mt-3 text-gray-300">{item.description}</p>

                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-3xl font-extrabold text-amber-400">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        maximumFractionDigits: 0,
                      }).format(item.price)}
                    </span>

                    <Link
                      to={`/products/${item.id}`}
                      className="rounded-xl bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-900 shadow-md hover:bg-amber-500 transition-all duration-300"
                    >
                      Detail
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center">
              <p className="text-lg text-gray-300">Menu tidak ditemukan.</p>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
