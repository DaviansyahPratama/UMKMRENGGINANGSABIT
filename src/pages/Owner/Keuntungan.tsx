import { useMemo, useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
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
        description="Perhitungan analisis keuntungan usaha bersih berdasarkan akumulasi modal produksi dan transfer dana outlet."
      />
      
      <div className="space-y-6 p-6 bg-gray-50 dark:bg-slate-900/40 min-h-screen text-gray-900 dark:text-slate-100">
        
        {/* BREADCRUMB */}
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-slate-800 pb-4">
          <div className="text-gray-900 dark:text-white">
            <PageBreadcrumb pageTitle="Perhitungan Keuntungan" />
          </div>
        </div>

        {/* BARIS KARTU RINGKASAN FINANSIAL */}
        <div className="grid grid-cols-12 gap-5">
          {/* KARTU 1: MODAL */}
          <div className="col-span-12 md:col-span-4">
            <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950/40">
              <div className="absolute top-0 left-0 h-full w-1 bg-rose-500" />
              <p className="text-xs font-semibold text-gray-400 dark:text-slate-400 uppercase tracking-wider pl-1">
                Modal (Pengeluaran)
              </p>
              <p className="mt-2 text-xl font-bold text-gray-900 dark:text-white pl-1">
                {formatRupiah(totals.totalModal)}
              </p>
            </div>
          </div>

          {/* KARTU 2: PEMASUKAN */}
          <div className="col-span-12 md:col-span-4">
            <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950/40">
              <div className="absolute top-0 left-0 h-full w-1 bg-emerald-500" />
              <p className="text-xs font-semibold text-gray-400 dark:text-slate-400 uppercase tracking-wider pl-1">
                Pemasukan (Transfer Outlet)
              </p>
              <p className="mt-2 text-xl font-bold text-gray-900 dark:text-white pl-1">
                {formatRupiah(totals.totalTransfer)}
              </p>
            </div>
          </div>

          {/* KARTU 3: KEUNTUNGAN BERSIH */}
          <div className="col-span-12 md:col-span-4">
            <div className="relative overflow-hidden rounded-xl border border-amber-200 bg-amber-50/20 p-5 shadow-sm dark:border-amber-900/30 dark:bg-amber-950/10">
              <div className="absolute top-0 left-0 h-full w-1 bg-amber-500" />
              <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider pl-1">
                Keuntungan Bersih (Profit) 🌟
              </p>
              <p className="mt-2 text-xl font-bold text-amber-600 dark:text-amber-400 pl-1">
                {formatRupiah(totals.profit)}
              </p>
            </div>
          </div>
        </div>

        {/* KONTEN UTAMA TABEL */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/20">
          
          {/* HEADER TABEL ACTION */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                Ringkasan Profit Tren Mingguan
              </h3>
              <p className="text-xs text-gray-400 dark:text-slate-400 mt-0.5">
                Evaluasi matriks parameter lembar data (Rentang 8 Minggu Terakhir).
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 px-3.5 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer"
                onClick={() => setRefreshKey((k) => k + 1)}
              >
                Segarkan Data
              </button>
              
              <Link
                to="/owner/dashboard-keuntungan"
                className="inline-flex items-center justify-center rounded-lg border border-amber-200 bg-amber-50/60 px-3.5 py-2 text-xs font-semibold text-amber-700 shadow-xs hover:bg-amber-50 dark:border-amber-900/40 dark:bg-amber-950/20 dark:text-amber-400 dark:hover:bg-amber-950/40 transition-colors text-center"
              >
                Buka Visual Dashboard 📈
              </Link>
            </div>
          </div>

          {/* KONSTRUKSI TABEL MODEREN DENGAN CODES GRID ASLI */}
          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-950">
            <div className="min-w-[760px] w-full text-left text-xs">
              
              {/* BARIS JUDUL / THEAD (Grid 4 Kolom) */}
              <div className="bg-gray-50 dark:bg-slate-900/50 border-b border-gray-200 dark:border-slate-800 grid grid-cols-4 py-3.5 px-6 font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                <div>Periode Mingguan</div>
                <div>Profit Bersih (IDR)</div>
                <div>Arus Pemasukan</div>
                <div>Beban Modal</div>
              </div>
              
              {/* BARIS DATA / TBODY */}
              <div className="divide-y divide-gray-100 dark:divide-slate-800/60">
                {weekly.labels.length === 0 ? (
                  <div className="text-center text-gray-400 dark:text-slate-500 py-10 font-medium">
                    Belum ada data keuangan berkala yang terekam.
                  </div>
                ) : (
                  weekly.labels.map((label, idx) => {
                    const currentProfit = weekly.profits[idx] || 0;
                    return (
                      <div 
                        key={label} 
                        className="grid grid-cols-4 items-center py-4 px-6 hover:bg-gray-50/50 dark:hover:bg-slate-900/20 transition-colors"
                      >
                        {/* 1. Kolom Periode */}
                        <div className="font-bold text-gray-700 dark:text-slate-300">
                          {label}
                        </div>
                        
                        {/* 2. Kolom Profit Bersih */}
                        <div className={`font-bold flex items-center gap-1.5 ${currentProfit >= 0 ? "text-amber-600 dark:text-amber-400" : "text-rose-600 dark:text-rose-400"}`}>
                          {formatRupiah(currentProfit)}
                          {currentProfit < 0 && (
                            <span className="text-[10px] font-medium bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 px-1 py-0.5 rounded">
                              Defisit
                            </span>
                          )}
                        </div>
                        
                        {/* 3. Kolom Arus Pemasukan */}
                        <div className="font-medium text-gray-600 dark:text-slate-400">
                          {formatRupiah(weekly.totalTransfers[idx])}
                        </div>
                        
                        {/* 4. Kolom Beban Modal */}
                        <div className="font-medium text-gray-600 dark:text-slate-400">
                          {formatRupiah(weekly.totalModal[idx])}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

            </div>
          </div>
          
        </div>
      </div>
    </>
  );
}