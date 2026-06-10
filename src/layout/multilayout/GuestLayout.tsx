import { Outlet, Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import PublicFooter from "../../components/ui/PublicFooter";

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
      label: "Informasi",
      path: "/kontak",
    },
  ];

  return (
    // 1. Background utama hitam pekat agar menyatu dengan nuansa gelap mewah
    <div className="min-h-screen bg-black text-white relative">

      {/* NAVBAR */}
      {/* 2. Header melayang absolute, tanpa background (transparan), teks putih, dan border transparan tipis */}
      <header className="absolute top-0 left-0 right-0 z-50 border-b border-white/10 bg-transparent">

        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-3">

            {/* Logo image */}
            <img
              src="/images/logo/rengginang-sabit.png"
              alt="RengginangSabit"
              className="h-10 w-10 rounded-full object-cover shadow-lg"
            />

            <div>
              {/* Judul brand disesuaikan: Rengginang (Putih) & Sabit (Marun khas logo) */}
              <h1 className="text-xl font-serif font-extrabold tracking-wider uppercase text-white">
                Rengginang<span className="text-[#611414]"> Sabit</span>
              </h1>

              <p className="text-[10px] tracking-widest text-gray-400 uppercase -mt-0.5">
                Gurih & Renyah Asli Ketan
              </p>
            </div>

          </Link>

          {/* NAVIGATION */}
          {/* 3. Gaya navigasi: teks putih, uppercase, tracking renggang, dan indikator aktif warna Emas Logo */}
          <nav className="hidden items-center gap-6 md:flex text-xs font-bold tracking-widest uppercase">

            {navItems.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`transition duration-200 py-2 border-b-2 ${
                    isActive
                      ? "text-[#E2A929] border-[#E2A929]"
                      : "text-white border-transparent hover:text-[#E2A929]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

          </nav>

          {/* RIGHT BUTTON */}
          {/* 4. Tombol dengan sudut kotak tegas tanpa rounding (rounded-none), menggunakan kombinasi palet logo */}
          <div className="flex items-center gap-4 text-xs font-bold tracking-widest uppercase">

            {/* Tombol WhatsApp dengan border dan text warna Emas Logo */}
            <a
              href="https://wa.me/628123456789"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-none border border-[#E2A929] px-5 py-2.5 text-[#E2A929] transition hover:bg-[#E2A929] hover:text-black md:inline-flex"
            >
              WhatsApp
            </a>

            {isOwnerAuthenticated ? (
              <Link
                to="/dashboard"
                className="rounded-none bg-green-600 px-5 py-2.5 text-white transition hover:bg-green-700"
              >
                Dashboard
              </Link>
            ) : (
              /* Tombol Login menggunakan warna Marun Utama dari Logo */
              <Link
                to="/signin"
                className="rounded-none bg-[#611414] px-5 py-2.5 text-white font-extrabold shadow-md transition hover:bg-[#831c1c]"
              >
                Login
              </Link>
            )}

          </div>

        </div>

      </header>

      {/* PAGE CONTENT */}
      {/* 5. Lebar penuh tanpa padding atas bawaan agar banner Hero dapat menembus Navbar secara estetik */}
      <main className="w-full">
        <Outlet />
      </main>

      {/* FOOTER */}
      <PublicFooter />

    </div>
  );
}