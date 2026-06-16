import { useMemo, useState } from "react";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Select from "../../components/form/Select";
import Label from "../../components/form/Label";
import {
  loadOutlets,
  loadStokDistribusi,
  loadTransferOutlet,
  getOutletLabel,
} from "../../lib/umkmStorage";
import {
  computeOutletStats,
  computeOutletTransferSeriesMonthly,
} from "../../lib/umkmCalculations";

function formatRupiah(n: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n || 0);
}

export default function StatistikOutlet() {
  const outlets = useMemo(() => loadOutlets(), []);
  const outletOptions = useMemo(
    () => outlets.map((o) => ({ value: o.id, label: o.name })),
    [outlets]
  );

  const [outletId, setOutletId] = useState<string>(outlets[0]?.id ?? "");
  const [selectKey, setSelectKey] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);

  const stokEntries = useMemo(() => loadStokDistribusi(), [refreshKey]);
  const transferEntries = useMemo(() => loadTransferOutlet(), [refreshKey]);

  const stats = useMemo(
    () => computeOutletStats(outletId, stokEntries, transferEntries),
    [outletId, stokEntries, transferEntries]
  );

  const seriesData = useMemo(
    () => computeOutletTransferSeriesMonthly(outletId, transferEntries, 6),
    [outletId, transferEntries]
  );

  // Konfigurasi ApexCharts disesuaikan menggunakan aksen Amber-500 sesuai panduan
  const options: ApexOptions = {
    colors: ["#f59e0b"], // Amber-500
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 300,
      type: "bar",
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "40%",
        borderRadius: 6,
      },
    },
    dataLabels: { enabled: false },
    tooltip: {
      theme: "light",
      y: {
        formatter: (val: number) => formatRupiah(val),
      },
    },
    xaxis: {
      categories: seriesData.labels,
      labels: {
        style: {
          colors: "#94a3b8",
          fontSize: "11px",
        },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        formatter: (val: number) => formatRupiah(val),
        style: {
          colors: "#94a3b8",
          fontSize: "11px",
        },
      },
    },
    grid: {
      borderColor: "#f1f5f9",
      strokeDashArray: 4,
    },
  };

  const series = [{ name: "Pemasukan", data: seriesData.values }];

  return (
    <>
      <PageMeta
        title="Statistik Outlet | UMKM Rengginang Sabit"
        description="Pantau dan evaluasi ringkasan performa manajemen distribusi stok serta arus transfer dana masuk per outlet."
      />
      
      {/* BACKGROUND HALAMAN UTAMA */}
      <div className="space-y-6 p-6 bg-gray-50 dark:bg-[#111c44]/60 dark:backdrop-blur-md min-h-screen text-gray-900 dark:text-slate-100">
        
        {/* BREADCRUMB */}
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-slate-800 pb-4">
          <div className="text-gray-900 dark:text-white">
            <PageBreadcrumb pageTitle="Statistik Outlet" />
          </div>
        </div>

        {/* CONTROLLER SELEKSI OUTLET & ACTIONS */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div className="w-full sm:w-72">
              <Label className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-2 block">
                Filter Pilih Outlet
              </Label>
              <Select
                key={selectKey}
                options={outletOptions}
                placeholder="Pilih outlet"
                defaultValue={outletId}
                onChange={setOutletId}
              />
              <p className="mt-2 text-xs font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-1 rounded-md inline-block">
                📍 {outletId ? getOutletLabel(outletId) : "Belum ada outlet dipilih"}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 dark:border-slate-700 dark:bg-slate-950/40 dark:text-slate-300 dark:hover:bg-slate-900 px-4 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer"
                onClick={() => setRefreshKey((k) => k + 1)}
              >
                Segarkan Data
              </button>
              <button
                type="button"
                className="border border-gray-200 bg-white hover:bg-red-50 text-red-700 dark:border-slate-700 dark:bg-slate-950/40 dark:text-red-400 dark:hover:bg-red-950/40 px-4 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer"
                onClick={() => {
                  setOutletId(outlets[0]?.id ?? "");
                  setSelectKey((k) => k + 1);
                }}
              >
                Reset Filter
              </button>
            </div>
          </div>

          {/* INDIKATOR STATISTIK (3 KARTU DENGAN AKSEN VERTIKAL AMBER) */}
          <div className="mt-6 grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-4">
              <div className="relative overflow-hidden rounded-xl bg-gray-50/60 dark:bg-slate-950/40 p-4 border border-gray-100 dark:border-slate-800/60">
                <div className="absolute top-0 left-0 h-full w-1 bg-amber-500" />
                <p className="text-xs font-medium text-gray-600 dark:text-slate-400 uppercase tracking-wide pl-2">
                  Total Pemasukan
                </p>
                <p className="mt-1 text-lg font-bold text-gray-900 dark:text-white pl-2">
                  {formatRupiah(stats.totalPemasukan)}
                </p>
              </div>
            </div>
            
            <div className="col-span-12 md:col-span-4">
              <div className="relative overflow-hidden rounded-xl bg-gray-50/60 dark:bg-slate-950/40 p-4 border border-gray-100 dark:border-slate-800/60">
                <div className="absolute top-0 left-0 h-full w-1 bg-amber-500" />
                <p className="text-xs font-medium text-gray-600 dark:text-slate-400 uppercase tracking-wide pl-2">
                  Jumlah Transaksi
                </p>
                <p className="mt-1 text-lg font-bold text-gray-900 dark:text-white pl-2">
                  {stats.totalTransaksiTransfer} <span className="text-xs text-gray-400 font-normal">Kali Kirim</span>
                </p>
              </div>
            </div>
            
            <div className="col-span-12 md:col-span-4">
              <div className="relative overflow-hidden rounded-xl bg-gray-50/60 dark:bg-slate-950/40 p-4 border border-gray-100 dark:border-slate-800/60">
                <div className="absolute top-0 left-0 h-full w-1 bg-amber-500" />
                <p className="text-xs font-medium text-gray-600 dark:text-slate-400 uppercase tracking-wide pl-2">
                  Total Stok Terdistribusi
                </p>
                <p className="mt-1 text-lg font-bold text-amber-600 dark:text-amber-400 pl-2">
                  {stats.totalStokTerdistribusi} <span className="text-xs text-gray-400 font-normal">pcs</span>
                </p>
              </div>
            </div>
          </div>

          {/* AREA CHART BAR */}
          <div className="mt-6 border-t border-gray-100 dark:border-slate-800/80 pt-4">
            <Chart options={options} series={series} type="bar" height={300} />
          </div>
        </div>

        {/* TABEL DATA HISTORI BERKALA (STRUKTUR GRID SEJAJAR & WARNA SESUAI PALET) */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
          <div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">
              Riwayat Transfer (Top 5)
            </h3>
            <p className="text-xs text-gray-600 dark:text-slate-400 mt-0.5">
              Statistik ini berbasis data transfer outlet (pemasukan).
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-950 mt-5">
            <div className="min-w-[800px] w-full text-left text-xs">
              
              {/* HEADER GRID TABEL */}
              <div className="bg-gray-50 dark:bg-slate-900/50 border-b border-gray-200 dark:border-slate-800 grid grid-cols-4 py-3.5 px-6 font-bold text-gray-600 dark:text-slate-400 uppercase tracking-wider">
                <div>Tanggal</div>
                <div>Outlet</div>
                <div>Nominal</div>
                <div>Catatan</div>
              </div>

              {/* BODY BARIS DATA */}
              <div className="divide-y divide-gray-100 dark:divide-slate-800/60">
                {stats.recentTransfers.length === 0 ? (
                  <div className="text-center text-gray-600 dark:text-slate-400 py-12 font-medium bg-white dark:bg-slate-950">
                    Belum ada data transfer untuk outlet ini.
                  </div>
                ) : (
                  stats.recentTransfers.map((t) => (
                    <div 
                      key={t.id}
                      className="grid grid-cols-4 items-center py-4 px-6 bg-white dark:bg-slate-950 hover:bg-gray-50/60 dark:hover:bg-slate-900/80 transition-colors"
                    >
                      {/* 1. Tanggal */}
                      <div className="text-gray-900 dark:text-slate-200 font-medium">
                        {t.date}
                      </div>

                      {/* 2. Nama Outlet */}
                      <div className="text-gray-900 dark:text-slate-200 font-medium">
                        {getOutletLabel(t.outletId)}
                      </div>

                      {/* 3. Nominal Uang (Menggunakan Aksen Amber Pemasukan) */}
                      <div className="font-bold text-amber-600 dark:text-amber-300">
                        {formatRupiah(t.amount)}
                      </div>

                      {/* 4. Catatan Keterangan */}
                      <div className="text-gray-600 dark:text-slate-400 truncate pr-2">
                        {t.notes || "-"}
                      </div>
                    </div>
                  ))
                )}
              </div>

            </div>
          </div>
        </div>

      </div>
    </>
  );
}