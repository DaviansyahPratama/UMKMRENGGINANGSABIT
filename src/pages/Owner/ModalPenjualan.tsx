import { useMemo, useState, type FormEvent } from "react";
import { Link } from "react-router";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import { TrashBinIcon, PlusIcon } from "../../icons";
import {
  addModalPenjualan,
  deleteModalPenjualan,
  loadModalPenjualan,
} from "../../lib/umkmStorage";

function formatRupiah(n: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n || 0);
}

// HELPER: Mengubah angka murni menjadi string ber-titik (500000 -> "500.000")
function toThousandSeparator(value: number | string): string {
  if (value === "" || value === undefined || value === null) return "";
  const numString = value.toString().replace(/\D/g, ""); 
  if (!numString) return "";
  return new Intl.NumberFormat("id-ID").format(Number(numString));
}

// HELPER: Mengubah string ber-titik kembali menjadi angka murni ("500.000" -> 500000)
function parseRawNumber(formattedValue: string): number | "" {
  const raw = formattedValue.replace(/\./g, ""); 
  return raw === "" ? "" : Number(raw);
}

export default function ModalPenjualan() {
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const modalEntries = useMemo(
    () => loadModalPenjualan(),
    [refreshKey]
  );

  const total = useMemo(
    () => modalEntries.reduce((acc, x) => acc + (x.amount || 0), 0),
    [modalEntries]
  );

  const handleAdd = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!date) return setError("Tanggal wajib diisi.");
    if (!description.trim()) return setError("Keterangan wajib diisi.");
    if (amount === "" || Number.isNaN(Number(amount)))
      return setError("Nominal harus berupa angka.");
    const numeric = Number(amount);
    if (numeric <= 0) return setError("Nominal harus > 0.");

    addModalPenjualan({
      date,
      description: description.trim(),
      amount: numeric,
    });

    setDescription("");
    setAmount("");
    setDate(new Date().toISOString().slice(0, 10));
    setRefreshKey((k) => k + 1);
  };

  const handleDelete = (id: string) => {
    const ok = window.confirm("Hapus data modal penjualan ini?");
    if (!ok) return;
    deleteModalPenjualan(id);
    setRefreshKey((k) => k + 1);
  };

  return (
    <>
      <PageMeta
        title="Modal Penjualan | UMKM Rengginang Sabit"
        description="Pencatatan modal penjualan untuk mendokumentasikan pengeluaran usaha."
      />
      
      {/* CONTAINER UTAMA */}
      <div className="space-y-8 p-4 bg-transparent text-gray-900 dark:text-slate-100 min-h-screen">
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-slate-800/60 pb-5">
          <div className="text-gray-900 dark:text-white [&_*]:text-gray-600 dark:[&_*]:text-slate-200">
            <PageBreadcrumb pageTitle="Modal Penjualan" />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8 items-start">
          
          {/* SISI KIRI: FORM TAMBAH MODAL PENGELUARAN */}
          <div className="col-span-12 xl:col-span-5">
            <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-800/80 dark:bg-[#111c44]/60 dark:backdrop-blur-md dark:shadow-xl">
              {/* 🔴 Batas Vertikal Kiri menggunakan Merah Tepercaya (Aksen Modal/Pengeluaran) */}
              <div className="absolute top-0 left-0 h-full w-[4px] bg-red-700" />
              
              <div className="border-b border-gray-100 dark:border-slate-800 pb-4 mb-5 pl-2">
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  Tambah Modal
                </h3>
                <p className="text-xs text-gray-400 dark:text-slate-400 mt-0.5">
                  Input pengeluaran modal agar perhitungan keuntungan akurat.
                </p>
              </div>

              <form onSubmit={handleAdd} className="space-y-4 pl-2">
                <div>
                  <Label className="text-xs font-bold text-gray-400 dark:text-slate-400 uppercase tracking-wider">Tanggal</Label>
                  <Input 
                    type="date" 
                    className="w-full focus:ring-red-700 dark:bg-slate-950/40 dark:border-slate-800"
                    value={date} 
                    onChange={(e) => setDate(e.target.value)} 
                  />
                </div>

                <div>
                  <Label className="text-xs font-bold text-gray-400 dark:text-slate-400 uppercase tracking-wider">Keterangan</Label>
                  <Input
                    className="w-full focus:ring-red-700 dark:bg-slate-950/40 dark:border-slate-800"
                    placeholder="Contoh: Pembelian bahan baku ketan"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div>
                  <Label className="text-xs font-bold text-gray-400 dark:text-slate-400 uppercase tracking-wider">Nominal (IDR)</Label>
                  <Input
                    type="text"
                    className="w-full focus:ring-red-700 dark:bg-slate-950/40 dark:border-slate-800 font-medium"
                    placeholder="Contoh: 500.000"
                    value={toThousandSeparator(amount)}
                    onChange={(e) => {
                      const rawNumber = parseRawNumber(e.target.value);
                      setAmount(rawNumber);
                    }}
                  />
                </div>

                {/* 🔴 Notifikasi Error Merah */}
                {error && (
                  <p className="text-xs font-semibold text-red-700 bg-red-50 dark:bg-red-950/40 dark:text-red-400 border border-red-100 dark:border-red-900/30 p-2.5 rounded-xl">
                    ⚠️ {error}
                  </p>
                )}

                <div className="flex gap-3 pt-2">
                  {/* 🔴 TOMBOL UTAMA MERAH */}
                  <button
                    type="submit"
                    className="flex-1 bg-red-700 hover:bg-red-800 active:bg-red-900 text-white font-bold py-3 rounded-xl flex justify-center items-center gap-2 border-none outline-none shadow-md shadow-red-700/10 text-sm transition-all cursor-pointer"
                  >
                    <PlusIcon />
                    Simpan
                  </button>
                  {/* TOMBOL NETRAL: Reset */}
                  <button
                    type="button"
                    className="flex-1 border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 dark:border-slate-800/80 dark:bg-slate-950/40 dark:text-slate-400 dark:hover:bg-slate-900/80 py-3 rounded-xl font-semibold outline-none text-sm transition-all cursor-pointer"
                    onClick={() => {
                      setDescription("");
                      setAmount("");
                      setError(null);
                      setDate(new Date().toISOString().slice(0, 10));
                    }}
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* SISI KANAN: DAFTAR HISTORI MODAL (MURNI CSS GRID) */}
          <div className="col-span-12 xl:col-span-7">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-800/80 dark:bg-[#111c44]/60 dark:backdrop-blur-md dark:shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">
                    Daftar Modal Penjualan
                  </h3>
                  <p className="text-xs text-gray-400 dark:text-slate-400 mt-0.5">
                    Total semua pengeluaran: <b className="text-red-700 dark:text-red-400 text-sm font-extrabold">{formatRupiah(total)}</b>
                  </p>
                </div>
                {/* 🟡 LINK AMBER: Menuju halaman keuntungan */}
                <Link
                  to="/owner/keuntungan"
                  className="inline-flex items-center justify-center rounded-xl border border-amber-200 bg-amber-50/50 px-4 py-2.5 text-xs font-bold text-amber-600 shadow-sm hover:bg-amber-50 dark:border-amber-900/40 dark:bg-amber-950/20 dark:text-amber-400 dark:hover:bg-amber-950/40 transition-all text-center"
                >
                  Lihat Analisis Keuntungan 🌟
                </Link>
              </div>

              {/* Container Pembatas Tabel List */}
              <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-slate-800/60 bg-white dark:bg-slate-950/40">
                <div className="min-w-[620px] w-full text-left text-xs">
                  
                  {/* HEADER REKAYASA CSS GRID (Total Kolom = 12) */}
                  <div className="bg-gray-50 dark:bg-slate-900/80 border-b border-gray-200 dark:border-slate-800 grid grid-cols-12 items-center py-3.5 px-5 font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                    <div className="col-span-3">Tanggal</div>
                    <div className="col-span-4 pl-2">Keterangan</div>
                    <div className="col-span-3 pl-2">Nominal</div>
                    <div className="col-span-2 text-center">Aksi</div>
                  </div>
                  
                  {/* BODY REKAYASA CSS GRID */}
                  <div className="divide-y divide-gray-200 dark:divide-slate-900/60">
                    {modalEntries.length === 0 ? (
                      <div className="py-8 text-center font-medium text-gray-400 dark:text-slate-500 bg-white dark:bg-transparent">
                        Belum ada rekaman data modal penjualan.
                      </div>
                    ) : (
                      modalEntries.map((m) => (
                        <div 
                          key={m.id}
                          className="grid grid-cols-12 items-center py-4 px-5 hover:bg-gray-50/50 dark:hover:bg-slate-900/40 transition-colors border-b border-gray-200 dark:border-slate-800/40 bg-white dark:bg-transparent"
                        >
                          {/* 1. Tanggal (col-span-3) */}
                          <div className="col-span-3 font-semibold text-gray-600 dark:text-slate-300">
                            {m.date}
                          </div>

                          {/* 2. Keterangan (col-span-4) */}
                          <div className="col-span-4 pl-2 font-bold text-gray-900 dark:text-white truncate pr-2" title={m.description}>
                            {m.description}
                          </div>

                          {/* 3. Nominal Pengeluaran (col-span-3) */}
                          <div className="col-span-3 pl-2 font-bold text-gray-900 dark:text-white">
                            <span className="inline-flex items-center gap-1.5">
                              <span className="h-1.5 w-1.5 rounded-full bg-red-700 flex-shrink-0" />
                              {formatRupiah(m.amount)}
                            </span>
                          </div>

                          {/* 4. Kontrol Tombol Hapus (col-span-2) */}
                          <div className="col-span-2 flex justify-center items-center">
                            <button
                              type="button"
                              className="border border-red-100 dark:border-red-900/40 bg-white dark:bg-slate-950/40 text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 px-3 py-1.5 text-[11px] font-bold rounded-lg flex items-center gap-1 transition-colors outline-none cursor-pointer"
                              onClick={() => handleDelete(m.id)}
                            >
                              <TrashBinIcon className="size-3 flex-shrink-0" />
                              Hapus
                            </button>
                          </div>

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
    </>
  );
}