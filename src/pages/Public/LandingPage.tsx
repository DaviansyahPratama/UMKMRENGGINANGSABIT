import PageMeta from "../../components/common/PageMeta";
import { Link } from "react-router-dom";
import product from "../../data/product";

const WHATSAPP_URL =
  "https://wa.me/6285351101349?text=Halo%20Owner%20Rengginang%20Sabit%2C%20saya%20ingin%20bertanya%20tentang%20produk.";

export default function LandingPage() {
  return (
    <>
      <PageMeta
        title="Rengginang Sabit | Landing Page"
        description="UMKM Rengginang Sabit premium khas nusantara."
      />

      <div className="w-full">

        {/* HERO SECTION - Setinggi Layar Penuh (h-screen) & Melayang di Bawah Navbar */}
        <section
          className="relative h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center"
          style={{
            // Overlay hitam 70% agar teks putih tetap terbaca tajam di atas gambar background
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1600&auto=format&fit=crop')",
          }}
        >
          {/* Panah Navigasi Slider Kiri */}
          <button className="absolute left-6 top-1/2 -translate-y-1/2 text-white/30 hover:text-white text-3xl transition hidden md:block">
            &#10094;
          </button>

          {/* Konten Hero Sentral */}
          <div className="relative z-10 max-w-4xl mx-auto text-center px-6 flex flex-col items-center">
            
            {/* Badge - Menggunakan warna Emas logo (`#E2A929`) dengan latar transparan */}
            <span className="inline-flex rounded-none bg-[#E2A929]/10 border border-[#E2A929]/30 px-4 py-1.5 text-xs font-bold tracking-widest uppercase text-[#E2A929] backdrop-blur">
              100% Asli Ketan • Gurih & Renyah
            </span>

            {/* Judul Utama - Kata "quality" diberi sentuhan warna Marun logo (`#611414`) */}
            <h1 className="mt-6 text-4xl font-extrabold tracking-wide md:text-6xl lg:text-7xl text-white uppercase font-serif">
              We Serve <span className="text-[#611414] italic font-light lowercase">quality</span>
              <span className="block text-white mt-2">Rengginang Sabit</span>
            </h1>

            <p className="mt-6 max-w-2xl text-sm md:text-lg leading-relaxed text-gray-300">
              Nikmati rengginang premium dengan cita rasa tradisional nusantara. Renyahnya gigitan berpadu dengan resep warisan yang gurih, otentik, dan higienis.
            </p>

            {/* Kelompok Tombol Kotak Tegas (`rounded-none`) */}
            <div className="mt-10 flex flex-wrap justify-center gap-4 text-xs font-bold tracking-widest uppercase">
              
              {/* Tombol Utama disesuaikan ke warna Marun Logo */}
              <a href="#produk">
                <button className="rounded-none bg-[#611414] hover:bg-[#831c1c] text-white px-8 py-3.5 font-bold transition duration-300 shadow-lg tracking-widest uppercase">
                  Lihat Produk
                </button>
              </a>

              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <button className="rounded-none border border-white/40 px-8 py-3.5 font-semibold text-white transition hover:bg-white hover:text-black tracking-widest uppercase">
                  WhatsApp
                </button>
              </a>

            </div>
          </div>

          {/* Panah Navigasi Slider Kanan */}
          <button className="absolute right-6 top-1/2 -translate-y-1/2 text-white/30 hover:text-white text-3xl transition hidden md:block">
            &#10095;
          </button>
        </section>


        {/* PRODUK SECTION */}
        <section id="produk" className="max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">

          <div className="text-center">
            {/* Tag sub-judul menggunakan aksen emas logo */}
            <span className="rounded-none bg-[#E2A929]/10 border border-[#E2A929]/30 px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#E2A929]">
              Produk Kami
            </span>
            <h2 className="mt-6 text-4xl font-extrabold text-gray-800 dark:text-white uppercase tracking-wider font-serif">
              Katalog Produk
            </h2>
          </div>

          {/* Grid List Produk Kotak */}
          <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {product.slice(0, 6).map((item) => (
              <div
                key={item.id}
                className="group overflow-hidden rounded-none bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl dark:bg-white/[0.03]"
              >
                <div className="overflow-hidden rounded-none">
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
                    {/* Harga menggunakan warna emas logo agar terlihat premium & stand out */}
                    <span className="text-2xl font-extrabold text-[#E2A929]">
                      {item.price}
                    </span>
                    
                    {/* Tombol Detail Kartu Produk menggunakan warna Marun */}
                    <button className="rounded-none bg-[#611414] hover:bg-[#831c1c] text-white px-4 py-2 text-xs font-bold uppercase tracking-wider transition">
                      Detail
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tombol Lihat Semua di bagian bawah */}
          <div className="mt-12 text-center">
            <Link to="/menu">
              <button className="rounded-none bg-[#611414] hover:bg-[#831c1c] text-white px-8 py-3.5 font-bold transition tracking-widest uppercase">
                Lihat Semua Produk
              </button>
            </Link>
          </div>

        </section>

      </div>
    </>
  );
}