import PageMeta from "../../components/common/PageMeta";

// Data outlet resmi Rengginang Sabit
const outlets = [
  { 
    id: 1, 
    name: "Outlet Pusat Pekanbaru", 
    address: "Jl. Utama No. 12, Pekanbaru", 
    phone: "0853-5110-1349",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.688174574972!2d101.4428!3d0.5100!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMKwMzAnMzYuMCJOIDEwMcKwMjYnMzQuMiJF!5e0!3m2!1sid!2sid!4v1610000000000!5m2!1sid!2sid", // Contoh struktur link embed asli
    mapGoogleLink: "https://maps.google.com"
  },
  { 
    id: 2, 
    name: "Outlet Cabang Panam", 
    address: "Jl. HR. Soebrantas KM 12, Panam", 
    phone: "0853-5110-1349",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.688174574972!2d101.4428!3d0.5100!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMKwMzAnMzYuMCJOIDEwMcKwMjYnMzQuMiJF!5e0!3m2!1sid!2sid!4v1610000000000!5m2!1sid!2sid",
    mapGoogleLink: "https://maps.google.com"
  },
];

export default function OutletLokasi() {
  return (
    <>
      <PageMeta
        title="Lokasi Outlet & Map | Rengginang Sabit"
        description="Temukan koordinat peta dan alamat resmi outlet Rengginang Sabit terdekat."
      />

      {/* Pembungkus utama menggunakan background hitam pekat */}
      <div className="bg-black min-h-screen text-white selection:bg-[#E2A929] selection:text-black">
        
        {/* HEADER SECTION - Proporsional */}
        <section className="relative w-full flex items-center justify-center pt-32 pb-16 px-6">
          <div className="text-center space-y-4 max-w-2xl">
            <span className="inline-block rounded-none bg-[#E2A929]/10 border border-[#E2A929]/30 px-4 py-1.5 text-xs font-bold tracking-widest uppercase text-[#E2A929] backdrop-blur">
              Peta Distribusi
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-extrabold uppercase tracking-wider text-white">
              Lokasi & <span className="text-[#E2A929]">Peta Toko</span>
            </h1>
            <p className="text-xs tracking-wider uppercase text-gray-400 leading-relaxed">
              Gunakan navigasi peta interaktif di bawah ini untuk panduan rute jalan langsung menuju outlet kami.
            </p>
          </div>
        </section>

        {/* LIST OUTLET + MAPS SECTION (BOXED CONTAINER DESIGN) */}
        <section className="pb-32 px-4 sm:px-6 lg:px-8">
          {/* Batasan lebar maksimal grid agar rapi dan tidak melebar ke ujung monitor */}
          <div className="max-w-6xl mx-auto space-y-8">
            {outlets.map((outlet) => (
              <div 
                key={outlet.id} 
                className="border border-white/10 bg-white/[0.01] flex flex-col lg:flex-row rounded-none hover:border-[#E2A929]/20 transition duration-300 overflow-hidden shadow-2xl"
              >
                
                {/* SISI KIRI: INFORMASI DETAIL TOKO */}
                <div className="p-8 sm:p-10 lg:w-[380px] flex flex-col justify-between bg-zinc-950/40 border-b lg:border-b-0 lg:border-r border-white/10 flex-shrink-0">
                  <div className="space-y-6">
                    {/* Badge Nomor Seri Mini */}
                    <div className="w-8 h-8 border border-[#E2A929]/30 flex items-center justify-center text-[#E2A929] text-xs font-bold font-mono">
                      {String(outlet.id).padStart(2, '0')}
                    </div>
                    
                    {/* Nama & Alamat */}
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold font-serif text-[#E2A929] uppercase tracking-wide">
                        {outlet.name}
                      </h3>
                      <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-sans">
                        {outlet.address}
                      </p>
                    </div>

                    {/* Kontak Info */}
                    <div className="pt-4 border-t border-white/5 text-[10px] tracking-wider text-gray-500">
                      TELEPON / WA
                      <span className="block text-gray-300 text-xs font-medium mt-1">{outlet.phone}</span>
                    </div>
                  </div>

                  {/* TOMBOL RUTE: Menghabiskan lebar kolom kiri */}
                  <div className="mt-8">
                    <a 
                      href={outlet.mapGoogleLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center rounded-none bg-[#611414] hover:bg-[#831c1c] text-white text-[11px] font-bold tracking-widest uppercase py-4 transition duration-300 shadow-md active:scale-[0.99]"
                    >
                      Buka Rute Navigasi
                    </a>
                  </div>
                </div>

                {/* SISI KANAN: GOOGLE MAP INTERAKTIF (Tinggi proporsional seimbang dengan teks) */}
                <div className="flex-grow h-[300px] sm:h-[380px] lg:h-auto min-h-[350px] relative bg-zinc-900">
                  <iframe
                    src={outlet.mapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: "grayscale(1) invert(0.92) contrast(1.2)" }} 
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Peta Lokasi ${outlet.name}`}
                    className="absolute inset-0 w-full h-full"
                  ></iframe>
                </div>

              </div>
            ))}
          </div>
        </section>

      </div>
    </>
  );
}