import { useMemo, useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import Button from "../../components/ui/button/Button";
import { Link } from "react-router";
import {
  loadModalPenjualan,
  loadTransferOutlet,
} from "../../lib/umkmStorage";
import { computeProfitSeriesWeekly, computeProfitTotals } from "../../lib/umkmCalculations";

function formatRupiah(n: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n || 0);
}

export default function Keuntungan() {
  const [refreshKey, setRefreshKey] = useState(0);

  const modalEntries = useMemo(() => loadModalPenjualan(), [refreshKey]);
  const transferEntries = useMemo(() => loadTransferOutlet(), [refreshKey]);

  const totals = useMemo(
    () => computeProfitTotals(modalEntries, transferEntries),
    [modalEntries, transferEntries]
  );

  const weekly = useMemo(
    () => computeProfitSeriesWeekly(modalEntries, transferEntries, 8),
    [modalEntries, transferEntries]
  );

  return (
    <>
      <PageMeta
        title="Keuntungan Usaha | UMKM Rengginang Sabit"
        description="Perhitungan keuntungan usaha berdasarkan modal dan transfer outlet."
      />
      <div className="space-y-6">
        <PageBreadcrumb pageTitle="Perhitungan Keuntungan (KF05)" />

        <div className="grid grid-cols-12 gap-4 md:gap-6">
          <div className="col-span-12 xl:col-span-4">
            <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] px-6 py-5">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Modal (Pengeluaran)
              </p>
              <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white/90">
                {formatRupiah(totals.totalModal)}
              </p>
            </div>
          </div>

          <div className="col-span-12 xl:col-span-4">
            <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] px-6 py-5">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Pemasukan (Transfer Outlet)
              </p>
              <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white/90">
                {formatRupiah(totals.totalTransfer)}
              </p>
            </div>
          </div>

          <div className="col-span-12 xl:col-span-4">
            <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] px-6 py-5">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Keuntungan
              </p>
              <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white/90">
                {formatRupiah(totals.profit)}
              </p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Profit = total pemasukan - total modal
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h3 className="text-base font-semibold text-gray-800 dark:text-white/90">
                Ringkasan Profit per Minggu (8 minggu terakhir)
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Sisi “hasil perhitungan” agar data KF05 terlihat jelas.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setRefreshKey((k) => k + 1)}
              >
                Refresh
              </Button>
              <Link
                to="/owner/dashboard-keuntungan"
                className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
              >
                Buka Dashboard Keuntungan
              </Link>
            </div>
          </div>

          <div className="mt-5 overflow-x-auto">
            <Table className="min-w-[720px]">
              <TableHeader>
                <TableRow>
                  <TableCell isHeader className="py-3">
                    Periode
                  </TableCell>
                  <TableCell isHeader className="py-3">
                    Profit (IDR)
                  </TableCell>
                  <TableCell isHeader className="py-3">
                    Pemasukan (Transfer)
                  </TableCell>
                  <TableCell isHeader className="py-3">
                    Modal (Pengeluaran)
                  </TableCell>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                {weekly.labels.map((label, idx) => (
                  <TableRow key={label}>
                    <TableCell className="py-3 text-gray-700 dark:text-gray-300">
                      {label}
                    </TableCell>
                    <TableCell className="py-3 text-gray-700 dark:text-gray-300">
                      {formatRupiah(weekly.profits[idx])}
                    </TableCell>
                    <TableCell className="py-3 text-gray-700 dark:text-gray-300">
                      {formatRupiah(weekly.totalTransfers[idx])}
                    </TableCell>
                    <TableCell className="py-3 text-gray-700 dark:text-gray-300">
                      {formatRupiah(weekly.totalModal[idx])}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}

