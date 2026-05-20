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

      {/* Menggunakan bg-black & padding top agar konsisten di bawah navbar transparan */}
      <div className="space-y-6 bg-black text-white min-h-screen pt-28 px-6 pb-20">
        
        {/* Breadcrumb bawaan proyek Anda */}
        <PageBreadcrumb pageTitle="Stok Outlet (Guest)" />

        {/* Card diubah menjadi kotak penuh (rounded-none) dengan background gelap & border tipis */}
        <div className="rounded-none border border-white/10 bg-white/[0.02] p-6 max-w-5xl mx-auto shadow-2xl">
          
          <p className="text-sm text-gray-400 leading-relaxed">
            Halaman ini hanya menampilkan informasi stok yang sudah dikirim ke
            outlet (read-only). Manajemen stok dan keuangan hanya dapat
            diakses oleh Owner setelah login.
          </p>

          {/* Sorotan total stok menggunakan warna Emas logo agar terkesan informatif & premium */}
          <div className="mt-4 text-sm text-gray-300">
            Total seluruh stok terdistribusi:{" "}
            <span className="font-bold text-[#E2A929] text-base ml-1">{totalAll} pcs</span>
          </div>

          <div className="mt-6 overflow-x-auto">
            {/* Tabel disesuaikan dengan border putih tipis transparan */}
            <Table className="min-w-[680px] border border-white/5">
              <TableHeader className="bg-white/5">
                <TableRow className="border-b border-white/10">
                  <TableCell
                    isHeader
                    className="py-3.5 text-xs font-bold uppercase tracking-wider text-gray-300"
                  >
                    Outlet
                  </TableCell>
                  <TableCell
                    isHeader
                    className="py-3.5 text-xs font-bold uppercase tracking-wider text-gray-300"
                  >
                    Total Stok (pcs)
                  </TableCell>
                  <TableCell
                    isHeader
                    className="py-3.5 text-xs font-bold uppercase tracking-wider text-gray-300"
                  >
                    Tanggal Distribusi Terakhir
                  </TableCell>
                </TableRow>
              </TableHeader>
              
              <TableBody className="divide-y divide-white/5">
                {rows.length === 0 ? (
                  <TableRow>
                    <TableCell
                      className="py-8 text-center text-sm text-gray-500"
                      isHeader={false}
                      colSpan={3} // Menyesuaikan agar teks empty state memenuhi 3 kolom tabel
                    >
                      Belum ada data distribusi stok.
                    </TableCell>
                  </TableRow>
                ) : (
                  rows.map((r) => (
                    <TableRow 
                      key={r.outletId}
                      className="border-b border-white/5 hover:bg-white/[0.02] transition duration-150"
                    >
                      <TableCell className="py-4 text-sm font-medium text-white">
                        {r.outletName}
                      </TableCell>
                      {/* Nilai kuantitas diberi warna emas redup agar estetik */}
                      <TableCell className="py-4 text-sm font-semibold text-[#E2A929]/90">
                        {r.totalQuantity}
                      </TableCell>
                      <TableCell className="py-4 text-sm text-gray-400">
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