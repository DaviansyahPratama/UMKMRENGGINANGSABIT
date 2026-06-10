import { useMemo, useState, type FormEvent } from "react";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import { useEffect } from "react";
import api from "../../services/api";
import type { Product } from "../../types/Product";
import { loadAppSettings, updateAppSettings } from "../../lib/umkmStorage";
import { PlusIcon, TrashBinIcon } from "../../icons";

// Fungsi format tampilan standard Rupiah untuk Tabel
function formatRupiah(n: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n || 0);
}

// HELPER INPUT: Mengubah angka murni menjadi string ber-titik (150000 -> "150.000")
function toThousandSeparator(value: number | string): string {
  if (value === "" || value === undefined || value === null) return "";
  const numString = value.toString().replace(/\D/g, ""); 
  if (!numString) return "";
  return new Intl.NumberFormat("id-ID").format(Number(numString));
}

// HELPER INPUT: Mengubah string ber-titik kembali menjadi angka murni ("150.000" -> 150000)
function parseRawNumber(formattedValue: string): number | "" {
  const raw = formattedValue.replace(/\./g, ""); 
  return raw === "" ? "" : Number(raw);
}

export default function MenuManagement() {
  const [refreshKey, setRefreshKey] = useState(0);
  const settings = useMemo(() => loadAppSettings(), [refreshKey]);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [composition, setComposition] = useState("");
  const [price, setPrice] = useState<number | "">(""); 
  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [bestSeller, setBestSeller] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [ownerWhatsapp, setOwnerWhatsapp] = useState(settings.ownerWhatsapp);
  const [shopeeUrl, setShopeeUrl] = useState(settings.shopeeUrl);
  const [menuItems, setMenuItems] = useState<Product[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await api.get("/products");

      const products = response.data.map((item: any) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        composition: item.composition,
        price: item.price,
        category: item.category,
        imageUrl: item.image_url
          ? `http://127.0.0.1:8000/storage/${item.image_url}`
          : "",
        isBestSeller: item.is_best_seller,
      }));

      products.sort((a: Product, b: Product) => {
        return Number(b.isBestSeller) - Number(a.isBestSeller);
      });

      setMenuItems(products);
    } catch (error) {
      console.error(error);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setName("");
    setDescription("");
    setComposition("");
    setPrice("");
    setCategory("");
    setImageFile(null);
    setBestSeller(false);
    setError(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name.trim()) return setError("Nama menu wajib diisi.");
    if (!description.trim()) return setError("Deskripsi wajib diisi.");
    if (!composition.trim()) return setError("Komposisi wajib diisi.");
    if (price === "" || Number.isNaN(Number(price)) || Number(price) <= 0)
      return setError("Harga harus angka > 0.");
    if (!category.trim()) return setError("Kategori wajib diisi.");
    if (!editingId && !imageFile) {
      return setError("Foto produk wajib dipilih.");
    }

    const payload = {
      name: name.trim(),
      description: description.trim(),
      composition: composition.trim(),
      price: Number(price),
      category: category.trim(),
      isBestSeller: bestSeller,
    };

    try {
      if (editingId) {
        const formData = new FormData();

        formData.append("name", payload.name);
        formData.append("description", payload.description);
        formData.append("composition", payload.composition);
        formData.append("price", payload.price.toString());
        formData.append("category", payload.category);
        formData.append("is_best_seller", payload.isBestSeller ? "1" : "0");

        if (imageFile) {
          formData.append("image", imageFile);
        }

        await api.post(`/products/${editingId}?_method=PUT`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        const formData = new FormData();

        formData.append("name", payload.name);
        formData.append("description", payload.description);
        formData.append("composition", payload.composition);
        formData.append("price", payload.price.toString());
        formData.append("category", payload.category);
        formData.append("is_best_seller", payload.isBestSeller ? "1" : "0");

        if (imageFile) {
          formData.append("image", imageFile);
        }
        await api.post("/products", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      await loadProducts();
      resetForm();
    } catch (error) {
      console.error(error);
      setError("Gagal menyimpan produk.");
    }
  };

  const handleEdit = (id: number) => {
    const item = menuItems.find((m) => m.id === id);
    if (!item) return;
    setEditingId(item.id);
    setName(item.name);
    setDescription(item.description);
    setComposition(item.composition);
    setPrice(item.price);
    setCategory(item.category);
    setImageFile(null);
    setBestSeller(!!item.isBestSeller);
  };

  const handleDelete = async (id: number, itemName: string) => {
    const ok = window.confirm(`Hapus menu "${itemName}"?`);
    if (!ok) return;
    await api.delete(`/products/${id}`);
    await loadProducts();
    setRefreshKey((k) => k + 1);
  };

  const handleSaveSettings = () => {
    updateAppSettings({ ownerWhatsapp, shopeeUrl });
    setRefreshKey((k) => k + 1);
  };

  return (
    <>
      <PageMeta
        title="Manajemen Katalog | UMKM Rengginang Sabit"
        description="Admin dapat menambah, edit, hapus menu serta mengatur link WhatsApp dan Shopee."
      />
      
      <div className="space-y-8 p-4 bg-transparent text-gray-900 dark:text-slate-100 min-h-screen">
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-slate-800/60 pb-5">
          <div className="text-gray-900 dark:text-white [&_*]:text-gray-600 dark:[&_*]:text-slate-200">
            <PageBreadcrumb pageTitle="Manajemen Katalog & Link Pemesanan" />
          </div>
        </div>

        {/* INTEGRASI LINK CARD */}
        <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-800/80 dark:bg-[#111c44]/60 dark:backdrop-blur-md dark:shadow-xl">
          <div className="absolute top-0 left-0 h-[4px] w-full bg-gradient-to-r from-amber-500 to-red-700" />
          <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
            Pengaturan Link Pemesanan External
          </h3>
          <p className="text-xs text-gray-400 dark:text-slate-400 mt-0.5 mb-4">
            Kelola integrasi gerbang transaksi langsung konsumen.
          </p>
          
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-gray-400 dark:text-slate-400 uppercase tracking-wider">
                Nomor WhatsApp Owner (format: 628xxxx)
              </Label>
              <Input
                className="w-full focus:ring-amber-500 focus:border-amber-500 dark:bg-slate-950/40 dark:border-slate-800"
                value={ownerWhatsapp}
                onChange={(e) => setOwnerWhatsapp(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-gray-400 dark:text-slate-400 uppercase tracking-wider">
                Link Marketplace Shopee
              </Label>
              <Input
                className="w-full focus:ring-amber-500 focus:border-amber-500 dark:bg-slate-950/40 dark:border-slate-800"
                value={shopeeUrl}
                onChange={(e) => setShopeeUrl(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-5 flex justify-end">
            <button 
              type="button"
              onClick={handleSaveSettings}
              className="bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-gray-900 font-bold text-xs px-5 py-2.5 rounded-xl shadow-md shadow-amber-500/10 border-none outline-none transition-all cursor-pointer"
            >
              Simpan Integrasi Link
            </button>
          </div>
        </div>

        {/* LAYOUT GRID UTAMA */}
        <div className="grid grid-cols-12 gap-8 items-start">
          
          {/* SISI KIRI: FORM MANAGEMENT */}
          <div className="col-span-12 xl:col-span-5">
            <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-800/80 dark:bg-[#111c44]/60 dark:backdrop-blur-md dark:shadow-xl">
              <div className={`absolute top-0 left-0 h-full w-[4px] ${editingId ? 'bg-amber-500' : 'bg-red-700'}`} />
              
              <div className="border-b border-gray-100 dark:border-slate-800 pb-4 mb-5 pl-2">
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  {editingId ? "Mode Koreksi Menu" : "Entri Produk Baru"}
                </h3>
                <p className="text-xs text-gray-400 dark:text-slate-400 mt-0.5">
                  {editingId ? `Sedang mengubah ID #${editingId}` : "Tambahkan katalog produk retail Sabit."}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 pl-2">
                <div>
                  <Label className="text-xs font-bold text-gray-400 dark:text-slate-400 uppercase tracking-wider">Nama Menu</Label>
                  <Input
                    className="w-full focus:ring-amber-500 dark:bg-slate-950/40 dark:border-slate-800"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <Label className="text-xs font-bold text-gray-400 dark:text-slate-400 uppercase tracking-wider">Deskripsi Singkat</Label>
                  <Input
                    className="w-full focus:ring-amber-500 dark:bg-slate-950/40 dark:border-slate-800"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div>
                  <Label className="text-xs font-bold text-gray-400 dark:text-slate-400 uppercase tracking-wider">Komposisi Bahan</Label>
                  <Input
                    className="w-full focus:ring-amber-500 dark:bg-slate-950/40 dark:border-slate-800"
                    value={composition}
                    onChange={(e) => setComposition(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs font-bold text-gray-400 dark:text-slate-400 uppercase tracking-wider">Harga (IDR)</Label>
                    <Input
                      type="text"
                      className="w-full focus:ring-amber-500 dark:bg-slate-950/40 dark:border-slate-800 font-medium"
                      placeholder="Contoh: 150.000"
                      value={toThousandSeparator(price)}
                      onChange={(e) => {
                        const rawNumber = parseRawNumber(e.target.value);
                        setPrice(rawNumber);
                      }}
                    />
                  </div>
                  <div>
                    <Label className="text-xs font-bold text-gray-400 dark:text-slate-400 uppercase tracking-wider">Kategori</Label>
                    <Input
                      className="w-full focus:ring-amber-500 dark:bg-slate-950/40 dark:border-slate-800"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-xs font-bold text-gray-400 dark:text-slate-400 uppercase tracking-wider mb-2 block">Upload Foto Produk</Label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-200 border-dashed rounded-xl cursor-pointer bg-gray-50/50 hover:bg-gray-50 dark:hover:bg-slate-900/20 dark:bg-slate-950/20 dark:border-slate-800 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-2 pb-2 text-center px-2">
                        <p className="text-xs font-semibold text-gray-600 dark:text-slate-400 truncate max-w-xs">
                          {imageFile ? imageFile.name : "Klik untuk pilih berkas foto"}
                        </p>
                        <p className="text-[10px] text-gray-400 dark:text-slate-400 mt-1">PNG, JPG up to 2MB</p>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            setImageFile(e.target.files[0]);
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
                
                <div className="flex items-center p-3 rounded-xl border border-gray-100 bg-gray-50/50 dark:border-slate-800/60 dark:bg-slate-950/30">
                  <label className="inline-flex items-center gap-2.5 text-xs font-bold text-gray-600 dark:text-slate-200 cursor-pointer uppercase tracking-wider">
                    <input
                      type="checkbox"
                      className="rounded text-amber-500 focus:ring-amber-500 size-4 border-gray-300 dark:border-slate-800 dark:bg-slate-950"
                      checked={bestSeller}
                      onChange={(e) => setBestSeller(e.target.checked)}
                    />
                    Highlight Sebagai Best Seller 🌟
                  </label>
                </div>
                
                {error && (
                  <p className="text-xs font-semibold text-red-700 bg-red-50 dark:bg-red-950/40 dark:text-red-400 border border-red-100 dark:border-red-900/30 p-2.5 rounded-xl">
                    ⚠️ {error}
                  </p>
                )}
                
                <div className="flex gap-3 pt-2">
                  <button 
                    type="submit"
                    className="flex-1 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-gray-900 font-bold py-3 rounded-xl flex justify-center items-center gap-2 border-none outline-none shadow-md shadow-amber-500/10 text-sm transition-all cursor-pointer"
                  >
                    <PlusIcon />
                    {editingId ? "Update Data" : "Simpan Produk"}
                  </button>
                  <button
                    type="button"
                    className="flex-1 border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 dark:border-slate-800/80 dark:bg-slate-950/40 dark:text-slate-400 dark:hover:bg-slate-900/80 py-3 rounded-xl font-semibold outline-none text-sm transition-all cursor-pointer"
                    onClick={resetForm}
                  >
                    {editingId ? "Batal" : "Clear Form"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* SISI KANAN: DAFTAR KATALOG DATA (MURNI CSS GRID) */}
          <div className="col-span-12 xl:col-span-7">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-800/80 dark:bg-[#111c44]/60 dark:backdrop-blur-md dark:shadow-xl">
              <div className="mb-6">
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  Daftar Katalog Aktif
                </h3>
                <p className="text-xs text-gray-400 dark:text-slate-400 mt-0.5">
                  Diurutkan berdasarkan prioritas status produk terlaris.
                </p>
              </div>

              {/* Container Pembatas Tabel */}
              <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-slate-800/60 bg-white dark:bg-slate-950/40">
                <div className="min-w-[720px] w-full text-left text-xs">
                  
                  {/* HEADER REKAYASA CSS GRID (Total pembagian kolom = 12) */}
                  <div className="bg-gray-50 dark:bg-slate-900/80 border-b border-gray-200 dark:border-slate-800 grid grid-cols-12 items-center py-3.5 px-5 font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                    <div className="col-span-4">Menu / Produk</div>
                    <div className="col-span-2 pl-2">Kategori</div>
                    <div className="col-span-2 pl-2">Harga</div>
                    <div className="col-span-2 text-center">Status</div>
                    <div className="col-span-2 text-center">Aksi</div>
                  </div>
                  
                  {/* BODY REKAYASA CSS GRID */}
                  <div className="divide-y divide-gray-200 dark:divide-slate-900/60">
                    {menuItems.length === 0 ? (
                      <div className="py-8 text-center font-medium text-gray-400 dark:text-slate-500 bg-white dark:bg-transparent">
                        Belum ada item produk dalam katalog.
                      </div>
                    ) : (
                      menuItems.map((m) => (
                        <div 
                          key={m.id} 
                          className="grid grid-cols-12 items-center py-4 px-5 hover:bg-gray-50/50 dark:hover:bg-slate-900/40 transition-colors border-b border-gray-200 dark:border-slate-800/40 bg-white dark:bg-transparent"
                        >
                          {/* 1. Kolom Menu / Produk (col-span-4) */}
                          <div className="col-span-4 flex items-center gap-3 min-w-0">
                            <img
                              src={m.imageUrl}
                              alt={m.name}
                              className="h-12 w-12 rounded-xl object-cover border border-gray-100 dark:border-slate-800 bg-gray-100 flex-shrink-0"
                            />
                            <div className="space-y-0.5 min-w-0 truncate">
                              <p className="text-xs font-bold text-gray-900 dark:text-white truncate">
                                {m.name}
                              </p>
                              <p className="text-[11px] text-gray-400 dark:text-slate-400 truncate" title={m.description}>
                                {m.description}
                              </p>
                            </div>
                          </div>

                          {/* 2. Kolom Kategori (col-span-2) */}
                          <div className="col-span-2 pl-2 font-semibold text-gray-600 dark:text-slate-200 truncate">
                            {m.category}
                          </div>

                          {/* 3. Kolom Harga (col-span-2) */}
                          <div className="col-span-2 pl-2 font-bold text-gray-900 dark:text-white font-mono text-[13px]">
                            {formatRupiah(m.price)}
                          </div>

                          {/* 4. Kolom Status Best Seller (col-span-2) */}
                          <div className="col-span-2 text-center flex justify-center items-center">
                            {m.isBestSeller ? (
                              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-600 dark:bg-amber-950/40 dark:text-amber-400 border border-amber-100 dark:border-amber-900/30 uppercase tracking-wider">
                                <span className="h-1 w-1 rounded-full bg-amber-500 animate-pulse"></span>
                                Best Seller
                              </span>
                            ) : (
                              <span className="text-xs text-gray-400 dark:text-slate-500 font-medium">-</span>
                            )}
                          </div>

                          {/* 5. Kolom Aksi Kontrol (col-span-2) */}
                          <div className="col-span-2 flex gap-1.5 justify-center items-center">
                            <button
                              type="button"
                              className="border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 dark:border-slate-800/60 dark:bg-slate-950/40 dark:text-slate-400 dark:hover:bg-slate-900 px-2.5 py-1.5 text-[11px] font-bold rounded-lg transition-colors outline-none cursor-pointer"
                              onClick={() => handleEdit(m.id)}
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              className="border border-red-100 dark:border-red-900/40 bg-white dark:bg-slate-950/40 text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 px-2.5 py-1.5 text-[11px] font-bold rounded-lg flex items-center gap-1 transition-colors outline-none cursor-pointer"
                              onClick={() => handleDelete(m.id, m.name)}
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