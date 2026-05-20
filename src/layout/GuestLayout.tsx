import { Outlet, Link, useLocation } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import PublicFooter from "./PublicFooter";

export default function GuestLayout() {
  const { isOwnerAuthenticated } = useAuth();

  const location = useLocation();

  const navItems = [
    {
      label: "Beranda",
      path: "/",
    },
    {
      label: "Katalog",
      path: "/menu",
    },
    {
      label: "Outlet",
      path: "/outlets",
    },
    {
      label: "Kontak",
      path: "/kontak",
    },
  ];

  return (
<<<<<<< HEAD
    // 1. Background utama hitam pekat agar menyatu dengan nuansa gelap mewah
    <div className="min-h-screen bg-black text-white relative">

      {/* NAVBAR */}
      {/* 2. Header melayang absolute, tanpa background (transparan), teks putih, dan border transparan tipis */}
      <header className="absolute top-0 left-0 right-0 z-50 border-b border-white/10 bg-transparent">
=======
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-lg dark:border-gray-800 dark:bg-gray-900/80">
>>>>>>> 508b9ac091cf0947dadfb565ee5f348825e79cbd

        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3">

<<<<<<< HEAD
            {/* Lingkaran inisial logo menggunakan warna Emas khas Logo asli */}
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E2A929] text-xl font-bold text-[#611414] shadow-lg">
              R
            </div>

            <div>
              {/* Judul brand disesuaikan: Rengginang (Putih) & Sabit (Marun khas logo) */}
              <h1 className="text-xl font-serif font-extrabold tracking-wider uppercase text-white">
                Rengginang<span className="text-[#611414]"> Sabit</span>
              </h1>

              <p className="text-[10px] tracking-widest text-gray-400 uppercase -mt-0.5">
                Gurih & Renyah Asli Ketan
              </p>
=======
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500 text-2xl shadow-lg">
              🍘
            </div>

            <div>

              <h1 className="text-2xl font-extrabold tracking-wide text-amber-600">
                Rengginang Sabit
              </h1>

              <p className="text-xs text-gray-500 dark:text-gray-400">
                Cita Rasa Tradisional Nusantara
              </p>

>>>>>>> 508b9ac091cf0947dadfb565ee5f348825e79cbd
            </div>

          </Link>

          {/* NAVIGATION */}
<<<<<<< HEAD
          {/* 3. Gaya navigasi: teks putih, uppercase, tracking renggang, dan indikator aktif warna Emas Logo */}
          <nav className="hidden items-center gap-6 md:flex text-xs font-bold tracking-widest uppercase">
=======
          <nav className="hidden items-center gap-3 md:flex">
>>>>>>> 508b9ac091cf0947dadfb565ee5f348825e79cbd

            {navItems.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
<<<<<<< HEAD
                  className={`transition duration-200 py-2 border-b-2 ${
                    isActive
                      ? "text-[#E2A929] border-[#E2A929]"
                      : "text-white border-transparent hover:text-[#E2A929]"
=======
                  className={`rounded-xl px-4 py-2 font-medium transition duration-200 ${
                    isActive
                      ? "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
                      : "text-gray-700 hover:bg-gray-100 hover:text-amber-600 dark:text-gray-300 dark:hover:bg-white/[0.05]"
>>>>>>> 508b9ac091cf0947dadfb565ee5f348825e79cbd
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

          </nav>

          {/* RIGHT BUTTON */}
<<<<<<< HEAD
          {/* 4. Tombol dengan sudut kotak tegas tanpa rounding (rounded-none), menggunakan kombinasi palet logo */}
          <div className="flex items-center gap-4 text-xs font-bold tracking-widest uppercase">

            {/* Tombol WhatsApp dengan border dan text warna Emas Logo */}
=======
          <div className="flex items-center gap-3">

>>>>>>> 508b9ac091cf0947dadfb565ee5f348825e79cbd
            <a
              href="https://wa.me/628123456789"
              target="_blank"
              rel="noopener noreferrer"
<<<<<<< HEAD
              className="hidden rounded-none border border-[#E2A929] px-5 py-2.5 text-[#E2A929] transition hover:bg-[#E2A929] hover:text-black md:inline-flex"
=======
              className="hidden rounded-xl border border-green-500 px-5 py-2 font-semibold text-green-600 transition hover:bg-green-500 hover:text-white md:inline-flex"
>>>>>>> 508b9ac091cf0947dadfb565ee5f348825e79cbd
            >
              WhatsApp
            </a>

            {isOwnerAuthenticated ? (
              <Link
                to="/dashboard"
<<<<<<< HEAD
                className="rounded-none bg-green-600 px-5 py-2.5 text-white transition hover:bg-green-700"
=======
                className="rounded-xl bg-green-600 px-5 py-2.5 font-semibold text-white transition hover:bg-green-700"
>>>>>>> 508b9ac091cf0947dadfb565ee5f348825e79cbd
              >
                Dashboard
              </Link>
            ) : (
<<<<<<< HEAD
              /* Tombol Login menggunakan warna Marun Utama dari Logo */
              <Link
                to="/signin"
                className="rounded-none bg-[#611414] px-5 py-2.5 text-white font-extrabold shadow-md transition hover:bg-[#831c1c]"
=======
              <Link
                to="/signin"
                className="rounded-xl bg-amber-500 px-5 py-2.5 font-semibold text-white shadow-md transition hover:bg-amber-600"
>>>>>>> 508b9ac091cf0947dadfb565ee5f348825e79cbd
              >
                Login
              </Link>
            )}

          </div>

        </div>

      </header>

      {/* PAGE CONTENT */}
<<<<<<< HEAD
      {/* 5. Lebar penuh tanpa padding atas bawaan agar banner Hero dapat menembus Navbar secara estetik */}
      <main className="w-full">
=======
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
>>>>>>> 508b9ac091cf0947dadfb565ee5f348825e79cbd
        <Outlet />
      </main>

      {/* FOOTER */}
      <PublicFooter />

    </div>
  );
}