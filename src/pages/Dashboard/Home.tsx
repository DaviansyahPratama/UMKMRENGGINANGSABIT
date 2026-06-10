import { Link } from "react-router";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
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
      <PageMeta
        title="UMKM Dashboard Owner | UMKM Rengginang Sabit"
        description="Dashboard utama Owner: kelola modal, distribusi stok, transfer outlet, dan lihat keuntungan usaha."
      />

      {/* Container utama transparan di mode dark agar melebur dengan layout dasar aplikasi */}
      <div className="space-y-6 lg:space-y-8 bg-transparent text-gray-900 dark:text-slate-100 min-h-screen">
        {/* BREADCRUMB HEADER */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 dark:border-slate-800/60 pb-5">
          <div className="text-gray-900 dark:text-white [&_*]:text-gray-600 dark:[&_*]:text-slate-200">
            <PageBreadcrumb pageTitle="Dashboard Utama Owner" />
          </div>
        </div>

        {/* METRIC CARDS */}
        <div className="grid grid-cols-12 gap-6">
          
          {/* Card 1: Total Modal */}
          <div className="col-span-12 sm:col-span-6 xl:col-span-4">
            <div className="group relative overflow-hidden rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 dark:border-slate-800/80 dark:bg-[#111c44]/60 dark:backdrop-blur-md dark:shadow-2xl flex items-center justify-between">
              <div className="absolute top-0 left-0 h-full w-[4px] bg-red-700" />
              <div className="space-y-2 pl-2">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-slate-400">
                  Total Modal
                </p>
                <p className="text-3xl font-black tracking-tight text-gray-900 dark:text-white">
                  {formatRupiah(totalModal)}
                </p>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-800 dark:bg-red-950/40 dark:text-red-400 border border-red-100 dark:border-red-900/30">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse"></span>
                  {modalEntries.length} Catatan
                </span>
              </div>
              <div className="rounded-xl bg-red-50 p-3.5 text-red-700 dark:bg-slate-900/80 dark:text-red-400 group-hover:bg-red-100/50 dark:group-hover:bg-slate-800 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
              </div>
            </div>
          </div>

          {/* Card 2: Total Pemasukan */}
          <div className="col-span-12 sm:col-span-6 xl:col-span-4">
            <div className="group relative overflow-hidden rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 dark:border-slate-800/80 dark:bg-[#111c44]/60 dark:backdrop-blur-md dark:shadow-2xl flex items-center justify-between">
              <div className="absolute top-0 left-0 h-full w-[4px] bg-amber-500" />
              <div className="space-y-2 pl-2">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-slate-400">
                  Total Pemasukan (Transfer)
                </p>
                <p className="text-3xl font-black tracking-tight text-gray-900 dark:text-white">
                  {formatRupiah(totalTransfer)}
                </p>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-800 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-100 dark:border-amber-900/30">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                  {transferEntries.length} Transaksi
                </span>
              </div>
              <div className="rounded-xl bg-amber-50 p-3.5 text-amber-600 dark:bg-slate-900/80 dark:text-amber-400 group-hover:bg-amber-100/50 dark:group-hover:bg-slate-800 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 14 4-4H8z"/><path d="M12 2v20"/></svg>
              </div>
            </div>
          </div>

          {/* Card 3: Keuntungan Bersih */}
          <div className="col-span-12 sm:col-span-12 xl:col-span-4">
            <div className="group relative overflow-hidden rounded-2xl border border-amber-200 bg-gradient-to-br from-white to-amber-50/30 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 dark:border-amber-500/20 dark:bg-gradient-to-br dark:from-[#111c44]/80 dark:to-amber-950/20 dark:shadow-2xl flex items-center justify-between">
              <div className="absolute top-0 left-0 h-full w-[4px] bg-gradient-to-b from-red-600 to-amber-500" />
              <div className="space-y-2 pl-2">
                <p className="text-xs font-bold uppercase tracking-widest text-amber-800 dark:text-amber-400">
                  Keuntungan Bersih
                </p>
                <p className="text-3xl font-black tracking-tight text-amber-600 dark:text-amber-300">
                  {formatRupiah(profit)}
                </p>
                <p className="text-xs text-gray-400 dark:text-slate-400 font-medium">
                  Kalkulasi otomatis sistem Sabit
                </p>
              </div>
              <div className="rounded-xl bg-red-900 text-amber-400 dark:bg-red-950/80 dark:border dark:border-red-900 p-3.5 shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION UTAMA - LAYOUT DUA SISI */}
        <div className="grid grid-cols-12 gap-8 items-start">
          
          {/* SISI KIRI: Shortcut Menu Pengelolaan */}
          <div className="col-span-12 xl:col-span-4">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-800/80 dark:bg-[#111c44]/60 dark:backdrop-blur-md dark:shadow-xl">
              <div className="border-b border-gray-100 dark:border-slate-800 pb-4 mb-5">
                <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-amber-500" />
                  Shortcut Pengelolaan
                </h3>
                <p className="mt-1 text-xs text-gray-400 dark:text-slate-400">
                  Akses cepat bilah kontrol operasional.
                </p>
              </div>
              
              <div className="flex flex-col gap-2.5">
                {[
                  { to: "/owner/modal-penjualan", label: "Modal Penjualan" },
                  { to: "/owner/distribusi-stok", label: "Distribusi Stok Outlet" },
                  { to: "/owner/transfer-outlet", label: "Transfer Outlet" },
                  { to: "/owner/keuntungan", label: "Perhitungan Keuntungan" },
                  { to: "/owner/dashboard-keuntungan", label: "Dashboard Keuntungan" },
                  { to: "/owner/statistik-outlet", label: "Statistik Outlet" }
                ].map((link, idx) => (
                  <Link
                    key={idx}
                    to={link.to}
                    className="group flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50/60 px-4 py-3.5 text-xs font-bold text-gray-700 transition-all duration-200 hover:bg-amber-500 hover:text-slate-950 hover:border-amber-500 dark:border-slate-800/60 dark:bg-slate-950/40 dark:text-slate-300 dark:hover:bg-amber-500 dark:hover:text-slate-950"
                  >
                    <span className="truncate">{link.label}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-current flex-shrink-0">
                      <path d="m9 18 6-6-6-6"/>
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* SISI KANAN: Ringkasan Kuantitas & Preview Tabel */}
          <div className="col-span-12 xl:col-span-8 space-y-8">
            
            {/* Widget Kuantitas Data */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-800/80 dark:bg-[#111c44]/60 dark:backdrop-blur-md dark:shadow-xl">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4">
                Analisis Kuantitas Data
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="rounded-xl bg-gray-50/80 p-4 border border-gray-200 dark:bg-slate-950/60 dark:border-slate-800/50">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-slate-400">Modal</p>
                  <p className="mt-1 text-xl font-black text-gray-900 dark:text-white">{modalEntries.length} <span className="text-xs font-normal text-gray-400 dark:text-slate-500">item</span></p>
                </div>
                <div className="rounded-xl bg-gray-50/80 p-4 border border-gray-200 dark:bg-slate-950/60 dark:border-slate-800/50">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-slate-400">Transfer</p>
                  <p className="mt-1 text-xl font-black text-gray-900 dark:text-white">{transferEntries.length} <span className="text-xs font-normal text-gray-400 dark:text-slate-500">item</span></p>
                </div>
                <div className="rounded-xl bg-amber-50 p-4 border border-amber-200/60 dark:bg-amber-950/20 dark:border-amber-900/30">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">Stok Distribusi</p>
                  <p className="mt-1 text-xl font-black text-amber-600 dark:text-amber-300">
                    {stokEntries.reduce((acc, x) => acc + (x.quantity || 0), 0)} <span className="text-xs font-normal text-amber-500 dark:text-amber-400/70">pcs</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Preview Tabel Top 5 (Menggunakan Sistem Grid Sejajar Sempurna) */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-800/80 dark:bg-[#111c44]/60 dark:backdrop-blur-md dark:shadow-xl">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-6">
                Histori Aktivitas Terkini (Top 5)
              </h3>
              
              <div className="space-y-8">
                
                {/* 1. TABEL MODAL */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-red-600" />
                    Entri Modal Penjualan
                  </h4>
                  <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-slate-800/60 bg-white dark:bg-slate-950/40">
                    <div className="min-w-[500px] w-full text-left text-xs">
                      
                      {/* Header Grid */}
                      <div className="bg-gray-50 dark:bg-slate-900/80 border-b border-gray-200 dark:border-slate-800 grid grid-cols-12 py-3.5 px-5 font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                        <div className="col-span-3">Tanggal</div>
                        <div className="col-span-5">Keterangan</div>
                        <div className="col-span-4 text-right">Nominal</div>
                      </div>
                      
                      {/* Body Grid */}
                      <div className="divide-y divide-gray-200 dark:divide-slate-900">
                        {latestModal.length === 0 ? (
                          <div className="py-6 text-center font-medium text-gray-400 dark:text-slate-500 bg-white dark:bg-transparent">
                            Belum ada records modal penjualan.
                          </div>
                        ) : (
                          latestModal.map((m) => (
                            <div key={m.id} className="grid grid-cols-12 items-center py-3.5 px-5 hover:bg-gray-50/50 dark:hover:bg-slate-900/40 transition-colors border-b border-gray-200 dark:border-slate-800/40 bg-white dark:bg-transparent">
                              <div className="col-span-3 font-medium text-gray-400 dark:text-slate-400">{m.date}</div>
                              <div className="col-span-5 font-bold text-gray-800 dark:text-slate-200 truncate pr-2">{m.description}</div>
                              <div className="col-span-4 font-black text-gray-900 dark:text-white text-right font-mono text-[13px]">{formatRupiah(m.amount)}</div>
                            </div>
                          ))
                        )}
                      </div>

                    </div>
                  </div>
                </div>

                {/* 2. TABEL TRANSFER */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-amber-500" />
                    Pemasukan Transfer Outlet
                  </h4>
                  <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-slate-800/60 bg-white dark:bg-slate-950/40">
                    <div className="min-w-[500px] w-full text-left text-xs">
                      
                      {/* Header Grid (Lebar kolom 3, 5, 4 sama persis dengan tabel di atas) */}
                      <div className="bg-gray-50 dark:bg-slate-900/80 border-b border-gray-200 dark:border-slate-800 grid grid-cols-12 py-3.5 px-5 font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                        <div className="col-span-3">Tanggal</div>
                        <div className="col-span-5">Outlet</div>
                        <div className="col-span-4 text-right">Nominal</div>
                      </div>
                      
                      {/* Body Grid */}
                      <div className="divide-y divide-gray-200 dark:divide-slate-900">
                        {latestTransfer.length === 0 ? (
                          <div className="py-6 text-center font-medium text-gray-400 dark:text-slate-500 bg-white dark:bg-transparent">
                            Belum ada records transfer outlet.
                          </div>
                        ) : (
                          latestTransfer.map((t) => (
                            <div key={t.id} className="grid grid-cols-12 items-center py-3.5 px-5 hover:bg-gray-50/50 dark:hover:bg-slate-900/40 transition-colors border-b border-gray-200 dark:border-slate-800/40 bg-white dark:bg-transparent">
                              <div className="col-span-3 font-medium text-gray-400 dark:text-slate-400">{t.date}</div>
                              <div className="col-span-5 font-bold text-gray-800 dark:text-slate-200 truncate pr-2">{getOutletLabel(t.outletId)}</div>
                              <div className="col-span-4 font-black text-amber-600 dark:text-amber-400 text-right font-mono text-[13px]">{formatRupiah(t.amount)}</div>
                            </div>
                          ))
                        )}
                      </div>

                    </div>
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