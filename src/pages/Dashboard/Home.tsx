import { Link } from "react-router";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  getOutletLabel,
  loadModalPenjualan,
  loadStokDistribusi,
  loadTransferOutlet,
} from "../../lib/umkmStorage";
import { computeProfitTotals } from "../../lib/umkmCalculations";

export default function Home() {
  const modalEntries = loadModalPenjualan();
  const transferEntries = loadTransferOutlet();
  const stokEntries = loadStokDistribusi();

  const { totalModal, totalTransfer, profit } = computeProfitTotals(
    modalEntries,
    transferEntries
  );

  const formatRupiah = (n: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(n || 0);

  const latestModal = modalEntries.slice(0, 5);
  const latestTransfer = transferEntries.slice(0, 5);

  return (
    <>
      {/* Epic 1: Dashboard utama setelah login */}
      <PageMeta
        title="UMKM Dashboard Owner | UMKM Rengginang Sabit"
        description="Dashboard utama Owner: kelola modal, distribusi stok, transfer outlet, dan lihat keuntungan usaha."
      />

      <div className="space-y-6">
        <PageBreadcrumb pageTitle="Dashboard Utama Owner" />

        <div className="grid grid-cols-12 gap-4 md:gap-6">
          <div className="col-span-12 xl:col-span-4">
            <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] px-6 py-5">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Total Modal
              </p>
              <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white/90">
                {formatRupiah(totalModal)}
              </p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {modalEntries.length} catatan
              </p>
            </div>
          </div>

          <div className="col-span-12 xl:col-span-4">
            <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] px-6 py-5">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Total Pemasukan (Transfer)
              </p>
              <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white/90">
                {formatRupiah(totalTransfer)}
              </p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {transferEntries.length} transaksi
              </p>
            </div>
          </div>

          <div className="col-span-12 xl:col-span-4">
            <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] px-6 py-5">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Keuntungan
              </p>
              <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white/90">
                {formatRupiah(profit)}
              </p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Modal & transfer terbaru
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 xl:col-span-6">
            <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-6">
              <h3 className="text-base font-semibold text-gray-800 dark:text-white/90">
                Shortcut Pengelolaan
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Langsung menuju fitur sesuai kebutuhan.
              </p>
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link
                  to="/owner/modal-penjualan"
                  className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
                >
                  Modal Penjualan
                </Link>
                <Link
                  to="/owner/distribusi-stok"
                  className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
                >
                  Distribusi Stok Outlet
                </Link>
                <Link
                  to="/owner/transfer-outlet"
                  className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
                >
                  Transfer Outlet
                </Link>
                <Link
                  to="/owner/keuntungan"
                  className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
                >
                  Perhitungan Keuntungan
                </Link>

                <Link
                  to="/owner/dashboard-keuntungan"
                  className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
                >
                  Dashboard Keuntungan
                </Link>
                <Link
                  to="/owner/statistik-outlet"
                  className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
                >
                  Statistik Outlet
                </Link>
              </div>
            </div>
          </div>

          <div className="col-span-12 xl:col-span-6 space-y-4">
            <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-6">
              <h3 className="text-base font-semibold text-gray-800 dark:text-white/90">
                Ringkasan Terbaru
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Modal, transfer, dan distribusi stok terbaru.
              </p>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-xl bg-gray-50 dark:bg-white/[0.03] p-4">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Modal Terbaru
                  </p>
                  <p className="mt-1 font-semibold text-gray-900 dark:text-white/90">
                    {latestModal.length} item
                  </p>
                </div>
                <div className="rounded-xl bg-gray-50 dark:bg-white/[0.03] p-4">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Transfer Terbaru
                  </p>
                  <p className="mt-1 font-semibold text-gray-900 dark:text-white/90">
                    {latestTransfer.length} item
                  </p>
                </div>
                <div className="rounded-xl bg-gray-50 dark:bg-white/[0.03] p-4">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Stok Terdistribusi
                  </p>
                  <p className="mt-1 font-semibold text-gray-900 dark:text-white/90">
                    {stokEntries.reduce((acc, x) => acc + (x.quantity || 0), 0)} pcs
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-6">
              <h3 className="text-base font-semibold text-gray-800 dark:text-white/90">
                Daftar Modal & Transfer (Top 5)
              </h3>
              <div className="mt-4 space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-800 dark:text-white/90">
                    Modal Penjualan
                  </h4>
                  <div className="mt-3 overflow-x-auto">
                    <Table className="min-w-[520px]">
                      <TableHeader>
                        <TableRow>
                          <TableCell isHeader className="py-3">
                            Tanggal
                          </TableCell>
                          <TableCell isHeader className="py-3">
                            Keterangan
                          </TableCell>
                          <TableCell isHeader className="py-3">
                            Nominal
                          </TableCell>
                        </TableRow>
                      </TableHeader>
                      <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {latestModal.map((m) => (
                          <TableRow key={m.id}>
                            <TableCell className="py-3 text-gray-700 dark:text-gray-300">
                              {m.date}
                            </TableCell>
                            <TableCell className="py-3 text-gray-700 dark:text-gray-300">
                              {m.description}
                            </TableCell>
                            <TableCell className="py-3 text-gray-700 dark:text-gray-300">
                              {formatRupiah(m.amount)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-800 dark:text-white/90">
                    Transfer Outlet (Pemasukan)
                  </h4>
                  <div className="mt-3 overflow-x-auto">
                    <Table className="min-w-[520px]">
                      <TableHeader>
                        <TableRow>
                          <TableCell isHeader className="py-3">
                            Tanggal
                          </TableCell>
                          <TableCell isHeader className="py-3">
                            Outlet
                          </TableCell>
                          <TableCell isHeader className="py-3">
                            Nominal
                          </TableCell>
                        </TableRow>
                      </TableHeader>
                      <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {latestTransfer.map((t) => (
                          <TableRow key={t.id}>
                            <TableCell className="py-3 text-gray-700 dark:text-gray-300">
                              {t.date}
                            </TableCell>
                            <TableCell className="py-3 text-gray-700 dark:text-gray-300">
                              {getOutletLabel(t.outletId)}
                            </TableCell>
                            <TableCell className="py-3 text-gray-700 dark:text-gray-300">
                              {formatRupiah(t.amount)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
