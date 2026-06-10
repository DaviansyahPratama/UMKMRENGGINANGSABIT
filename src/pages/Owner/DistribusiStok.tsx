import { useMemo, useState, type FormEvent } from "react";
import { Link } from "react-router";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import Select from "../../components/form/Select";
import { PlusIcon, TrashBinIcon } from "../../icons";
import {
  addStokDistribusi,
  deleteStokDistribusi,
  getOutletLabel,
  loadOutlets,
  loadStokDistribusi,
  updateStokDistribusi,
} from "../../lib/umkmStorage";

function formatDateNow() {
  return new Date().toISOString().slice(0, 10);
}

// HELPER: Mengubah kuantitas stok menjadi format ber-titik ribuan (1000 -> "1.000")
function toThousandSeparator(value: number | string): string {
  if (value === "" || value === undefined || value === null) return "";
  const numString = value.toString().replace(/\D/g, "");
  if (!numString) return "";
  return new Intl.NumberFormat("id-ID").format(Number(numString));
}

// HELPER: Mengubah format string ber-titik kembali menjadi angka murni
function parseRawNumber(formattedValue: string): number | "" {
  const raw = formattedValue.replace(/\./g, "");
  return raw === "" ? "" : Number(raw);
}

export default function DistribusiStok() {
  const outlets = useMemo(() => loadOutlets(), []);
  const outletOptions = useMemo(
    () => outlets.map((o) => ({ value: o.id, label: o.name })),
    [outlets]
  );

  const [refreshKey, setRefreshKey] = useState(0);
  const stokEntries = useMemo(() => loadStokDistribusi(), [refreshKey]);

  const [date, setDate] = useState(() => formatDateNow());
  const [outletId, setOutletId] = useState<string>(outlets[0]?.id ?? "");
  const [selectKey, setSelectKey] = useState(0);
  const [quantity, setQuantity] = useState<number | "">("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const totalStok = useMemo(
    () => stokEntries.reduce((acc, x) => acc + (x.quantity || 0), 0),
    [stokEntries]
  );

  const resetForm = () => {
    setDate(formatDateNow());
    setOutletId(outlets[0]?.id ?? "");
    setSelectKey((k) => k + 1);
    setQuantity("");
    setNotes("");
    setError(null);
    setEditingId(null);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!date) return setError("Tanggal wajib diisi.");
    if (!outletId) return setError("Outlet wajib dipilih.");
    if (quantity === "" || Number.isNaN(Number(quantity)))
      return setError("Jumlah stok harus berupa angka.");
    const numeric = Number(quantity);
    if (numeric <= 0) return setError("Jumlah stok harus > 0.");

    if (editingId) {
      updateStokDistribusi(editingId, {
        date,
        outletId,
        quantity: numeric,
        notes: notes.trim(),
      });
    } else {
      addStokDistribusi({
        date,
        outletId,
        quantity: numeric,
        notes: notes.trim(),
      });
    }

    resetForm();
    setRefreshKey((k) => k + 1);
  };

  const handleDelete = (id: string) => {
    const ok = window.confirm("Hapus data distribusi stok ini?");
    if (!ok) return;
    deleteStokDistribusi(id);
    setRefreshKey((k) => k + 1);
  };

  const handleEdit = (id: string) => {
    const item = stokEntries.find((x) => x.id === id);
    if (!item) return;
    setEditingId(item.id);
    setDate(item.date);
    setOutletId(item.outletId);
    setSelectKey((k) => k + 1);
    setQuantity(item.quantity);
    setNotes(item.notes);
    setError(null);
  };

  return (
    <>
      <PageMeta
        title="Distribusi Stok Outlet | UMKM Rengginang Sabit"
        description="Pencatatan distribusi stok ke outlet agar jumlah stok yang diberikan dapat terdata."
      />

      {/* CONTAINER UTAMA (Light: bg-transparent, text-gray-900 / Dark: text-slate-100) */}
      <div className="space-y-8 p-4 bg-transparent text-gray-900 dark:text-slate-100 min-h-screen">
        
        {/* BREADCRUMB */}
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-slate-800/60 pb-5">
          <div className="text-gray-900 dark:text-white [&_*]:text-gray-600 dark:[&_*]:text-slate-200">
            <PageBreadcrumb pageTitle="Distribusi Stok Outlet" />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8 items-start">
          
          {/* SISI KIRI: FORM ENTRI LOGISTIK / STOK DISTRIBUSI */}
          <div className="col-span-12 xl:col-span-5">
            <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-800/80 dark:bg-[#111c44]/60 dark:backdrop-blur-md dark:shadow-xl">
              {/* 🟡 Batas Vertikal Kiri menggunakan warna Amber (Pemasukan/Distribusi) */}
              <div className="absolute top-0 left-0 h-full w-[4px] bg-amber-500" />
              
              <div className="border-b border-gray-100 dark:border-slate-800 pb-4 mb-5 pl-2">
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  {editingId ? "⚙️ Edit Distribusi Stok" : "📦 Tambah Distribusi Stok"}
                </h3>
                <p className="text-xs text-gray-600 dark:text-slate-400 mt-0.5">
                  Catat outlet dan jumlah stok yang dikirim secara akurat.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 pl-2">
                <div>
                  <Label className="text-xs font-bold text-gray-600 dark:text-slate-400 uppercase tracking-wider">Tanggal</Label>
                  <Input 
                    type="date" 
                    className="w-full focus:ring-amber-500 bg-white dark:bg-slate-950/40 border-gray-200 dark:border-slate-800 text-gray-900 dark:text-white"
                    value={date} 
                    onChange={(e) => setDate(e.target.value)} 
                  />
                </div>

                <div>
                  <Label className="text-xs font-bold text-gray-600 dark:text-slate-400 uppercase tracking-wider">Outlet Tujuan</Label>
                  <div className="dark:[&_select]:bg-slate-950/40 dark:[&_select]:border-slate-800 dark:[&_select]:text-white">
                    <Select
                      key={selectKey}
                      options={outletOptions}
                      placeholder="Pilih outlet"
                      defaultValue={outletId}
                      onChange={setOutletId}
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-xs font-bold text-gray-600 dark:text-slate-400 uppercase tracking-wider">Jumlah Stok (pcs)</Label>
                  <Input
                    type="text"
                    className="w-full focus:ring-amber-500 bg-white dark:bg-slate-950/40 border-gray-200 dark:border-slate-800 font-semibold text-gray-900 dark:text-white"
                    placeholder="Contoh: 1.500"
                    value={toThousandSeparator(quantity)}
                    onChange={(e) => {
                      const rawNumber = parseRawNumber(e.target.value);
                      setQuantity(rawNumber);
                    }}
                  />
                </div>

                <div>
                  <Label className="text-xs font-bold text-gray-600 dark:text-slate-400 uppercase tracking-wider">Catatan Pengiriman</Label>
                  <Input
                    className="w-full focus:ring-amber-500 bg-white dark:bg-slate-950/40 border-gray-200 dark:border-slate-800 text-gray-900 dark:text-white"
                    placeholder="Opsional: Driver kurir atau nomor kendaraan"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>

                {/* Notifikasi Error Berbasis Rumpun Warna Merah (🔴) */}
                {error && (
                  <p className="text-xs font-semibold text-red-700 bg-red-50 dark:bg-red-950/40 dark:text-red-400 border border-red-100 dark:border-red-900/30 p-2.5 rounded-xl">
                    ⚠️ {error}
                  </p>
                )}

                <div className="flex gap-3 pt-2">
                  {/* BUTTON: Simpan / Update berbasis warna Amber Keemasan */}
                  <button
                    type="submit"
                    className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-xl flex justify-center items-center gap-2 border-none outline-none shadow-md text-sm transition-all cursor-pointer"
                  >
                    <PlusIcon />
                    {editingId ? "Update Stok" : "Simpan Stok"}
                  </button>
                  
                  {/* BUTTON: Reset / Batal */}
                  <button
                    type="button"
                    className="flex-1 border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 dark:border-slate-800/80 dark:bg-slate-950/40 dark:text-slate-400 dark:hover:bg-slate-900/80 py-3 rounded-xl font-semibold outline-none text-sm transition-all cursor-pointer"
                    onClick={resetForm}
                  >
                    {editingId ? "Batal Edit" : "Reset"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* SISI KANAN: DAFTAR HISTORI DISTRIBUSI */}
          <div className="col-span-12 xl:col-span-7">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-800/80 dark:bg-[#111c44]/60 dark:backdrop-blur-md dark:shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">
                    Daftar Distribusi Stok
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-slate-400 mt-0.5">
                    Total stok terdistribusi: <span className="text-amber-600 dark:text-amber-400 text-sm font-extrabold">{toThousandSeparator(totalStok)} pcs</span>
                  </p>
                </div>
                {/* 🟡 LINK AMBER: Navigasi lanjut ke transfer outlet */}
                <Link
                  to="/owner/transfer-outlet"
                  className="inline-flex items-center justify-center rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-xs font-bold text-amber-600 shadow-sm hover:bg-amber-100/70 dark:border-amber-900/40 dark:bg-amber-950/20 dark:text-amber-400 dark:hover:bg-amber-950/40 transition-all text-center"
                >
                  Lanjut Transfer Outlet 🌟
                </Link>
              </div>

              {/* TABEL GRID SEJAJAR PURA-PURA (MURNI CSS GRID) */}
              <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-slate-800/60 bg-white dark:bg-slate-950/40">
                <div className="min-w-[700px] w-full text-left text-xs">
                  
                  {/* HEADER TABEL GRID */}
                  <div className="bg-gray-50 dark:bg-slate-900/80 border-b border-gray-200 dark:border-slate-800 grid grid-cols-12 py-3.5 px-4 font-bold text-gray-600 dark:text-slate-400 uppercase tracking-wider">
                    <div className="col-span-2">Tanggal</div>
                    <div className="col-span-3">Outlet</div>
                    <div className="col-span-2">Jumlah (pcs)</div>
                    <div className="col-span-3">Catatan</div>
                    <div className="col-span-2 text-center">Aksi</div>
                  </div>
                  
                  {/* BODY DATA TABEL GRID */}
                  <div className="divide-y divide-gray-200 dark:divide-slate-900">
                    {stokEntries.length === 0 ? (
                      <div className="py-12 text-center text-xs font-medium text-gray-600 dark:text-slate-500 bg-white dark:bg-transparent">
                        Belum ada records data distribusi stok.
                      </div>
                    ) : (
                      stokEntries.map((s, idx) => (
                        <div 
                          key={s.id} 
                          className={`grid grid-cols-12 items-center py-3.5 px-4 transition-colors border-b border-gray-200 dark:border-slate-800/40 ${
                            idx % 2 === 0 ? "bg-white dark:bg-transparent" : "bg-gray-50/60 dark:bg-slate-900/40"
                          }`}
                        >
                          {/* 1. Tanggal */}
                          <div className="col-span-2 font-semibold text-gray-600 dark:text-slate-300">
                            {s.date}
                          </div>

                          {/* 2. Outlet */}
                          <div className="col-span-3 font-bold text-gray-900 dark:text-white truncate pr-2">
                            {getOutletLabel(s.outletId)}
                          </div>

                          {/* 3. Jumlah pcs (Aksen Amber) */}
                          <div className="col-span-2 font-extrabold text-amber-600 dark:text-amber-400">
                            {toThousandSeparator(s.quantity)}
                          </div>

                          {/* 4. Catatan */}
                          <div className="col-span-3 text-gray-600 dark:text-slate-400 truncate pr-2">
                            {s.notes || "-"}
                          </div>

                          {/* 5. Komponen Aksi */}
                          <div className="col-span-2 flex items-center justify-center gap-1.5">
                            <button
                              type="button"
                              className="border border-gray-200 bg-white dark:border-slate-800 dark:bg-slate-950/40 text-gray-900 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-900 px-2.5 py-1.5 text-[11px] font-bold rounded-lg transition-colors cursor-pointer"
                              onClick={() => handleEdit(s.id)}
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              className="border border-red-100 dark:border-red-900/40 bg-white dark:bg-slate-950/40 text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 px-2.5 py-1.5 text-[11px] font-bold rounded-lg flex items-center gap-0.5 transition-colors cursor-pointer"
                              onClick={() => handleDelete(s.id)}
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