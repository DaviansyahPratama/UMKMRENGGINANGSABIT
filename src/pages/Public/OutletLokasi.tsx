import PageMeta from "../../components/common/PageMeta";

// Penambahan data dummy dengan link embed Google Maps resmi
const outlets = [
  { 
    id: 1, 
    name: "Outlet Pusat Pekanbaru", 
    address: "Jl. Utama No. 12, Pekanbaru", 
    phone: "0853-5110-1349",
    // Ganti URL src di bawah ini dengan link embed dari Google Maps asli toko Anda nanti
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15959.256247385966!2d101.43793615!3d0.5072049!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d5ae75949dd9e3%3A0x6b7cf930b5df9a46!2sPekanbaru%2C%20Riau!5e0!3m2!1sid!2sid!4v1710000000000!5m2!1sid!2sid",
    mapGoogleLink: "https://maps.google.com"
  },
  { 
    id: 2, 
    name: "Outlet Cabang Panam", 
    address: "Jl. HR. Soebrantas KM 12, Panam", 
    phone: "0853-5110-1349",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15959.428581026048!2d101.36531585!3d0.4705572!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d5a894672e81cf%3A0x1d75f2b84eb43770!2sPanam%2C%20Pekanbaru!5e0!3m2!1sid!2sid!4v1710000000001!5m2!1sid!2sid",
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

      {/* Pembungkus utama disatukan dengan bg-black */}
      <div className="bg-black min-h-screen text-white selection:bg-[#E2A929] selection:text-black">
        
        {/* HEADER SECTION */}
        <section className="relative w-full flex items-center justify-center pt-32 pb-12 px-6">
          <div className="text-center space-y-4">
            <span className="inline-block rounded-none bg-[#E2A929]/10 border border-[#E2A929]/30 px-4 py-1.5 text-xs font-bold tracking-widest uppercase text-[#E2A929] backdrop-blur">
              Peta Distribusi
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-extrabold uppercase tracking-wider text-white">
              Lokasi & <span className="text-[#E2A929]">Peta Toko</span>
            </h1>
            <p className="max-w-md mx-auto text-xs tracking-wider uppercase text-gray-400">
              Kunjungi toko kami atau gunakan navigasi peta untuk panduan rute jalan langsung.
            </p>
          </div>
        </section>

        {/* LIST OUTLET + MAPS SECTION */}
        <section className="pb-24 px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="space-y-10">
              {outlets.map((outlet) => (
                <div 
                  key={outlet.id} 
                  className="border border-white/10 bg-white/[0.01] flex flex-col lg:flex-row rounded-none hover:border-[#E2A929]/20 transition duration-300 overflow-hidden shadow-2xl"
                >
                  
                  {/* SISI KIRI: DETAIL INFORMASI TOKO (Lebar 40%) */}
                  <div className="p-8 lg:w-2/5 flex flex-col justify-between bg-zinc-950/40 border-b lg:border-b-0 lg:border-r border-white/10">
                    <div className="space-y-4">
                      <div className="w-8 h-8 border border-[#E2A929]/40 flex items-center justify-center text-[#E2A929] text-xs font-bold font-mono">
                        {String(outlet.id).padStart(2, '0')}
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold font-serif text-[#E2A929] uppercase tracking-wide">
                          {outlet.name}
                        </h3>
                        <p className="text-gray-300 text-sm leading-relaxed font-sans">
                          {outlet.address}
                        </p>
                      </div>
                      <div className="pt-2 text-xs tracking-wider text-gray-500">
                        TELEPON / WA: <span className="block text-gray-300 font-medium mt-1">{outlet.phone}</span>
                      </div>
                    </div>

                    {/* GRUP TOMBOL AKSI */}
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <a 
                        href={`https://wa.me/${outlet.phone.replace(/[^0-9]/g, '')}?text=Halo%20Rengginang%20Sabit%2C%20saya%20ingin%20bertanya%20mengenai%20stok%20di%20${encodeURIComponent(outlet.name)}.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-center rounded-none bg-transparent hover:bg-white/5 border border-white/20 text-white text-[11px] font-bold tracking-widest uppercase py-3.5 transition duration-300"
                      >
                        Hubungi WA
                      </a>
                      <a 
                        href={outlet.mapGoogleLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-center rounded-none bg-[#611414] hover:bg-[#831c1c] text-white text-[11px] font-bold tracking-widest uppercase py-3.5 transition duration-300 shadow-md"
                      >
                        Buka di Maps
                      </a>
                    </div>
                  </div>

                  {/* SISI KANAN: FRAME MAPS GOOGLE INTERAKTIF (Lebar 60%) */}
                  <div className="lg:w-3/5 h-[280px] sm:h-[350px] lg:h-auto min-h-[300px] relative bg-zinc-900">
                    <iframe
                      src={outlet.mapEmbedUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0, filter: "grayscale(1) invert(0.92) contrast(1.2)" }} // Efek khusus dark theme minimalis biar petanya senada dengan website hitam
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
          </div>
        </section>

      </div>
    </>
  );
}