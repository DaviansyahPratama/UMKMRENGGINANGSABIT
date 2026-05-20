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
<<<<<<< HEAD
    // CANVAS UTAMA: Dipaksa hitam pekat (#050505) di semua mode (light/dark)
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#050505] text-white font-sans overflow-hidden px-4 py-12 selection:bg-[#E2A929] selection:text-black z-1">
      
      {/* ==================== ORNAMEN DEKORATIF MODERN ==================== */}
      {/* Pendaran Cahaya Marun & Emas di Latar Belakang */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#611414]/20 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#E2A929]/10 blur-[150px] pointer-events-none" />
      
      {/* Efek Pola Garis Grid Minimalis */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)", backgroundSize: "50px 50px" }} />

      {/* Ornamen Garis Abstrak Bawaan Template (Dibuat samar & elegan) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center scale-125">
        <GridShape />
      </div>

      {/* FLOATING BRANDING LOGO (Di Atas Formulir) */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 lg:left-12 lg:translate-x-0 z-50 flex items-center gap-3">
        <Link to="/" className="flex items-center gap-3 group">
          {/* Bingkai Kotak Siku Tajam Inisial RS */}
          <div className="w-10 h-10 border border-white/20 bg-black flex items-center justify-center group-hover:border-[#E2A929] transition-colors duration-300">
            <span className="text-[#E2A929] font-serif font-bold text-sm tracking-tighter">RS</span>
          </div>
          <div className="hidden sm:block text-left">
            <span className="block text-xs font-bold uppercase tracking-[0.2em] text-white">Rengginang Sabit</span>
            <span className="block text-[9px] text-zinc-500 uppercase tracking-widest font-medium">Management</span>
          </div>
        </Link>
      </div>

      {/* ==================== WADAH KONTEN FORMULIR (CENTRIC GLASS) ==================== */}
      {/* Anak komponen (SignInForm / SignUpForm) dirender tepat di tengah dalam kotak premium */}
      <div className="relative w-full max-w-[460px] z-10 bg-white/[0.01] backdrop-blur-md border border-white/10 p-1 md:p-2 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] transition-all duration-300 hover:border-white/15">
        
        {/* Garis Aksen Emas Pembatas Atas Wadah */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#E2A929] to-transparent" />
        
        {/* Render Formulir Asli (<SignInForm /> atau <SignUpForm />) */}
        <div className="bg-black/40 p-6 md:p-8">
          {children}
        </div>
      </div>

      {/* TOMBOL PENGATUR TEMA (Tetap dipertahankan di pojok bawah sesuai template asli) */}
      <div className="fixed z-50 hidden bottom-6 right-6 sm:block opacity-40 hover:opacity-100 transition-opacity duration-300">
        <ThemeTogglerTwo />
      </div>
    </div>
  );
}
=======
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <div className="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900 sm:p-0">
        {children}
        <div className="items-center hidden w-full h-full lg:w-1/2 bg-brand-950 dark:bg-white/5 lg:grid">
          <div className="relative flex items-center justify-center z-1">
            {/* <!-- ===== Common Grid Shape Start ===== --> */}
            <GridShape />
            <div className="flex flex-col items-center max-w-xs">
              <Link to="/" className="block mb-4">
                <img
                  width={231}
                  height={48}
                  src="/images/logo/auth-logo.svg"
                  alt="Logo"
                />
              </Link>
              <p className="text-center text-gray-400 dark:text-white/60">
                Free and Open-Source Tailwind CSS Admin Dashboard Template
              </p>
            </div>
          </div>
        </div>
        <div className="fixed z-50 hidden bottom-6 right-6 sm:block">
          <ThemeTogglerTwo />
        </div>
      </div>
    </div>
  );
}
>>>>>>> 508b9ac091cf0947dadfb565ee5f348825e79cbd
