import React, { useState } from 'react';

const Navbar: React.FC = () => {
  // State untuk menu mobile (hamburger menu) jika diklik
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="absolute top-0 left-0 w-full z-50 bg-transparent text-white border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* 1. LOGO (Kiri) */}
          <div className="flex-shrink-0 flex items-center gap-2">
            {/* Ganti '/logo.png' dengan path logo bulat oranyemu kalau ada */}
            <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center font-bold text-black text-xl">
              R
            </div>
            <div className="flex flex-col">
              <span className="font-serif tracking-wider text-xl font-bold uppercase">
                Rengginang<span className="text-yellow-500"> Sabit</span>
              </span>
              <span className="text-[10px] text-gray-400 tracking-widest uppercase -mt-1">
                Cita Rasa Nusantara
              </span>
            </div>
          </div>

          {/* 2. MENU NAVIGASI (Tengah) - Sembunyi di HP, Muncul di Laptop */}
          <div className="hidden md:flex space-x-8 text-sm font-semibold tracking-wider uppercase">
            <a href="#home" className="text-yellow-500 transition">Beranda</a>
            <a href="#katalog" className="hover:text-yellow-500 transition">Katalog</a>
            <a href="#outlet" className="hover:text-yellow-500 transition">Outlet</a>
            <a href="#kontak" className="hover:text-yellow-500 transition">Kontak</a>
          </div>

          {/* 3. TOMBOL RESERVASI / LOGIN (Kanan) - Gaya D'Bento */}
          <div className="hidden md:flex items-center space-x-4">
            <a 
              href="https://wa.me/your-number" 
              target="_blank" 
              rel="noreferrer"
              className="border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black font-semibold text-xs px-5 py-2.5 tracking-widest uppercase transition duration-300"
            >
              WhatsApp
            </a>
            <button className="bg-yellow-600 hover:bg-yellow-700 text-black font-bold text-xs px-5 py-2.5 tracking-widest uppercase transition duration-300">
              Login
            </button>
          </div>

          {/* 4. HAMBURGER MENU (Kanan Banget) - Muncul saat di HP */}
          <div className="flex md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-yellow-500 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* MENU RESPONSIVE UNTUK HP (Akan muncul jika hamburger diklik) */}
      {isOpen && (
        <div className="md:hidden bg-black/95 absolute top-20 left-0 w-full border-b border-white/10 px-4 pt-2 pb-4