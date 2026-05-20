import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";
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

      <div className="space-y-24 bg-black text-white min-h-screen">

        {/* ================================= */}
        {/* HERO SECTION - Gaya Transparan D'BENTO */}
        {/* ================================= */}
        <section
          className="relative overflow-hidden rounded-none bg-cover bg-center min-h-screen flex items-center"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1600&auto=format&fit=crop')",
          }}
        >
          <div className="relative z-10 max-w-7xl mx-auto w-full px-6 grid grid-cols-1 items-center lg:grid-cols-2 pt-20">

            {/* LEFT - Teks & Tombol */}
            <div className="p-4 lg:p-12 text-white">
              {/* Badge kecil menggunakan aksen emas logo */}
              <span className="inline-flex rounded-none bg-[#E2A929]/10 border border-[#E2A929]/30 px-4 py-1.5 text-xs font-bold tracking-widest uppercase text-[#E2A929] backdrop-blur">
                100% Asli Ketan Premium
              </span>

              <h1 className="mt-6 text-5xl font-serif font-extrabold leading-tight lg:text-7xl uppercase tracking-wide">
                We Serve <span className="text-[#611414] italic font-light lowercase">quality</span>
                <span className="block text-white mt-2">Rengginang Sabit</span>
              </h1>

              <p className="mt-6 max-w-xl text-sm md:text-base leading-relaxed text-gray-400">
                Nikmati rengginang premium dengan cita rasa tradisional nusantara. Renyahnya gigitan berpadu dengan resep warisan yang gurih, otentik, dan higienis.
              </p>

              <div className="mt-10 flex flex-wrap gap-4 text-xs font-bold tracking-widest uppercase">
                <a href="#produk">
                  {/* Memaksa warna tombol bawaan menjadi marun logo */}
                  <button className="rounded-none bg-[#611414] hover:bg-[#831c1c] text-white px-8 py-3.5 font-bold transition duration-300 shadow-lg tracking-widest uppercase">
                    Lihat Produk
                  </button>
                </a>

                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="rounded-none border border-white/40 px-8 py-3.5 font-semibold text-white transition hover:bg-white hover:text-black tracking-widest uppercase">
                    WhatsApp
                  </button>
                </a>
              </div>
            </div>

            {/* RIGHT - Dekorasi Lingkaran Minimalis */}
            <div className="hidden items-center justify-center lg:flex">
              <div className="rounded-none border border-white/10 bg-white/[0.02] p-16 backdrop-blur-md">
                <span className="text-[140px] drop-shadow-2xl select-none">
                  🍘
                </span>
              </div>
            </div>

          </div>
        </section>

        {/* ================================= */}
        {/* STATISTIK - Kotak & Berkelas */}
        {/* ================================= */}
        <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          
          <div className="rounded-none bg-[#611414] p-8 text-white shadow-xl border-l-4 border-[#E2A929]">
            <h2 className="text-5xl font-serif font-extrabold tracking-wide">10+</h2>
            <p className="mt-3 text-xs font-bold tracking-widest uppercase text-gray-300">
              Varian Rasa Produk
            </p>
          </div>

          <div className="rounded-none bg-white/[0.02] border border-white/10 p-8 shadow-lg">
            <h2 className="text-5xl font-serif font-extrabold tracking-wide text-[#E2A929]">25+</h2>
            <p className="mt-3 text-xs font-bold tracking-widest uppercase text-gray-400">
              Outlet Tersedia
            </p>
          </div>

          <div className="rounded-none bg-white/[0.02] border border-white/10 p-8 shadow-lg">
            <h2 className="text-5xl font-serif font-extrabold tracking-wide text-[#E2A929]">1000+</h2>
            <p className="mt-3 text-xs font-bold tracking-widest uppercase text-gray-400">
              Pelanggan Puas
            </p>
          </div>

        </section>

        {/* ================================= */}
        {/* TENTANG - Pemisahan Grid Yang Bersih */}
        {/* ================================= */}
        <section className="max-w-7xl mx-auto px-6 grid items-center gap-12 lg:grid-cols-2 py-12">
          
          {/* IMAGE */}
          <div className="overflow-hidden rounded-none border border-white/10 bg-white/[0.02] p-2">
            <img
              src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1400&auto=format&fit=crop"
              alt="Tentang Rengginang Sabit"
              className="rounded-none h-96 w-full object-cover opacity-80"
            />
          </div>

          {/* CONTENT */}
          <div className="space-y-6">
            <span className="rounded-none bg-[#E2A929]/10 border border-[#E2A929]/30 px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#E2A929]">
              Tentang UMKM
            </span>

            <h2 className="text-4xl font-serif font-extrabold uppercase tracking-wider leading-tight">
              Cita Rasa Tradisional
              <span className="block text-[#611414] mt-2">Dengan Kualitas Premium</span>
            </h2>

            <p className="text-sm leading-relaxed text-gray-400">
              Rengginang Sabit menghadirkan rengginang khas nusantara dengan rasa autentik, bahan ketan murni pilihan, serta proses produksi higienis untuk memberikan sensasi kerenyahan terbaik di setiap gigitannya.
            </p>
          </div>

        </section>

        {/* ================================= */}
        {/* PRODUK - Katalog Grid Kotak */}
        {/* ================================= */}
        <section id="produk" className="max-w-7xl mx-auto px-6 py-12">
          
          <div className="text-center space-y-4">
            <span className="rounded-none bg-[#E2A929]/10 border border-[#E2A929]/30 px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#E2A929]">
              Produk Kami
            </span>
            <h2 className="text-4xl font-serif font-extrabold text-white uppercase tracking-wider">
              Katalog Produk
            </h2>
            <p className="text-xs tracking-wider uppercase text-gray-400">
              Pilihan rengginang premium favorit para penikmat kuliner lokal.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {product.slice(0, 6).map((item) => (
              <div
                key={item.id}
                className="group overflow-hidden rounded-none bg-white/[0.02] border border-white/10 shadow-lg transition duration-300 hover:-translate-y-2 hover:border-[#E2A929]/30"
              >
                {/* IMAGE */}
                <div className="overflow-hidden rounded-none">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-72 w-full object-cover transition duration-500 group-hover:scale-110"
                  />
                </div>

                {/* CONTENT */}
                <div className="p-6">
                  <h3 className="text-2xl font-serif font-bold text-white uppercase tracking-wide">
                    {item.name}
                  </h3>

                  <p className="mt-3 text-gray-400 text-sm h-12 overflow-hidden">
                    {item.description}
                  </p>

                  <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                    <span className="text-xl font-extrabold text-[#E2A929]">
                      {item.price}
                    </span>
                    <button className="rounded-none bg-[#611414] hover:bg-[#831c1c] text-white px-5 py-2 text-xs font-bold uppercase tracking-widest transition">
                      Detail
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link to="/menu">
              <button className="rounded-none bg-[#611414] hover:bg-[#831c1c] text-white px-10 py-3.5 font-bold transition tracking-widest uppercase text-xs">
                Lihat Semua Produk
              </button>
            </Link>
          </div>

        </section>

        {/* ================================= */}
        {/* CTA WHATSAPP - Menyesuaikan Skema Gelap Marun */}
        {/* ================================= */}
        <section className="max-w-7xl mx-auto px-6 pb-24">
          <div className="rounded-none border border-white/10 bg-gradient-to-br from-[#611414] to-[#380b0b] p-12 text-center text-white shadow-2xl relative overflow-hidden">
            
            {/* Aksen Hiasan Belakang */}
            <div className="absolute right-0 bottom-0 opacity-5 text-9xl select-none translate-x-10 translate-y-10">🍘</div>

            <h2 className="text-4xl font-serif font-extrabold uppercase tracking-wider">
              Pesan Sekarang
            </h2>

            <p className="mt-4 max-w-xl mx-auto text-sm text-gray-300">
              Hubungi manajemen Rengginang Sabit melalui layanan WhatsApp resmi untuk konsultasi rasa, harga grosir agen, ataupun pemesanan kustom langsung.
            </p>

            <div className="mt-8">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="rounded-none bg-white hover:bg-[#E2A929] hover:text-black px-10 py-4 text-xs font-bold tracking-widest uppercase text-black transition-all duration-300">
                  Chat via WhatsApp
                </button>
              </a>
            </div>

          </div>
        </section>

      </div>
    </>
  );
}