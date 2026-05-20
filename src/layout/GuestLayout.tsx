import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function GuestLayout() {
  const { isOwnerAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-amber-50">

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b bg-white shadow-sm">

        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

          {/* LOGO */}
          <div>
            <h1 className="text-3xl font-extrabold text-amber-700">
              Rengginang Sabit
            </h1>

            <p className="text-xs text-gray-500">
              Cita Rasa Tradisional Nusantara
            </p>
          </div>

          {/* NAVIGATION */}
          <nav className="flex items-center gap-6">

            <ul className="flex items-center gap-8">

              <li>
                <Link
                  to="/"
                  className="font-medium text-gray-700 hover:text-amber-700 transition"
                >
                  Beranda
                </Link>
              </li>

              <li>
                <Link
                  to="/menu"
                  className="font-medium text-gray-700 hover:text-amber-700 transition"
                >
                  Produk
                </Link>
              </li>

              <li>
                <Link
                  to="/outlets"
                  className="font-medium text-gray-700 hover:text-amber-700 transition"
                >
                  Outlet
                </Link>
              </li>

            </ul>

            {/* LOGIN / DASHBOARD BUTTON */}
            {isOwnerAuthenticated ? (
              <Link
                to="/dashboard"
                className="rounded-xl bg-green-600 px-5 py-2.5 font-medium text-white transition hover:bg-green-700"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                to="/signin"
                className="rounded-xl bg-amber-600 px-5 py-2.5 font-medium text-white transition hover:bg-amber-700"
              >
                Login Admin
              </Link>
            )}

          </nav>

        </div>

      </header>

      {/* PAGE CONTENT */}
      <main className="mx-auto max-w-7xl p-6">
        <Outlet />
      </main>

    </div>
  );
}