import { useState, type FormEvent } from "react";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import { useEffect } from "react";
import api from "../../services/api";
import { PlusIcon, TrashBinIcon } from "../../icons";

export default function OutletManagement() {
  const [outlets, setOutlets] = useState<any[]>([]);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [googleMapsUrl, setGoogleMapsUrl] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) return setError("Nama outlet wajib diisi.");
    if (!address.trim()) return setError("Alamat outlet wajib diisi.");
    if (!googleMapsUrl.trim()) return setError("URL Google Maps wajib diisi.");

    try {
      await api.post("/outlets", {
        name: name.trim(),
        address: address.trim(),
        google_maps_url: googleMapsUrl.trim(),
      });

      await loadOutlets();

      setName("");
      setAddress("");
      setGoogleMapsUrl("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Gagal menambahkan outlet.",
      );
    }
  };

  const handleDelete = async (outletId: string, outletName: string) => {
    const ok = window.confirm(
      `Hapus outlet "${outletName}"?\nData distribusi stok dan transfer yang terkait outlet ini juga akan terhapus.`,
    );
    if (!ok) return;

    await api.delete(`/outlets/${outletId}`);
    await loadOutlets();
  };

  useEffect(() => {
    loadOutlets();
  }, []);

  const loadOutlets = async () => {
    try {
      const response = await api.get("/outlets");
      setOutlets(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <PageMeta
        title="Manajemen Outlet | UMKM Rengginang Sabit"
        description="Owner dapat menambah dan menghapus outlet."
      />
      
      {/* CONTAINER UTAMA */}
      <div className="space-y-8 p-4 bg-transparent text-gray-900 dark:text-slate-100 min-h-screen">
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-slate-800/60 pb-5">
          <div className="text-gray-900 dark:text-white [&_*]:text-gray-600 dark:[&_*]:text-slate-200">
            <PageBreadcrumb pageTitle="Manajemen Outlet (CRUD)" />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8 items-start">
          
          {/* SISI KIRI: FORM TAMBAH OUTLET */}
          <div className="col-span-12 xl:col-span-5">
            <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-800/80 dark:bg-[#111c44]/60 dark:backdrop-blur-md dark:shadow-xl">
              {/* 🔴 Batas Vertikal Kiri menggunakan warna Merah (Aksen Entri/Modal) */}
              <div className="absolute top-0 left-0 h-full w-[4px] bg-red-700" />
              
              <div className="border-b border-gray-100 dark:border-slate-800 pb-4 mb-5 pl-2">
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  Tambah Outlet
                </h3>
                <p className="text-xs text-gray-400 dark:text-slate-400 mt-0.5">
                  Owner bisa menambahkan outlet distribusi baru.
                </p>
              </div>

              <form onSubmit={handleAdd} className="space-y-4 pl-2">
                <div>
                  <Label className="text-xs font-bold text-gray-400 dark:text-slate-400 uppercase tracking-wider">Nama Outlet</Label>
                  <Input
                    className="w-full focus:ring-amber-500 dark:bg-slate-950/40 dark:border-slate-800"
                    placeholder="Contoh: Outlet Rengginang Sabit - Cabang Utara"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <Label className="text-xs font-bold text-gray-400 dark:text-slate-400 uppercase tracking-wider">Alamat Outlet</Label>
                  <Input
                    className="w-full focus:ring-amber-500 dark:bg-slate-950/40 dark:border-slate-800"
                    placeholder="Contoh: Jl. Contoh No. 10"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div>
                  <Label className="text-xs font-bold text-gray-400 dark:text-slate-400 uppercase tracking-wider">Link Google Maps</Label>
                  <Input
                    className="w-full focus:ring-amber-500 dark:bg-slate-950/40 dark:border-slate-800"
                    placeholder="Paste URL Embed Google Maps"
                    value={googleMapsUrl}
                    onChange={(e) => setGoogleMapsUrl(e.target.value)}
                  />
                  <p className="text-[11px] text-gray-400 dark:text-slate-500 mt-1.5 leading-relaxed">
                    Google Maps → Share → Embed a map → Copy HTML → Ambil URL pada properti <b>src</b>
                  </p>
                </div>

                {/* 🔴 Notifikasi Error Merah */}
                {error && (
                  <p className="text-xs font-semibold text-red-700 bg-red-50 dark:bg-red-950/40 dark:text-red-400 border border-red-100 dark:border-red-900/30 p-2.5 rounded-xl">
                    ⚠️ {error}
                  </p>
                )}

                {/* 🟡 TOMBOL AMBER HTML MURNI */}
                <button 
                  type="submit"
                  className="w-full bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-gray-900 font-bold py-3 rounded-xl flex justify-center items-center gap-2 border-none outline-none shadow-md shadow-amber-500/10 text-sm transition-all cursor-pointer"
                >
                  <PlusIcon />
                  Simpan Outlet
                </button>
              </form>
            </div>
          </div>

          {/* SISI KANAN: DAFTAR OUTLET (MURNI CSS GRID) */}
          <div className="col-span-12 xl:col-span-7">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-800/80 dark:bg-[#111c44]/60 dark:backdrop-blur-md dark:shadow-xl">
              <div className="mb-6">
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  Daftar Outlet
                </h3>
                <p className="text-xs text-gray-400 dark:text-slate-400 mt-0.5">
                  Total outlet aktif saat ini: <b className="text-gray-900 dark:text-white">{outlets.length}</b>
                </p>
              </div>

              {/* Container Pembatas Tabel List */}
              <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-slate-800/60 bg-white dark:bg-slate-950/40">
                <div className="min-w-[720px] w-full text-left text-xs">
                  
                  {/* HEADER REKAYASA CSS GRID (Total Kolom = 12) */}
                  <div className="bg-gray-50 dark:bg-slate-900/80 border-b border-gray-200 dark:border-slate-800 grid grid-cols-12 items-center py-3.5 px-5 font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                    <div className="col-span-4">Nama Outlet</div>
                    <div className="col-span-4 pl-2">Alamat</div>
                    <div className="col-span-2 text-center">Google Maps</div>
                    <div className="col-span-2 text-center">Aksi</div>
                  </div>
                  
                  {/* BODY REKAYASA CSS GRID */}
                  <div className="divide-y divide-gray-200 dark:divide-slate-900/60">
                    {outlets.length === 0 ? (
                      <div className="py-8 text-center font-medium text-gray-400 dark:text-slate-500 bg-white dark:bg-transparent">
                        Belum ada data outlet terdaftar.
                      </div>
                    ) : (
                      outlets.map((o) => (
                        <div 
                          key={o.id}
                          className="grid grid-cols-12 items-center py-4 px-5 hover:bg-gray-50/50 dark:hover:bg-slate-900/40 transition-colors border-b border-gray-200 dark:border-slate-800/40 bg-white dark:bg-transparent"
                        >
                          {/* 1. Nama Outlet (col-span-4) */}
                          <div className="col-span-4 font-bold text-gray-900 dark:text-white truncate pr-2">
                            {o.name}
                          </div>

                          {/* 2. Alamat Outlet (col-span-4) */}
                          <div className="col-span-4 pl-2 font-semibold text-gray-600 dark:text-slate-300 truncate pr-2" title={o.address}>
                            {o.address}
                          </div>

                          {/* 3. Tautan Google Maps (col-span-2) */}
                          <div className="col-span-2 text-center flex justify-center items-center">
                            <a
                              href={o.google_maps_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline transition-all"
                            >
                              Buka Maps
                            </a>
                          </div>

                          {/* 4. Kontrol Tombol Hapus (col-span-2) */}
                          <div className="col-span-2 flex justify-center items-center">
                            <button
                              type="button"
                              className="border border-red-100 dark:border-red-900/40 bg-white dark:bg-slate-950/40 text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 px-3 py-1.5 text-[11px] font-bold rounded-lg flex items-center gap-1 transition-colors outline-none cursor-pointer"
                              onClick={() => handleDelete(o.id, o.name)}
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