import { Link } from "react-router-dom";

export default function PublicFooter() {
  return (
    <footer className="mt-20 border-t border-gray-100 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-12">
        
        {/* BRAND SECTION */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600 dark:from-amber-400 dark:to-amber-500">
              Rengginang Sabit
            </h2>
          </div>
          
          <p className="max-w-sm text-sm leading-relaxed text-gray-500 dark:text-zinc-400">
            UMKM lokal Indonesia dengan produk rengginang premium berkualitas tinggi, renyah, gurih, dan mempertahankan cita rasa autentik Nusantara.
          </p>

          
        </div>

        {/* NAVIGATION SECTION */}
        <div className="md:col-span-3 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-zinc-500">
            Navigasi Menu
          </h3>
          <div className="flex flex-col gap-3 text-sm font-medium">
            <Link
              to="/"
              className="w-fit text-gray-500 transition-all duration-200 hover:text-amber-500 hover:translate-x-1 dark:text-zinc-400 dark:hover:text-amber-400"
            >
              Beranda
            </Link>
            <Link
              to="/menu"
              className="w-fit text-gray-500 transition-all duration-200 hover:text-amber-500 hover:translate-x-1 dark:text-zinc-400 dark:hover:text-amber-400"
            >
              Katalog Produk
            </Link>
            <Link
              to="/outlets"
              className="w-fit text-gray-500 transition-all duration-200 hover:text-amber-500 hover:translate-x-1 dark:text-zinc-400 dark:hover:text-amber-400"
            >
              Lokasi Outlet
            </Link>
            <Link
              to="/kontak"
              className="w-fit text-gray-500 transition-all duration-200 hover:text-amber-500 hover:translate-x-1 dark:text-zinc-400 dark:hover:text-amber-400"
            >
              Informasi UMKM
            </Link>
          </div>
        </div>

        {/* CONTACT SECTION */}
        <div className="md:col-span-4 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-zinc-500">
            Hubungi Kami
          </h3>
          <div className="flex flex-col gap-3 text-sm text-gray-500 dark:text-zinc-400 font-medium">
            <div className="flex items-start gap-2.5">
              <span className="text-gray-400 dark:text-zinc-500 mt-0.5">📍</span>
              <span>Pekanbaru, Riau, Indonesia</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="text-gray-400 dark:text-zinc-500">📞</span>
              <span className="tabular-nums">+62 853-5110-1349</span>
            </div>
            <div className="flex items-center gap-2.5">
             
            </div>
            {/* SOCIAL MEDIA ICONS (Tautan Berhasil Disesuaikan) */}
          <div className="flex items-center gap-4 pt-2">
            {/* Instagram */}
            <a 
              href="https://www.instagram.com/rengginang_sabit?igsh=N3FjazNxNDR4Znpz" 
              target="_blank" 
              rel="noreferrer" 
              className="p-2 bg-gray-50 dark:bg-zinc-900 text-gray-400 hover:text-amber-500 dark:hover:text-amber-400 rounded-xl transition-all duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            
            {/* WhatsApp */}
            <a 
              href="https://wa.me/6285351101349" 
              target="_blank" 
              rel="noreferrer" 
              className="p-2 bg-gray-50 dark:bg-zinc-900 text-gray-400 hover:text-emerald-500 dark:hover:text-emerald-400 rounded-xl transition-all duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </a>
            
            {/* Shopee Store */}
            <a 
              href="https://id.shp.ee/k0gx43bm?smtt=0.0.9" 
              target="_blank" 
              rel="noreferrer" 
              className="p-2 bg-gray-50 dark:bg-zinc-900 text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 rounded-xl transition-all duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            </a>
          </div>
          </div>
        </div>

      </div>

      {/* COPYRIGHT BOTTOM BAR */}
      <div className="border-t border-gray-100 py-6 text-center text-xs font-medium text-gray-400 dark:border-zinc-900 dark:text-zinc-500">
        &copy; {new Date().getFullYear()} <span className="font-bold text-gray-600 dark:text-zinc-400">Rengginang Sabit</span>. All rights reserved.
      </div>
    </footer>
  );
}