import React from 'react';

const Hero: React.FC = () => {
  return (
    <section 
      className="relative h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        // Ganti URL di bawah dengan path gambar background makanan/rengginang kamu
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url('/banner.png')`
      }}
    >
      {/* Panah Navigasi Kiri (Slider Style) */}
      <button className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white text-3xl transition hidden md:block">
        &#10094;
      </button>

      {/* Konten Utama di Tengah */}
      <div className="text-center text-white px-4 max-w-3xl mx-auto flex flex-col items-center justify-center">
        
        {/* Badge kecil di atas (Opsional, dari desain awalmu) */}
        <span className="bg-yellow-600/80 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
          UMKM Lokal Indonesia
        </span>

        {/* Judul Utama dengan Font Elegant/Script jika ada, atau Bold */}
        <h1 className="text-4xl md:text-6xl font-bold tracking-wide mb-4 drop-shadow-lg">
          We Serve <span className="text-yellow-500 font-serif italic">Quality</span> Food
        </h1>

        {/* Deskripsi */}
        <p className="text-sm md:text-lg text-gray-300 mb-8 max-w-2xl leading-relaxed drop-shadow">
          Nikmati rengginang premium dengan cita rasa tradisional nusantara yang gurih, renyah, dan diproses secara higienis untuk kualitas terbaik.
        </p>

        {/* Tombol Aksi Utama */}
        <button className="bg-[#b8860b] hover:bg-[#966f0a] text-white font-medium px-8 py-3 transition duration-300 uppercase tracking-wider text-sm shadow-lg">
          More Detail
        </button>
      </div>

      {/* Panah Navigasi Kanan (Slider Style) */}
      <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white text-3xl transition hidden md:block">
        &#10095;
      </button>
    </section>
  );
};

export default Hero;