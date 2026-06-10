import { useMemo, useState } from "react";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import {
  computeProfitSeriesMonthly,
  computeProfitSeriesWeekly,
  computeProfitTotals,
} from "../../lib/umkmCalculations";
import { loadModalPenjualan, loadTransferOutlet } from "../../lib/umkmStorage";
import { Link } from "react-router";

function formatRupiah(n: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n || 0);
}

export default function DashboardKeuntungan() {
  const [period, setPeriod] = useState<"weekly" | "monthly">("weekly");
  const [refreshKey, setRefreshKey] = useState(0);

  const modalEntries = useMemo(() => loadModalPenjualan(), [refreshKey]);
  const transferEntries = useMemo(() => loadTransferOutlet(), [refreshKey]);

  const totals = useMemo(
    () => computeProfitTotals(modalEntries, transferEntries),
    [modalEntries, transferEntries]
  );

  const seriesData = useMemo(() => {
    if (period === "weekly") {
      return computeProfitSeriesWeekly(modalEntries, transferEntries, 8);
    }
    return computeProfitSeriesMonthly(modalEntries, transferEntries, 12);
  }, [modalEntries, period, transferEntries]);

  // Konfigurasi ApexCharts disesuaikan menggunakan aksen Amber Finansial
  const options: ApexOptions = {
    colors: ["#d97706"], // Amber-600
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 340,
      type: "area",
      toolbar: { show: false },
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [0, 95, 100]
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
        rotate: -15,
        style: {
          colors: "#94a3b8",
          fontSize: "11px"
        }
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        formatter: (val: number) => formatRupiah(val),
        style: {
          colors: "#94a3b8",
          fontSize: "11px"
        }
      },
    },
    grid: {
      borderColor: "#f1f5f9",
      strokeDashArray: 4,
    },
  };

  const series = [
    {
      name: "Keuntungan Bersih",
      data: seriesData.profits,
    },
  ];

  return (
    <>
      <PageMeta
        title="Dashboard Keuntungan | UMKM Rengginang Sabit"
        description="Visualisasi tren performa keuntungan berkala mingguan dan bulanan berbasis data grafik area."
      />
      
      <div className="space-y-6 p-6 bg-gray-50 dark:bg-slate-900/40 min-h-screen text-gray-900 dark:text-slate-100">
        
        {/* BREADCRUMB */}
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-slate-800 pb-4">
          <div className="text-gray-900 dark:text-white">
            <PageBreadcrumb pageTitle="Dashboard Keuntungan (KF06)" />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          
          {/* KARTU SISI KIRI: TOTAL AKUMULASI */}
          <div className="col-span-12 xl:col-span-4 flex">
            <div className="relative w-full overflow-hidden rounded-xl border border-amber-200 bg-amber-50/20 p-6 shadow-sm dark:border-amber-900/30 dark:bg-amber-950/10 flex flex-col justify-center">
              <div className="absolute top-0 left-0 h-full w-1 bg-amber-500" />
              <p className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider pl-2">
                Keuntungan Akumulatif
              </p>
              <p className="mt-2 text-3xl font-black text-amber-600 dark:text-amber-400 pl-2 tracking-tight">
                {formatRupiah(totals.profit)}
              </p>
              <p className="mt-2 text-[11px] text-gray-400 dark:text-slate-400 pl-2 italic">
                Akumulasi laba bersih dari seluruh rentang riwayat yang terekam.
              </p>
            </div>
          </div>

          {/* GRAFIK UTAMA SISI KANAN */}
          <div className="col-span-12 xl:col-span-8">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/20">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-100 dark:border-slate-800/60 pb-4 mb-5">
                <div>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                    Grafik Tren Keuntungan Usaha
                  </h3>
                  <p className="text-xs text-gray-400 dark:text-slate-400 mt-0.5">
                    Gunakan sakelar tombol untuk merubah visualisasi berkala.
                  </p>
                </div>
                
                {/* ACTION CONTROLLERS - HTML MURNI */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPeriod("weekly")}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer border ${
                      period === "weekly"
                        ? "bg-amber-600 text-white border-amber-600 shadow-sm"
                        : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-800"
                    }`}
                  >
                    Mingguan
                  </button>
                  <button
                    type="button"
                    onClick={() => setPeriod("monthly")}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer border ${
                      period === "monthly"
                        ? "bg-amber-600 text-white border-amber-600 shadow-sm"
                        : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-700 dark:hover:bg-slate-800"
                    }`}
                  >
                    Bulanan
                  </button>
                  
                  <div className="h-4 w-[1px] bg-gray-200 dark:bg-slate-800 mx-1" />
                  
                  <button
                    type="button"
                    onClick={() => setRefreshKey((k) => k + 1)}
                    className="border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer"
                  >
                    🔄 Refresh
                  </button>
                  
                  <Link
                    to="/owner/keuntungan"
                    className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-xs hover:bg-gray-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors text-center"
                  >
                    Lembar Kerja KF05
                  </Link>
                </div>
              </div>

              {/* AREA AREA CHART */}
              <div className="mt-2 text-gray-900 dark:text-white [&_.apexcharts-tooltip]:text-gray-900">
                <Chart
                  options={options}
                  series={series}
                  type="area"
                  height={340}
                />
              </div>
            </div>
          </div>
        </div>

        {/* TABEL STATISTIK RINGKAS (STRUKTUR GRID SEJAJAR) */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/20">
          <div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">
              Data Tabel Statistik Ringkas
            </h3>
            <p className="text-xs text-gray-400 dark:text-slate-400 mt-0.5">
              Rincian komparasi nilai laba bersih, modal, dan pemasukan per interval ({period === "weekly" ? "Mingguan" : "Bulanan"}).
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-950 mt-5">
            <div className="min-w-[760px] w-full text-left text-xs">
              
              {/* BARIS JUDUL TABEL (Grid 4 Kolom) */}
              <div className="bg-gray-50 dark:bg-slate-900/50 border-b border-gray-200 dark:border-slate-800 grid grid-cols-4 py-3.5 px-6 font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                <div>Periode / Waktu</div>
                <div>Profit Bersih (IDR)</div>
                <div>Beban Modal</div>
                <div>Arus Pemasukan</div>
              </div>

              {/* ISI BARIS DATA TABEL */}
              <div className="divide-y divide-gray-100 dark:divide-slate-800/60">
                {seriesData.labels.map((label, idx) => {
                  const currentProfit = seriesData.profits[idx] || 0;
                  return (
                    <div
                      key={label}
                      className="grid grid-cols-4 items-center py-4 px-6 hover:bg-gray-50/50 dark:hover:bg-slate-900/20 transition-colors"
                    >
                      {/* 1. Periode */}
                      <div className="font-bold text-gray-700 dark:text-slate-300">
                        {label}
                      </div>
                      
                      {/* 2. Profit Bersih */}
                      <div className={`font-bold flex items-center gap-1.5 ${currentProfit >= 0 ? "text-amber-600 dark:text-amber-400" : "text-rose-600 dark:text-rose-400"}`}>
                        {formatRupiah(currentProfit)}
                        {currentProfit < 0 && (
                          <span className="text-[10px] font-medium bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 px-1 py-0.5 rounded">
                            Defisit
                          </span>
                        )}
                      </div>
                      
                      {/* 3. Beban Modal */}
                      <div className="font-medium text-gray-500 dark:text-slate-400">
                        {formatRupiah(seriesData.totalModal[idx])}
                      </div>
                      
                      {/* 4. Arus Pemasukan */}
                      <div className="font-medium text-gray-500 dark:text-slate-400">
                        {formatRupiah(seriesData.totalTransfers[idx])}
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        </div>

      </div>
    </>
  );
}