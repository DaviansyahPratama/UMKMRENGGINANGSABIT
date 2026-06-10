import { useMemo, useState, type FormEvent } from "react";
import { Link } from "react-router";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import Select from "../../components/form/Select";
import { PlusIcon, TrashBinIcon } from "../../icons";
import {
  addTransferOutlet,
  deleteTransferOutlet,
  getOutletLabel,
  loadOutlets,
  loadTransferOutlet,
} from "../../lib/umkmStorage";

function formatDateNow() {
  return new Date().toISOString().slice(0, 10);
}

function formatRupiah(n: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n || 0);
}

function toDigitsOnly(value: string) {
  return value.replace(/\D/g, "");
}

function formatThousandsDot(value: string) {
  const digits = toDigitsOnly(value);
  if (!digits) return "";
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export default function TransferOutlet() {
  const outlets = useMemo(() => loadOutlets(), []);
  const outletOptions = useMemo(
    () => outlets.map((o) => ({ value: o.id, label: o.name })),
    [outlets]
  );

  const [refreshKey, setRefreshKey] = useState(0);
  const transferEntries = useMemo(() => loadTransferOutlet(), [refreshKey]);

  const [date, setDate] = useState(() => formatDateNow());
  const [outletId, setOutletId] = useState<string>(outlets[0]?.id ?? "");
  const [selectKey, setSelectKey] = useState(0);
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);

  const totalTransfer = useMemo(
    () => transferEntries.reduce((acc, x) => acc + (x.amount || 0), 0),
    [transferEntries]
  );

  const handleAdd = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!date) return setError("Tanggal wajib diisi.");
    if (!outletId) return setError("Outlet wajib dipilih.");
    const numeric = Number(toDigitsOnly(amount));
    if (!amount || Number.isNaN(numeric))
      return setError("Nominal transfer harus berupa angka.");
    if (numeric <= 0) return setError("Nominal harus > 0.");

    addTransferOutlet({
      date,
      outletId,
      amount: numeric,
      notes: notes.trim(),
    });

    setDate(formatDateNow());
    setOutletId(outlets[0]?.id ?? "");
    setSelectKey((k) => k + 1);
    setAmount("");
    setNotes("");
    setRefreshKey((k) => k + 1);
  };

  const handleDelete = (id: string) => {
    const ok = window.confirm("Hapus data transfer outlet ini?");
    if (!ok) return;
    deleteTransferOutlet(id);
    setRefreshKey((k) => k + 1);
  };

  return (
    <>
      <PageMeta
        title="Transfer Outlet | UMKM Rengginang Sabit"
        description="Pencatatan transfer dari outlet untuk mendokumentasikan pemasukan usaha secara real-time."
      />
      
      {/* CONTAINER UTAMA */}
      <div className="space-y-8 p-4 bg-transparent text-gray-900 dark:text-slate-100 min-h-screen">
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-slate-800/60 pb-5">
          <div className="text-gray-900 dark:text-white [&_*]:text-gray-600 dark:[&_*]:text-slate-200">
            <PageBreadcrumb pageTitle="Transfer Outlet (Pemasukan)" />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8 items-start">
          
          {/* SISI KIRI: FORM ENTRI ARUS KAS MASUK */}
          <div className="col-span-12 xl:col-span-5">
            <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-800/80 dark:bg-[#111c44]/60 dark:backdrop-blur-md dark:shadow-xl">
              {/* 🟢 Batas Vertikal Kiri menggunakan warna Hijau finansial */}
              <div className="absolute top-0 left-0 h-full w-[4px] bg-emerald-600 dark:bg-emerald-500" />
              
              <div className="border-b border-gray-100 dark:border-slate-800 pb-4 mb-5 pl-2">
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  💰 Tambah Transfer Outlet
                </h3>
                <p className="text-xs text-gray-400 dark:text-slate-400 mt-0.5">
                  Catat setoran omzet atau sisa dana kas dari outlet mitra.
                </p>
              </div>

              <form onSubmit={handleAdd} className="space-y-4 pl-2">
                <div>
                  <Label className="text-xs font-bold text-gray-400 dark:text-slate-400 uppercase tracking-wider">Tanggal Transfer</Label>
                  <Input 
                    type="date" 
                    className="w-full focus:ring-emerald-500 dark:bg-slate-950/40 dark:border-slate-800"
                    value={date} 
                    onChange={(e) => setDate(e.target.value)} 
                  />
                </div>

                <div>
                  <Label className="text-xs font-bold text-gray-400 dark:text-slate-400 uppercase tracking-wider">Outlet Pengirim</Label>
                  <div className="dark:[&_select]:bg-slate-950/60 dark:[&_select]:border-slate-800 dark:[&_select]:text-white">
                    <Select
                      key={selectKey}
                      options={outletOptions}
                      placeholder="Pilih outlet asal"
                      defaultValue={outletId}
                      onChange={setOutletId}
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-xs font-bold text-gray-400 dark:text-slate-400 uppercase tracking-wider">Nominal Transfer (IDR)</Label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400 dark:text-slate-500">
                      Rp
                    </span>
                    <Input
                      type="text"
                      className="w-full pl-9 focus:ring-emerald-500 dark:bg-slate-950/40 dark:border-slate-800 font-semibold"
                      value={amount}
                      onChange={(e) => setAmount(formatThousandsDot(e.target.value))}
                      placeholder="10.000"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-xs font-bold text-gray-400 dark:text-slate-400 uppercase tracking-wider">Catatan Tambahan</Label>
                  <Input
                    className="w-full focus:ring-emerald-500 dark:bg-slate-950/40 dark:border-slate-800"
                    placeholder="Opsional: No. referensi bank atau nama penyetor"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>

                {/* Notifikasi Error Ringkas */}
                {error && (
                  <p className="text-xs font-semibold text-red-700 bg-red-50 dark:bg-red-950/40 dark:text-red-400 border border-red-100 dark:border-red-900/30 p-2.5 rounded-xl">
                    ⚠️ {error}
                  </p>
                )}

                <div className="flex gap-3 pt-2">
                  {/* BUTTON UTAMA GREEN */}
                  <button
                    type="submit"
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold py-3 rounded-xl flex justify-center items-center gap-2 border-none outline-none shadow-md text-sm transition-all cursor-pointer"
                  >
                    <PlusIcon />
                    Simpan Data
                  </button>
                  
                  {/* BUTTON NETRAL: Reset */}
                  <button
                    type="button"
                    className="flex-1 border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 dark:border-slate-800/80 dark:bg-slate-950/40 dark:text-slate-400 dark:hover:bg-slate-900/80 py-3 rounded-xl font-semibold outline-none text-sm transition-all cursor-pointer"
                    onClick={() => {
                      setDate(formatDateNow());
                      setOutletId(outlets[0]?.id ?? "");
                      setSelectKey((k) => k + 1);
                      setAmount("");
                      setNotes("");
                      setError(null);
                    }}
                  >
                    Reset Form
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* SISI KANAN: DAFTAR HISTORI TRANSFER (MURNI CSS GRID) */}
          <div className="col-span-12 xl:col-span-7">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-800/80 dark:bg-[#111c44]/60 dark:backdrop-blur-md dark:shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">
                    Daftar Histori Setoran
                  </h3>
                  <p className="text-xs text-gray-400 dark:text-slate-400 mt-0.5">
                    Total saldo masuk: <b className="text-emerald-600 dark:text-emerald-400 text-sm font-extrabold">{formatRupiah(totalTransfer)}</b>
                  </p>
                </div>
                {/* 🟡 LINK AMBER: Navigasi Rekap */}
                <Link
                  to="/owner/keuntungan"
                  className="inline-flex items-center justify-center rounded-xl border border-amber-200 bg-amber-50/50 px-4 py-2.5 text-xs font-bold text-amber-600 shadow-sm hover:bg-amber-50 dark:border-amber-900/40 dark:bg-amber-950/20 dark:text-amber-400 dark:hover:bg-amber-950/40 transition-all text-center"
                >
                  Lihat Rekap Keuntungan 🌟
                </Link>
              </div>

              {/* Container Pembatas Tabel List */}
              <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-slate-800/60 bg-white dark:bg-slate-950/40">
                <div className="min-w-[760px] w-full text-left text-xs">
                  
                  {/* HEADER REKAYASA CSS GRID (Total Kolom = 12) */}
                  <div className="bg-gray-50 dark:bg-slate-900/80 border-b border-gray-200 dark:border-slate-800 grid grid-cols-12 items-center py-3.5 px-5 font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                    <div className="col-span-2">Tanggal</div>
                    <div className="col-span-3 pl-2">Nama Outlet</div>
                    <div className="col-span-3 pl-2">Nominal Transfer</div>
                    <div className="col-span-2 pl-2">Catatan</div>
                    <div className="col-span-2 text-center">Aksi</div>
                  </div>
                  
                  {/* BODY REKAYASA CSS GRID */}
                  <div className="divide-y divide-gray-200 dark:divide-slate-900/60">
                    {transferEntries.length === 0 ? (
                      <div className="py-8 text-center font-medium text-gray-400 dark:text-slate-500 bg-white dark:bg-transparent">
                        Belum ada transaksi transfer keuangan terdaftar dari outlet.
                      </div>
                    ) : (
                      transferEntries.map((t) => (
                        <div 
                          key={t.id}
                          className="grid grid-cols-12 items-center py-4 px-5 hover:bg-gray-50/50 dark:hover:bg-slate-900/40 transition-colors border-b border-gray-200 dark:border-slate-800/40 bg-white dark:bg-transparent"
                        >
                          {/* 1. Tanggal (col-span-2) */}
                          <div className="col-span-2 font-semibold text-gray-600 dark:text-slate-300">
                            {t.date}
                          </div>

                          {/* 2. Nama Outlet (col-span-3) */}
                          <div className="col-span-3 pl-2 font-bold text-gray-900 dark:text-white truncate pr-2">
                            {getOutletLabel(t.outletId)}
                          </div>

                          {/* 3. Nominal Transfer (col-span-3) */}
                          <div className="col-span-3 pl-2 font-extrabold text-emerald-600 dark:text-emerald-400">
                            {formatRupiah(t.amount)}
                          </div>

                          {/* 4. Catatan (col-span-2) */}
                          <div className="col-span-2 pl-2 text-gray-500 dark:text-slate-400 truncate pr-2" title={t.notes || "-"}>
                            {t.notes || "-"}
                          </div>

                          {/* 5. Kontrol Tombol Hapus (col-span-2) */}
                          <div className="col-span-2 flex justify-center items-center">
                            <button
                              type="button"
                              className="border border-red-100 dark:border-red-900/40 bg-white dark:bg-slate-950/40 text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 px-3 py-1.5 text-[11px] font-bold rounded-lg flex items-center gap-1 transition-colors outline-none cursor-pointer"
                              onClick={() => handleDelete(t.id)}
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