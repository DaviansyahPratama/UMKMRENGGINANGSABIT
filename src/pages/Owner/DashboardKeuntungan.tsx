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
import Button from "../../components/ui/button/Button";
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

  const options: ApexOptions = {
    colors: ["#465FFF"],
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
        opacityFrom: 0.55,
        opacityTo: 0,
      },
    },
    dataLabels: { enabled: false },
    tooltip: {
      y: {
        formatter: (val: number) => formatRupiah(val),
      },
    },
    xaxis: {
      categories: seriesData.labels,
      labels: { rotate: -15 },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        formatter: (val: number) => formatRupiah(val),
      },
    },
    grid: {
      borderColor: "#e5e7eb",
      strokeDashArray: 4,
    },
  };

  const series = [
    {
      name: "Keuntungan",
      data: seriesData.profits,
    },
  ];

  return (
    <>
      <PageMeta
        title="Dashboard Keuntungan | UMKM Rengginang Sabit"
        description="Dashboard keuntungan mingguan dan bulanan lengkap dengan grafik dan statistik."
      />
      <div className="space-y-6">
        <PageBreadcrumb pageTitle="Dashboard Keuntungan (KF06)" />

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 xl:col-span-4">
            <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] px-6 py-5">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Keuntungan Total
              </p>
              <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white/90">
                {formatRupiah(totals.profit)}
              </p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Semua periode yang tersimpan
              </p>
            </div>
          </div>
          <div className="col-span-12 xl:col-span-8">
            <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="text-base font-semibold text-gray-800 dark:text-white/90">
                    Grafik Keuntungan
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Toggle periode: mingguan atau bulanan.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button
                    size="sm"
                    variant={period === "weekly" ? "primary" : "outline"}
                    onClick={() => setPeriod("weekly")}
                  >
                    Mingguan
                  </Button>
                  <Button
                    size="sm"
                    variant={period === "monthly" ? "primary" : "outline"}
                    onClick={() => setPeriod("monthly")}
                  >
                    Bulanan
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setRefreshKey((k) => k + 1)}
                  >
                    Refresh
                  </Button>
                  <Link
                    to="/owner/keuntungan"
                    className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
                  >
                    Detail KF05
                  </Link>
                </div>
              </div>
              <div className="mt-5">
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

        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-6">
          <h3 className="text-base font-semibold text-gray-800 dark:text-white/90">
            Statistik Ringkas
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Nilai laba ditampilkan per periode sesuai pilihan Anda.
          </p>

          <div className="mt-5 overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <th className="py-3 text-left text-sm font-medium text-gray-500">
                    Periode
                  </th>
                  <th className="py-3 text-left text-sm font-medium text-gray-500">
                    Profit (IDR)
                  </th>
                  <th className="py-3 text-left text-sm font-medium text-gray-500">
                    Modal (IDR)
                  </th>
                  <th className="py-3 text-left text-sm font-medium text-gray-500">
                    Pemasukan (IDR)
                  </th>
                </tr>
              </thead>
              <tbody>
                {seriesData.labels.map((label, idx) => (
                  <tr key={label} className="border-b border-gray-50 dark:border-gray-800">
                    <td className="py-3 text-sm text-gray-700 dark:text-gray-300">
                      {label}
                    </td>
                    <td className="py-3 text-sm text-gray-700 dark:text-gray-300">
                      {formatRupiah(seriesData.profits[idx])}
                    </td>
                    <td className="py-3 text-sm text-gray-700 dark:text-gray-300">
                      {formatRupiah(seriesData.totalModal[idx])}
                    </td>
                    <td className="py-3 text-sm text-gray-700 dark:text-gray-300">
                      {formatRupiah(seriesData.totalTransfers[idx])}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

