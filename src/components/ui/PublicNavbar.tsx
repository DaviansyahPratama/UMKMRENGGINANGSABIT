import { Link, useLocation } from "react-router-dom";

export default function PublicNavbar() {
  const location = useLocation();

  const navItems = [
    {
      label: "Home",
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
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-lg dark:border-gray-800 dark:bg-gray-900/80">

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500 text-2xl shadow-lg">
            🍘
          </div>

          <div>

            <h1 className="text-2xl font-extrabold tracking-wide text-amber-600">
              Rengginang Sabit
            </h1>

            <p className="text-xs text-gray-500 dark:text-gray-400">
              UMKM Lokal Indonesia
            </p>

          </div>

        </Link>

        {/* MENU */}
        <nav className="hidden items-center gap-2 md:flex">

          {navItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`rounded-xl px-4 py-2 font-medium transition duration-200 ${
                  isActive
                    ? "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
                    : "text-gray-700 hover:bg-gray-100 hover:text-amber-600 dark:text-gray-300 dark:hover:bg-white/[0.05]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}

        </nav>

        {/* RIGHT BUTTON */}
        <div className="flex items-center gap-3">

          <a
            href="https://wa.me/628123456789"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-xl border border-green-500 px-5 py-2 font-semibold text-green-600 transition hover:bg-green-500 hover:text-white md:inline-flex"
          >
            WhatsApp
          </a>

          <Link
            to="/signin"
            className="rounded-xl bg-amber-500 px-5 py-2 font-semibold text-white shadow-md transition hover:bg-amber-600"
          >
            Login
          </Link>

        </div>

      </div>

    </header>
  );
}