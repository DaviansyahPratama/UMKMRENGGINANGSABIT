import { Link } from "react-router-dom";

export default function PublicFooter() {
  return (
    <footer className="mt-20 border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">

      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-3">

        {/* BRAND */}
        <div>

          <h2 className="text-2xl font-extrabold text-amber-600">
            Rengginang Sabit
          </h2>

          <p className="mt-4 leading-relaxed text-gray-500 dark:text-gray-400">
            UMKM lokal Indonesia dengan produk rengginang premium
            berkualitas dan cita rasa nusantara.
          </p>

        </div>

        {/* MENU */}
        <div>

          <h3 className="text-lg font-bold text-gray-800 dark:text-white">
            Menu
          </h3>

          <div className="mt-4 flex flex-col gap-3">

            <Link
              to="/"
              className="text-gray-500 transition hover:text-amber-600 dark:text-gray-400"
            >
              Home
            </Link>

            <Link
              to="/menu"
              className="text-gray-500 transition hover:text-amber-600 dark:text-gray-400"
            >
              Katalog
            </Link>

            <Link
              to="/outlets"
              className="text-gray-500 transition hover:text-amber-600 dark:text-gray-400"
            >
              Outlet
            </Link>

            <Link
              to="/kontak"
              className="text-gray-500 transition hover:text-amber-600 dark:text-gray-400"
            >
              Informasi
            </Link>

          </div>

        </div>

        {/* KONTAK */}
        <div>

          <h3 className="text-lg font-bold text-gray-800 dark:text-white">
            Kontak
          </h3>

          <div className="mt-4 space-y-3 text-gray-500 dark:text-gray-400">

            <p>
              📍 Serang, Banten
            </p>

            <p>
              📞 +62 812-3456-7890
            </p>

            <p>
              ✉️ rengginangsabit@gmail.com
            </p>

          </div>

        </div>

      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-gray-200 py-5 text-center text-sm text-gray-500 dark:border-gray-800 dark:text-gray-400">

        © 2025 Rengginang Sabit. All rights reserved.

      </div>

    </footer>
  );
}