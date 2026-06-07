import PageMeta from "../../components/common/PageMeta";
import { Link } from "react-router-dom";
import product from "../../data/product";

const WHATSAPP_URL =
  "https://wa.me/6285351101349?text=Halo%20Owner%20Rengginang%20Sabit%2C%20saya%20ingin%20bertanya%20tentang%20produk.";

export default function GuestHome() {
  return (
    <>
      <PageMeta
        title="Rengginang Sabit | Landing Page"
        description="UMKM Rengginang Sabit premium khas nusantara."
      />

      <div className="space-y-24 bg-[#F7F1E3] text-[#2B1B12] min-h-screen">

        {/* HERO */}
        <section
          className="relative min-h-screen flex items-center bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(rgba(43,27,18,0.75), rgba(43,27,18,0.75)), url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1600&auto=format&fit=crop')",
          }}
        >
          <div className="max-w-7xl mx-auto w-full px-6 grid lg:grid-cols-2 items-center pt-20">

            {/* LEFT */}
            <div className="text-white">
              <span className="inline-flex bg-[#C8A24A]/10 border border-[#C8A24A]/40 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#C8A24A]">
                100% Ketan Premium
              </span>

              <h1 className="mt-6 text-5xl lg:text-7xl font-serif font-extrabold uppercase leading-tight">
                We Serve{" "}
                <span className="text-[#C8A24A] italic font-light lowercase">
                  quality
                </span>
                <span className="block mt-2">Rengginang Sabit</span>
              </h1>

              <p className="mt-6 max-w-xl text-white/80 text-sm">
                Rengginang premium dengan rasa tradisional, renyah, dan higienis khas nusantara.
              </p>

              <div className="mt-10 flex gap-4 flex-wrap text-xs font-bold uppercase tracking-widest">
                <a href="#produk">
                  <button className="bg-[#6B3E2E] hover:bg-[#8A4E3A] px-8 py-3 text-white transition">
                    Lihat Produk
                  </button>
                </a>

                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <button className="border border-white/60 px-8 py-3 hover:bg-white hover:text-[#2B1B12] transition">
                    WhatsApp
                  </button>
                </a>
              </div>
            </div>

            {/* RIGHT */}
            <div className="hidden lg:flex justify-center">
              <div className="border border-white/20 bg-white/5 p-16">
                <span className="text-[140px]">🍘</span>
              </div>
            </div>
          </div>
        </section>

        {/* STATISTIK */}
        <section className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-6">

          <div className="bg-[#6B3E2E] text-white p-8">
            <h2 className="text-5xl font-serif font-bold">10+</h2>
            <p className="mt-3 text-xs uppercase tracking-widest text-white/70">
              Varian Rasa
            </p>
          </div>

          <div className="bg-white border border-[#C8A24A]/30 p-8">
            <h2 className="text-5xl font-serif font-bold text-[#C8A24A]">25+</h2>
            <p className="mt-3 text-xs uppercase tracking-widest text-[#2B1B12]/70">
              Outlet Tersedia
            </p>
          </div>

          <div className="bg-white border border-[#C8A24A]/30 p-8">
            <h2 className="text-5xl font-serif font-bold text-[#C8A24A]">1000+</h2>
            <p className="mt-3 text-xs uppercase tracking-widest text-[#2B1B12]/70">
              Pelanggan Puas
            </p>
          </div>
        </section>

        {/* ABOUT */}
        <section className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">

          <div className="border border-[#C8A24A]/30 bg-white p-2">
            <img
              src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1400&auto=format&fit=crop"
              className="h-96 w-full object-cover"
            />
          </div>

          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C8A24A]">
              Tentang UMKM
            </span>

            <h2 className="text-4xl font-serif font-bold uppercase">
              Cita Rasa Tradisional
              <span className="block text-[#6B3E2E] mt-2">
                Kualitas Premium
              </span>
            </h2>

            <p className="text-sm text-[#2B1B12]/70">
              Rengginang Sabit menghadirkan produk khas nusantara dengan bahan premium dan proses higienis.
            </p>
          </div>
        </section>

        {/* PRODUK */}
        <section id="produk" className="max-w-7xl mx-auto px-6 py-10">

          <div className="text-center space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C8A24A]">
              Produk Kami
            </span>

            <h2 className="text-4xl font-serif font-bold uppercase">
              Katalog Produk
            </h2>
          </div>

          <div className="mt-14 grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {product.slice(0, 6).map((item) => (
              <div
                key={item.id}
                className="bg-white border border-[#C8A24A]/20 hover:-translate-y-1 transition"
              >
                <img
                  src={item.image}
                  className="h-72 w-full object-cover"
                />

                <div className="p-6">
                  <h3 className="font-serif text-xl font-bold uppercase">
                    {item.name}
                  </h3>

                  <p className="text-sm text-[#2B1B12]/70 mt-2 h-12 overflow-hidden">
                    {item.description}
                  </p>

                  <div className="mt-6 flex justify-between items-center border-t border-[#C8A24A]/20 pt-4">
                    <span className="text-[#C8A24A] font-bold">
                      {item.price}
                    </span>

                    <button className="bg-[#6B3E2E] text-white px-4 py-2 text-xs uppercase hover:bg-[#8A4E3A]">
                      Detail
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link to="/menu">
              <button className="bg-[#6B3E2E] hover:bg-[#8A4E3A] text-white px-10 py-3 text-xs uppercase font-bold">
                Lihat Semua Produk
              </button>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-7xl mx-auto px-6 pb-24">
          <div className="bg-[#6B3E2E] text-white p-12 text-center relative overflow-hidden">

            <div className="absolute right-0 bottom-0 text-9xl opacity-10">
              🍘
            </div>

            <h2 className="text-4xl font-serif font-bold uppercase">
              Pesan Sekarang
            </h2>

            <p className="mt-4 text-white/80 text-sm max-w-xl mx-auto">
              Hubungi kami via WhatsApp untuk pemesanan dan kerja sama reseller.
            </p>

            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <button className="mt-8 bg-white text-[#2B1B12] px-10 py-3 text-xs font-bold uppercase hover:bg-[#C8A24A]">
                Chat WhatsApp
              </button>
            </a>
          </div>
        </section>

      </div>
    </>
  );
}