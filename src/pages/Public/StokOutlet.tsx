import { useMemo } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import {
  loadOutlets,
  loadStokDistribusi,
  type StokDistribusiEntry,
} from "../../lib/umkmStorage";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

type OutletStokRow = {
  outletId: string;
  outletName: string;
  totalQuantity: number;
  lastDate: string | null;
};

function buildOutletStok(
  entries: StokDistribusiEntry[],
  outletMap: Map<string, string>
): OutletStokRow[] {
  const byOutlet = new Map<string, OutletStokRow>();

  for (const e of entries) {
    const outletName = outletMap.get(e.outletId);
    if (!outletName) continue;

    const existing = byOutlet.get(e.outletId) ?? {
      outletId: e.outletId,
      outletName,
      totalQuantity: 0,
      lastDate: null as string | null,
    };

    existing.totalQuantity += e.quantity || 0;
    if (!existing.lastDate || e.date > existing.lastDate) {
      existing.lastDate = e.date;
    }

    byOutlet.set(e.outletId, existing);
  }

  return Array.from(byOutlet.values()).sort((a, b) =>
    a.outletName.localeCompare(b.outletName)
  );
}

export default function StokOutlet() {
  const outlets = useMemo(() => loadOutlets(), []);
  const outletMap = useMemo(
    () => new Map(outlets.map((o) => [o.id, o.name])),
    [outlets]
  );
  const stokEntries = useMemo(() => loadStokDistribusi(), []);
  const rows = useMemo(
    () => buildOutletStok(stokEntries, outletMap),
    [stokEntries, outletMap]
  );

  const totalAll = rows.reduce(
    (acc, r) => acc + (r.totalQuantity || 0),
    0
  );

  return (
    <>
      <PageMeta
        title="Stok Outlet | UMKM Rengginang Sabit"
        description="Informasi stok total yang sudah dikirim ke setiap outlet."
      />

      <div className="space-y-6">
        <PageBreadcrumb pageTitle="Stok Outlet (Guest)" />

        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] p-6">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Halaman ini hanya menampilkan informasi stok yang sudah dikirim ke
            outlet (read-only). Manajemen stok dan keuangan hanya dapat
            diakses oleh Owner setelah login.
          </p>

          <div className="mt-4 text-sm text-gray-700 dark:text-gray-300">
            Total seluruh stok terdistribusi:{" "}
            <span className="font-semibold">{totalAll} pcs</span>
          </div>

          <div className="mt-5 overflow-x-auto">
            <Table className="min-w-[680px]">
              <TableHeader>
                <TableRow>
                  <TableCell
                    isHeader
                    className="py-3 text-sm font-medium text-gray-500 dark:text-gray-400"
                  >
                    Outlet
                  </TableCell>
                  <TableCell
                    isHeader
                    className="py-3 text-sm font-medium text-gray-500 dark:text-gray-400"
                  >
                    Total Stok (pcs)
                  </TableCell>
                  <TableCell
                    isHeader
                    className="py-3 text-sm font-medium text-gray-500 dark:text-gray-400"
                  >
                    Tanggal Distribusi Terakhir
                  </TableCell>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
                {rows.length === 0 ? (
                  <TableRow>
                    <TableCell
                      className="py-8 text-center text-gray-500 dark:text-gray-300"
                      isHeader={false}
                    >
                      Belum ada data distribusi stok.
                    </TableCell>
                  </TableRow>
                ) : (
                  rows.map((r) => (
                    <TableRow key={r.outletId}>
                      <TableCell className="py-3 text-gray-800 dark:text-white/90">
                        {r.outletName}
                      </TableCell>
                      <TableCell className="py-3 text-gray-700 dark:text-gray-300">
                        {r.totalQuantity}
                      </TableCell>
                      <TableCell className="py-3 text-gray-700 dark:text-gray-300">
                        {r.lastDate ?? "-"}
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

