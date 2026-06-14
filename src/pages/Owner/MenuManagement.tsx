import { useMemo, useState, type FormEvent } from "react";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Label from "../../components/form/Label";
import Input from "../../components/form/input/InputField";
import { useEffect } from "react";
import api, { buildProductImageUrl } from "../../services/api"; 
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

      const products = response.data.map((item: any) => {
        const imageFile = item.image || item.image_url || item.image_path || "";

        return {
          id: item.id,
          name: item.name,
          description: item.description,
          composition: item.composition,
          price: item.price,
          category: item.category,
          imageUrl: buildProductImageUrl(imageFile), 
          isBestSeller: item.is_best_seller,
        };
      });

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
          headers: { "Content-Type": "multipart/form-data" },
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
          headers: { "Content-Type": "multipart/form-data" },
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
                      className="w-full focus:ring-amber-500 dark:bg-slate-950/40 dark:border-slate-800"
                      placeholder="Contoh: 150.000"
                      value={toThousandSeparator(price)}
                      onChange={(e) => setPrice(parseRawNumber(e.target.value))}
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
                  <Label className="text-xs font-bold text-gray-400 dark:text-slate-400 uppercase tracking-wider">Upload Foto Produk</Label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    className="mt-1 block w-full text-xs text-gray-500 dark:text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-amber-500/10 file:text-amber-500 hover:file:bg-amber-500/20 cursor-pointer"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="bestSeller"
                    checked={bestSeller}
                    onChange={(e) => setBestSeller(e.target.checked)}
                    className="rounded text-amber-500 focus:ring-amber-500 h-4 w-4 bg-transparent dark:border-slate-800"
                  />
                  <label htmlFor="bestSeller" className="text-xs font-medium text-gray-700 dark:text-slate-300 select-none cursor-pointer">
                    Tandai sebagai Produk Terlaris (Best Seller ⭐)
                  </label>
                </div>

                {error && (
                  <p className="text-xs font-semibold text-red-600 bg-red-50 dark:bg-red-950/30 p-3 rounded-xl border border-red-200 dark:border-red-900/50">
                    {error}
                  </p>
                )}

                <div className="flex gap-3 pt-3">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white font-bold text-xs px-4 py-3 rounded-xl shadow-md border-none outline-none transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <PlusIcon className="h-4 w-4" />
                    {editingId ? "Update Menu" : "Publish Menu Baru"}
                  </button>
                  {editingId && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-200 font-bold text-xs px-4 py-3 rounded-xl border-none outline-none transition-all cursor-pointer"
                    >
                      Batal
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* SISI KANAN: LIST KATALOG AKTIF */}
          <div className="col-span-12 xl:col-span-7">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-800/80 dark:bg-[#111c44]/60 dark:backdrop-blur-md dark:shadow-xl overflow-hidden">
              <div className="border-b border-gray-100 dark:border-slate-800 pb-4 mb-5">
                <h3 className="text-base font-bold text-gray-900 dark:text-white">Daftar Katalog Aktif</h3>
                <p className="text-xs text-gray-400 dark:text-slate-400 mt-0.5">
                  Diurutkan berdasarkan prioritas status produk terlaris.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm text-gray-500 dark:text-slate-400">
                  <thead>
                    <tr className="border-b border-gray-100 dark:border-slate-800 text-xs font-bold text-gray-400 dark:text-slate-400 uppercase tracking-wider">
                      <th className="py-3 px-2">Menu / Produk</th>
                      <th className="py-3 px-2">Kategori</th>
                      <th className="py-3 px-2">Harga</th>
                      <th className="py-3 px-2">Status</th>
                      <th className="py-3 px-2 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 dark:divide-slate-800/40">
                    {menuItems.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-slate-800/20 transition-colors">
                        <td className="py-4 px-2 flex items-center gap-3">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="h-10 w-10 rounded-xl object-cover border border-gray-100 dark:border-slate-800 bg-gray-50"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "/images/logo/rengginang-sabit.png";
                            }}
                          />
                          <div>
                            <div className="font-bold text-gray-900 dark:text-white text-sm">{item.name}</div>
                            <div className="text-xs text-gray-400 truncate max-w-[150px]">{item.description}</div>
                          </div>
                        </td>
                        <td className="py-4 px-2 text-xs font-medium">{item.category}</td>
                        <td className="py-4 px-2 text-xs font-bold text-gray-900 dark:text-white">
                          {formatRupiah(item.price)}
                        </td>
                        <td className="py-4 px-2">
                          {item.isBestSeller ? (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20">
                              ⭐ Best Seller
                            </span>
                          ) : (
                            <span className="text-gray-300 dark:text-slate-700 text-xs">-</span>
                          )}
                        </td>
                        <td className="py-4 px-2 text-right space-x-2">
                          <button
                            onClick={() => handleEdit(item.id)}
                            className="text-xs font-semibold text-amber-500 hover:text-amber-600 bg-amber-500/5 hover:bg-amber-500/10 px-2.5 py-1.5 rounded-lg border-none transition-all cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(item.id, item.name)}
                            className="text-xs font-semibold text-red-600 hover:text-red-700 bg-red-600/5 hover:bg-red-600/10 p-1.5 rounded-lg border-none transition-all inline-flex items-center justify-center cursor-pointer"
                          >
                            <TrashBinIcon className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {menuItems.length === 0 && (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-xs text-gray-400">
                          Belum ada menu terdaftar di database.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}