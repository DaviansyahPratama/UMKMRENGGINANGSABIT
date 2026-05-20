import { useMemo, useState } from "react";
import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import Select from "../../components/form/Select";
import Label from "../../components/form/Label";
import Button from "../../components/ui/button/Button";
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
    () =>
      computeOutletTransferSeriesMonthly(outletId, transferEntries, 6),
    [outletId, transferEntries]
  );

  const options: ApexOptions = {
    colors: ["#465FFF"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 300,
      type: "bar",
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "45%",
        borderRadius: 6,
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

  const series = [{ name: "Pemasukan", data: seriesData.values }];

  return (
    <>
      <PageMeta
        title="Statistik Outlet | UMKM Rengginang Sabit"
        description="Lihat statistik setiap outlet untuk mengetahui performa penjualan."
      />
      <div className="space-y-6">
        <PageBreadcrumb pageTitle="Statistik Outlet (KF07)" />

        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div className="w-full sm:w-auto">
              <Label>Outlet</Label>
              <Select
                key={selectKey}
                options={outletOptions}
                placeholder="Pilih outlet"
                defaultValue={outletId}
                onChange={setOutletId}
              />
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {outletId ? getOutletLabel(outletId) : "Belum ada outlet dipilih"}
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setRefreshKey((k) => k + 1)}
              >
                Refresh
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setOutletId(outlets[0]?.id ?? "");
                  setSelectKey((k) => k + 1);
                }}
              >
                Reset
              </Button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-12 gap-4">
            <div className="col-span-12 xl:col-span-4">
              <div className="rounded-xl bg-gray-50 dark:bg-white/[0.03] p-4">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Total Pemasukan
                </p>
                <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white/90">
                  {formatRupiah(stats.totalPemasukan)}
                </p>
              </div>
            </div>
            <div className="col-span-12 xl:col-span-4">
              <div className="rounded-xl bg-gray-50 dark:bg-white/[0.03] p-4">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Jumlah Transaksi
                </p>
                <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white/90">
                  {stats.totalTransaksiTransfer}
                </p>
              </div>
            </div>
            <div className="col-span-12 xl:col-span-4">
              <div className="rounded-xl bg-gray-50 dark:bg-white/[0.03] p-4">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Total Stok Terdistribusi
                </p>
                <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white/90">
                  {stats.totalStokTerdistribusi} pcs
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Chart options={options} series={series} type="bar" height={300} />
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-6">
          <h3 className="text-base font-semibold text-gray-800 dark:text-white/90">
            Riwayat Transfer (Top 5)
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Statistik ini berbasis data transfer outlet (pemasukan).
          </p>

          <div className="mt-5 overflow-x-auto">
            <Table className="min-w-[860px]">
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
                  <TableCell isHeader className="py-3">
                    Catatan
                  </TableCell>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                {stats.recentTransfers.length === 0 ? (
                  <TableRow>
                    <td
                      colSpan={4}
                      className="py-8 text-center text-gray-500 dark:text-gray-300"
                    >
                      Belum ada data transfer untuk outlet ini.
                    </td>
                  </TableRow>
                ) : (
                  stats.recentTransfers.map((t) => (
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
                      <TableCell className="py-3 text-gray-700 dark:text-gray-300">
                        {t.notes || "-"}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}

