import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Button from "../../components/ui/button/Button";
import { Link } from "react-router";

export default function GuestHome() {
  return (
    <>
      <PageMeta
        title="UMKM Rengginang Sabit | Beranda"
        description="Halaman untuk guest: lihat katalog menu produk dan lokasi outlet."
      />

      <div className="space-y-6">
        <PageBreadcrumb pageTitle="Beranda (Guest)" />

        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-6">
          <h3 className="text-base font-semibold text-gray-800 dark:text-white/90">
            Selamat datang di UMKM Rengginang Sabit
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Guest/customer hanya melihat katalog produk sederhana. Data stok,
            distribusi outlet, pengiriman, dan catatan internal hanya untuk Admin.
          </p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-5">
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                Katalog Menu Produk
              </p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Lihat daftar menu customer.
              </p>
              <div className="mt-4">
                <Link to="/menu">
                  <Button size="md">Lihat Katalog</Button>
                </Link>
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-5">
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                Lokasi Outlet
              </p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Lihat alamat dan peta outlet.
              </p>
              <div className="mt-4">
                <Link to="/outlets">
                  <Button size="md" variant="outline">Lihat Lokasi</Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
            Owner dapat login untuk mengelola modal, distribusi stok, transfer outlet,
            dan melihat keuntungan.
          </div>
        </div>
      </div>
    </>
  );
}

