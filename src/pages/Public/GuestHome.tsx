import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";
import { Link } from "react-router-dom";

export default function GuestHome() {
  return (
    <>
      <PageMeta
        title="Rengginang Sabit | Beranda"
        description="Website resmi UMKM Rengginang Sabit."
      />

      <div className="space-y-10">

        {/* HERO SECTION */}
        <section className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">

          <div className="grid lg:grid-cols-2 items-center">

            {/* LEFT */}
            <div className="p-8 lg:p-14">

              <span className="inline-flex rounded-full bg-amber-100 px-4 py-2 text-sm font-medium text-amber-700">
                UMKM Lokal Indonesia
              </span>

              <h1 className="mt-6 text-5xl font-extrabold leading-tight text-gray-800 dark:text-white">
                Rengginang Sabit
              </h1>

              <p className="mt-5 text-lg leading-relaxed text-gray-500 dark:text-gray-400">
                Nikmati rengginang premium dengan cita rasa tradisional
                nusantara yang dikemas modern, higienis, dan berkualitas.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">

                <Link to="/menu">
                  <Button size="md">
                    Lihat Produk
                  </Button>
                </Link>

                <Link to="/outlets">
                  <Button size="md" variant="outline">
                    Cari Outlet
                  </Button>
                </Link>

              </div>

            </div>

            {/* RIGHT */}
            <div className="flex h-full items-center justify-center bg-amber-100 p-10">
              <span className="text-9xl">
                🍘
              </span>
            </div>

          </div>

        </section>

        {/* STATISTIK */}
        <section className="grid grid-cols-1 gap-6 md:grid-cols-3">

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
            <h2 className="text-4xl font-extrabold text-amber-700">
              10+
            </h2>

            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Varian Produk
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
            <h2 className="text-4xl font-extrabold text-amber-700">
              25+
            </h2>

            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Outlet Tersedia
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
            <h2 className="text-4xl font-extrabold text-amber-700">
              1000+
            </h2>

            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Pelanggan Puas
            </p>
          </div>

        </section>

        {/* MENU CEPAT */}
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">

          {/* KATALOG */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-white/[0.03]">

            <h3 className="text-xl font-bold text-gray-800 dark:text-white">
              Katalog Produk
            </h3>

            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Lihat berbagai varian rengginang premium favorit pelanggan.
            </p>

            <div className="mt-6">
              <Link to="/menu">
                <Button size="md">
                  Lihat Katalog
                </Button>
              </Link>
            </div>

          </div>

          {/* OUTLET */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-white/[0.03]">

            <h3 className="text-xl font-bold text-gray-800 dark:text-white">
              Lokasi Outlet
            </h3>

            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Temukan outlet Rengginang Sabit terdekat di kotamu.
            </p>

            <div className="mt-6">
              <Link to="/outlets">
                <Button size="md" variant="outline">
                  Lihat Outlet
                </Button>
              </Link>
            </div>

          </div>

        </section>

      </div>
    </>
  );
}