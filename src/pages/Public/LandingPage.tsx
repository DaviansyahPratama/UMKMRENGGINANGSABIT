import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";
import { Link } from "react-router-dom";
import product from "../../data/product";

const WHATSAPP_URL =
  "https://wa.me/628123456789?text=Halo%20Owner%20Rengginang%20Sabit%2C%20saya%20ingin%20bertanya%20tentang%20produk.";

export default function LandingPage() {
  return (
    <>
      <PageMeta
        title="Rengginang Sabit | Landing Page"
        description="UMKM Rengginang Sabit premium khas nusantara."
      />

      <div className="space-y-24">

        {/* HERO */}
        <section
          className="relative overflow-hidden rounded-3xl bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1600&auto=format&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-black/70" />

          <div className="relative z-10 grid min-h-[700px] items-center lg:grid-cols-2">

            <div className="p-8 lg:p-16 text-white">

              <span className="inline-flex rounded-full bg-amber-400/20 px-4 py-2 text-sm font-semibold text-amber-300 backdrop-blur">
                UMKM Lokal Indonesia
              </span>

              <h1 className="mt-6 text-5xl font-extrabold leading-tight lg:text-7xl">
                Rengginang
                <span className="block text-amber-400">
                  Sabit Premium
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-200">
                Nikmati rengginang premium dengan cita rasa tradisional
                nusantara yang gurih dan renyah.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">

                <a href="#produk">
                  <Button size="md">
                    Lihat Produk
                  </Button>
                </a>

                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="rounded-xl border border-white/30 px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-black">
                    WhatsApp
                  </button>
                </a>

              </div>

            </div>

            <div className="hidden items-center justify-center lg:flex">

              <div className="rounded-full bg-white/10 p-10 backdrop-blur-md">

                <span className="text-[180px]">
                  🍘
                </span>

              </div>

            </div>

          </div>

        </section>

        {/* PRODUK */}
        <section id="produk">

          <div className="text-center">

            <span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700">
              Produk Kami
            </span>

            <h2 className="mt-6 text-5xl font-extrabold text-gray-800 dark:text-white">
              Katalog Produk
            </h2>

          </div>

          <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">

            {product.slice(0, 6).map((item) => (
              <div
                key={item.id}
                className="group overflow-hidden rounded-3xl bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl dark:bg-white/[0.03]"
              >

                <div className="overflow-hidden">

                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-72 w-full object-cover transition duration-500 group-hover:scale-110"
                  />

                </div>

                <div className="p-6">

                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {item.name}
                  </h3>

                  <p className="mt-3 text-gray-500 dark:text-gray-400">
                    {item.description}
                  </p>

                  <div className="mt-6 flex items-center justify-between">

                    <span className="text-2xl font-extrabold text-amber-600">
                      {item.price}
                    </span>

                    <Button size="sm">
                      Detail
                    </Button>

                  </div>

                </div>

              </div>
            ))}

          </div>

          <div className="mt-12 text-center">

            <Link to="/menu">
              <Button size="md">
                Lihat Semua Produk
              </Button>
            </Link>

          </div>

        </section>

      </div>
    </>
  );
}