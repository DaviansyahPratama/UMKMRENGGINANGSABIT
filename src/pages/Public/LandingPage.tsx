import { useEffect, useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { Product } from "../../types/Product";

const BASE_URL =
  import.meta.env.VITE_API_URL || "https://rengginangsabit.up.railway.app";

const WHATSAPP_URL =
  "https://wa.me/6285351101349?text=Halo%20Owner%20Rengginang%20Sabit%2C%20saya%20ingin%20bertanya%20tentang%20produk.";

export default function LandingPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await api.get("/products");

        const loadedProducts: Product[] = response.data.map((item: any) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          composition: item.composition,
          category: item.category,
          price: item.price,

          // FIX IMAGE URL (WAJIB INI)
          imageUrl: item.image_url
            ? `${BASE_URL}/storage/${item.image_url}`
            : "/images/logo/rengginang-sabit.png",

          isBestSeller: Boolean(item.is_best_seller),
        }));

        loadedProducts.sort(
          (a, b) => Number(b.isBestSeller) - Number(a.isBestSeller),
        );

        setProducts(loadedProducts);
      } catch (err) {
        console.error(err);
        setError("Gagal memuat produk.");
      }
    };

    loadProducts();
  }, []);

  return (
    <>
      <PageMeta
        title="Rengginang Sabit | Landing Page"
        description="UMKM Rengginang Sabit premium khas nusantara."
      />

      <div className="w-full bg-black text-white">
        {/* HERO SECTION */}
        <section
          className="relative h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,.75), rgba(0,0,0,.75)), url('/images/Background.jpg')",
          }}
        >
          <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
            <span className="inline-flex rounded-full bg-amber-100 px-5 py-2 text-sm font-semibold text-amber-700 shadow">
              100% Asli Ketan • Gurih & Renyah
            </span>

            <h1 className="mt-6 text-5xl md:text-6xl lg:text-7xl font-extrabold">
              <span className="text-white">We Serve</span>{" "}
              <span className="text-amber-400 italic">quality</span>
              <span className="block mt-3 text-white">Rengginang Sabit</span>
            </h1>

            <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-300">
              Nikmati rengginang premium dengan cita rasa tradisional nusantara.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a href="#produk">
                <button className="rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-900 px-8 py-3 font-bold transition shadow-lg">
                  Lihat Produk
                </button>
              </a>

              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <button className="rounded-xl border border-amber-400 px-8 py-3 font-semibold text-amber-400 transition hover:bg-amber-400 hover:text-slate-900">
                  WhatsApp
                </button>
              </a>
            </div>
          </div>
        </section>

        {/* PRODUK SECTION */}
        <section id="produk" className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <span className="inline-block rounded-full bg-amber-100 px-5 py-2 text-sm font-semibold text-amber-700 shadow">
                Produk Premium
              </span>

              <h2 className="mt-6 text-5xl font-extrabold">
                <span className="text-white">Katalog</span>{" "}
                <span className="text-amber-400">Produk</span>
              </h2>

              <p className="mt-4 text-lg text-gray-300">
                Pilihan rengginang premium khas nusantara.
              </p>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
              {error ? (
                <div className="col-span-full text-center text-red-400">
                  {error}
                </div>
              ) : (
                products.slice(0, 6).map((item) => (
                  <div
                    key={item.id}
                    className="group overflow-hidden rounded-3xl bg-slate-800 border border-amber-400 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-amber-500/20"
                  >
                    <div className="overflow-hidden">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="h-72 w-full object-cover transition duration-500 group-hover:scale-110"
                        onError={(e) => {
                          e.currentTarget.src =
                            "/images/logo/rengginang-sabit.png";
                        }}
                      />
                    </div>

                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-white">
                        {item.name}
                      </h3>

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
                          className="rounded-xl bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-amber-500"
                        >
                          Detail
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-12 text-center">
              <Link to="/menu">
                <button className="rounded-xl bg-amber-400 px-8 py-3 font-bold text-slate-900 transition hover:bg-amber-500">
                  Lihat Semua Produk
                </button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
