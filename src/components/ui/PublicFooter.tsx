import { Link } from "react-router-dom";

// Social Media Icons
const InstagramIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.266.069 1.646.069 4.85 0 3.204-.012 3.584-.07 4.85-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.322a1.44 1.44 0 110-2.881 1.44 1.44 0 010 2.881z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371 0-.57 0-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-3.055 2.028-4.885 5.511-4.885 8.98 0 1.52.37 3.011 1.07 4.338l-1.134 4.160 4.308-1.129c1.268.671 2.7 1.025 4.169 1.025h.004c5.467 0 9.926-4.446 9.926-9.93 0-2.65-.994-5.153-2.8-7.035-1.805-1.882-4.206-2.92-6.52-2.92m8.556-7.746C6.649 1.245 2.05 5.797 2.05 11.3c0 2.92.856 5.664 2.475 8.018L1.666 23l4.573-1.196c2.203 1.202 4.694 1.838 7.261 1.838 5.517 0 10.135-4.587 10.135-10.22 0-2.725-1.045-5.291-2.947-7.218-1.902-1.927-4.438-2.989-7.135-2.989" />
  </svg>
);

const ShopeeIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
  </svg>
);

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
              📍 Pekanbaru, Riau, Indonesia
            </p>

            <p>
              📞 +62 853-5110-1349
            </p>

          </div>

          <div className="mt-5 flex gap-3">
            <a
              href="https://www.instagram.com/rengginang_sabit"
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border p-2 text-gray-500 transition hover:bg-pink-100 hover:text-pink-600 dark:text-gray-400 dark:hover:bg-pink-900/30 dark:hover:text-pink-400"
              title="Instagram"
            >
              <InstagramIcon />
            </a>

            <a
              href="https://wa.me/6285351101349"
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border p-2 text-gray-500 transition hover:bg-green-100 hover:text-green-600 dark:text-gray-400 dark:hover:bg-green-900/30 dark:hover:text-green-400"
              title="WhatsApp"
            >
              <WhatsAppIcon />
            </a>

            <a
              href="https://shopee.co.id"
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border p-2 text-gray-500 transition hover:bg-orange-100 hover:text-orange-600 dark:text-gray-400 dark:hover:bg-orange-900/30 dark:hover:text-orange-400"
              title="Shopee"
            >
              <ShopeeIcon />
            </a>
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