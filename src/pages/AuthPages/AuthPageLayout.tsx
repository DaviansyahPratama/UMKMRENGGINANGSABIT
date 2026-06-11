import React from "react";
import GridShape from "../../components/common/GridShape";
import { Link } from "react-router";
import ThemeTogglerTwo from "../../components/common/ThemeTogglerTwo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // CANVAS UTAMA: Menjadi Grid 2 Kolom di layar besar (lg:)
    <div className="relative grid min-h-screen w-full grid-cols-1 bg-zinc-50 font-sans text-zinc-900 antialiased selection:bg-orange-500/20 selection:text-orange-950 lg:grid-cols-2">
      
      {/* ==================== SISI KIRI: BRANDING & VISUAL ==================== */}
      <div className="relative hidden flex-col justify-between overflow-hidden border-r border-zinc-200/80 bg-zinc-950 p-12 text-white lg:flex">
        
        {/* Ornamen Latar Belakang (Ambient Glow Khas Rengginang Sabit) */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/10 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-0 right-0 -z-10 h-[300px] w-[300px] rounded-full bg-amber-500/5 blur-[100px]" />
        
        {/* Pola Garis Grid Minimalis */}
        <div 
          className="pointer-events-none absolute inset-0 opacity-[0.02]" 
          style={{ 
            backgroundImage: "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)", 
            backgroundSize: "40px 40px" 
          }} 
        />

        {/* Garis Abstrak Bawaan Template */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center scale-90 opacity-[0.03]">
          <GridShape />
        </div>

        {/* LOGO BRANDING (Bagian Atas Kiri) */}
        <div>
          <Link to="/" className="group inline-flex items-center gap-3.5">
            <img
              src="/images/logo/rengginang-sabit.png"
              alt="RengginangSabit"
              className="h-10 w-10 rounded-xl object-cover ring-1 ring-white/10"
            />
            <div className="text-left">
              <span className="block text-sm font-black uppercase tracking-[0.2em] text-white group-hover:text-orange-400 transition-colors">
                Rengginang Sabit
              </span>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                Management SYSTEM
              </span>
            </div>
          </Link>
        </div>

        {/* TEKS JARGON UTAMA (Bagian Tengah/Bawah Kiri) */}
        <div className="relative z-10 max-w-md space-y-3">
          <span className="inline-flex items-center rounded-full bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-400 ring-1 ring-inset ring-orange-500/20">
            v2.0 Beta Release
          </span>
          <h2 className="text-3xl font-black tracking-tight leading-tight text-white xl:text-4xl">
            Satu Panel Utama untuk Seluruh Kendali Operasional.
          </h2>
          <p className="text-sm leading-relaxed text-zinc-400">
            Pantau performa, kelola data integrasi, dan amankan aktivitas manajemen sistem Rengginang Sabit dalam satu enkripsi terpadu.
          </p>
        </div>

        {/* FOOTER KECIL (Bagian Paling Bawah Kiri) */}
        <div className="text-xs text-zinc-600 font-medium">
          &copy; 2026 Rengginang Sabit Corp. All rights reserved.
        </div>
      </div>

      {/* ==================== SISI KANAN: TEMPAT SIGNIN FORM ==================== */}
      <div className="flex items-center justify-center p-6 sm:p-12 bg-zinc-50">
        
        {/* LOGO HANYA MUNCUL DI HP (Saat sisi kiri hilang) */}
        <div className="absolute top-6 left-6 block lg:hidden">
          <Link to="/" className="flex items-center gap-2.5">
            <img
              src="/images/logo/rengginang-sabit.png"
              alt="RengginangSabit"
              className="h-8 w-8 rounded-lg object-cover ring-1 ring-zinc-200"
            />
            <span className="text-xs font-black uppercase tracking-wider text-zinc-800">Rengginang Sabit</span>
          </Link>
        </div>

        {/* Wadah isi form login */}
        <div className="w-full max-w-md antialiased">
          {children}
        </div>
      </div>

      {/* TOGGLER TEMA */}
      <div className="fixed bottom-6 right-6 z-50 hidden opacity-30 transition-all duration-300 hover:opacity-100 sm:block">
        <ThemeTogglerTwo />
      </div>

    </div>
  );
}